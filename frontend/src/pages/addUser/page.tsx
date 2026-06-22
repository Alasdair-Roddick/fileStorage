import { useState } from "react";
import { addUser } from "../../api/addUser";

export default function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleClick(): Promise<void> {
        setStatus(null);
        setLoading(true);
        try {
            const result = await addUser({ name, email });
            setStatus({ type: "success", message: result.message });
        } catch (err) {
            setStatus({ type: "error", message: err instanceof Error ? err.message : "Something went wrong" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-lg p-6 flex flex-col gap-4 shadow-sm">
                <div>
                    <h1 className="text-base font-semibold text-zinc-900">Add User</h1>
                    <p className="text-xs text-zinc-400 mt-0.5">Create a new user record in the database</p>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-zinc-600">Name</label>
                        <input
                            className="border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
                            placeholder="Jane Smith"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-zinc-600">Email</label>
                        <input
                            className="border border-zinc-200 rounded px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
                            placeholder="jane@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    className="w-full bg-zinc-900 text-white text-sm font-medium rounded py-2 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    type="submit"
                    disabled={!name || !email || loading}
                    onClick={handleClick}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>

                {status && (
                    <p className={`text-xs text-center ${status.type === "success" ? "text-emerald-600" : "text-red-500"}`}>
                        {status.message}
                    </p>
                )}
            </div>
        </div>
    );
}
