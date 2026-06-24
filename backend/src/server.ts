import { createClerkClient, verifyToken } from "@clerk/backend";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import db from "./db/db";
import { users } from "./db/schema";
import type { CreateUserBody } from "./types/createUserBody";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const app = new Hono();

app.use("*", logger());
app.use("/api/*", cors());

async function requireAuth(c: any, next: () => Promise<void>) {
	const authHeader = c.req.header("Authorization");
	if (!authHeader?.startsWith("Bearer ")) {
		return c.json({ error: "Unauthorized" }, 401);
	}
	const token = authHeader.slice(7);
	try {
		const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY });
		c.set("clerkUserId", payload.sub);
		c.set("clerkPayload", payload);
	} catch {
		return c.json({ error: "Unauthorized" }, 401);
	}
	await next();
}

async function requireAdmin(c: any, next: () => Promise<void>) {
	await requireAuth(c, async () => {});
	if (c.res.status === 401) return;
	const userId = c.get("clerkUserId");
	const user = await clerk.users.getUser(userId);
	if ((user.publicMetadata as any)?.role !== "admin") {
		return c.json({ error: "Forbidden" }, 403);
	}
	await next();
}

app.get("/health", (c) => c.text("ok"));

app.get("/api/users/:id", requireAuth, async (c) => {
	const user = await db
		.select()
		.from(users)
		.where(eq(users.id, Number(c.req.param("id"))));
	if (!user[0]) {
		return c.json("user not found", 404);
	}
	return c.text(user[0].name);
});

app.get("/api/users", requireAdmin, async (c) => {
	const allUsers = await db.select().from(users);
	return c.json(allUsers.map((u) => ({ id: u.id, name: u.name, email: u.email })));
});

app.post("/api/users/create", requireAdmin, async (c) => {
	const body = await c.req.json<CreateUserBody>();
	const { userName, userEmail, password, isAdmin } = body;

	if (!userName || !userEmail || !password) {
		return c.json("name, email, and password are required", 400);
	}

	const existing = await db.select().from(users).where(eq(users.email, userEmail));
	if (existing[0]) {
		return c.json("User with that email exists", 400);
	}

	try {
		const passwordHash = await Bun.password.hash(password);
		await db.insert(users).values({ name: userName, email: userEmail, passwordHash, isAdmin: isAdmin ?? false });
	} catch (err) {
		return c.json({ success: false, error: `Error: ${err}` }, 500);
	}

	return c.json({ success: true, message: `${isAdmin ? "Admin" : "User"} ${userName} successfully created` }, 201);
});

export default app;
