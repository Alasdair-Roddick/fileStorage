import { useState } from "react";
import { addUser } from "../../api/addUser";

export default function AddUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleClick(): Promise<void> {
        setStatus(null);
        setLoading(true);
        try {
            const result = await addUser({ name, email, password, isAdmin });
            setStatus({ type: "success", message: result.message });
            setName("");
            setEmail("");
            setPassword("");
            setIsAdmin(false);
        } catch (err) {
            setStatus({ type: "error", message: err instanceof Error ? err.message : "Something went wrong" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-8 flex flex-col gap-6">
            <div>
                <h1 className="text-lg font-semibold text-neutral-900">Add User</h1>
                <p className="text-sm text-neutral-400 mt-0.5">Create a new user or admin account</p>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 p-6 max-w-md flex flex-col gap-5">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-600">Name</label>
                        <input
                            className="border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-neutral-50"
                            placeholder="Jane Smith"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-600">Email</label>
                        <input
                            className="border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-neutral-50"
                            placeholder="jane@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-600">Password</label>
                        <input
                            className="border border-neutral-200 rounded-lg px-3 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-neutral-50"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer select-none group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`w-9 h-5 rounded-full transition-colors ${isAdmin ? "bg-indigo-500" : "bg-neutral-200"}`}>
                                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isAdmin ? "translate-x-4" : "translate-x-0"}`} />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-700">Admin account</p>
                            <p className="text-xs text-neutral-400">Grants access to this admin panel</p>
                        </div>
                    </label>
                </div>

                <button
                    className="w-full bg-indigo-600 text-white text-sm font-medium rounded-lg py-2.5 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    type="submit"
                    disabled={!name || !email || !password || loading}
                    onClick={handleClick}
                >
                    {loading ? "Creating..." : "Create user"}
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
