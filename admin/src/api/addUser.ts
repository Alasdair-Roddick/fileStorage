import type { user } from "../types/user";

export async function addUser(user: user): Promise<{ success: boolean; message: string }> {
	const resp = await fetch("/api/users/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userName: user.name, userEmail: user.email, password: user.password, isAdmin: user.isAdmin })
    });

    const data = await resp.json();

    if (!resp.ok) {
        const message = typeof data === "string" ? data : data.error ?? "Something went wrong";
        throw new Error(message);
    }

    return data;
}
