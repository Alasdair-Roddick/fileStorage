import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import db from "./db/db";
import { users } from "./db/schema";
import type { CreateUserBody } from "./types/createUserBody";

const app = new Hono();

app.use("*", logger());
app.use("/api/*", cors());

app.get("/health", (c) => c.text("ok"));

app.get("/api/users/:id", async (c) => {
	const user = await db
		.select()
		.from(users)
		.where(eq(users.id, Number(c.req.param("id"))));
	if (!user[0]) {
		return c.json("user not found", 404);
	}

	return c.text(user[0].name);
});

async function checkExists(email: string) {
    const user = await db.select().from(users).where(eq(users.email, email))

    if (!user[0]) {
        return false
    }

    return true;
}


app.post("/api/users/create", async (c) => {
	const body = await c.req.json<CreateUserBody>();

	const { userName, userEmail } = body;


    
    
    // Check if values are populated
	if (!userName || !userEmail) {
		return c.json("name and email are required", 400);
	}

    // Check if user exists
    if (await checkExists(userEmail)) {
        return c.json("User with that email exists", 400);
    }




	try {
		await db.insert(users).values({ name: userName, email: userEmail });
	} catch (err) {
		return c.json(
			{
				success: false,
				error: `Error: ${err}`,
			},
			500,
		);
	}

	return c.json(
		{
			success: true,
			message: `User ${userName} Successfully created :)`,
		},
		201,
	);
});

export default app;
