import { useState } from "react";
import { addUser } from "../../api/addUser";

export default function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const newUser = { name, email };

    async function handleClick(): Promise<void> {
        setStatus(null);
        setLoading(true);
        try {
            const result = await addUser(newUser);
            setStatus({ type: "success", message: result.message });
        } catch (err) {
            setStatus({ type: "error", message: err instanceof Error ? err.message : "Something went wrong" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col gap-4 justify-center bg-white items-center align-middle h-screen">
            <div className="flex flex-col gap-2 bg-red max-w-sm p-4 rounded">
                <input className="border-1 rounded focus:outline-none p-1" placeholder="Name" onChange={(e) => setName(e.target.value)} type="text" />

                <input className="border-1 rounded focus:outline-none p-1" placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} />

                <button className="bg-blue-500 text-white rounded p-2 disabled:opacity-50" type="submit" disabled={!name || !email || loading} onClick={handleClick}>
                    {loading ? "Submitting..." : "Submit"}
                </button>

                {status && (
                    <p className={`text-sm text-center ${status.type === "success" ? "text-green-600" : "text-red-600"}`}>
                        {status.message}
                    </p>
                )}
            </div>
        </div>
    );
}

