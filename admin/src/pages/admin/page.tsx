import { getAllUsers } from "../../api/getAllUsers";
import { useEffect, useState } from "react";
import type { userResponse } from "../../types/user";

export default function Admin() {
    const [users, setUsers] = useState<userResponse>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllUsers()
            .then(setUsers)
            .catch(() => setError("Failed to load users"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-8 flex flex-col gap-6">
            <div>
                <h1 className="text-lg font-semibold text-neutral-900">Dashboard</h1>
                <p className="text-sm text-neutral-400 mt-0.5">Overview of all registered users</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border border-neutral-200 px-5 py-4">
                    <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Total Users</p>
                    <p className="text-3xl font-semibold text-neutral-900 mt-1.5 tabular-nums">
                        {loading ? "—" : users.length}
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
                    <h2 className="text-sm font-medium text-neutral-700">All Users</h2>
                    <a
                        href="/add-user"
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                    >
                        + Add user
                    </a>
                </div>

                {error && (
                    <p className="px-5 py-6 text-sm text-red-500">{error}</p>
                )}

                {!error && (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-neutral-100 bg-neutral-50">
                                <th className="text-left px-5 py-2.5 text-xs font-medium text-neutral-400">ID</th>
                                <th className="text-left px-5 py-2.5 text-xs font-medium text-neutral-400">Name</th>
                                <th className="text-left px-5 py-2.5 text-xs font-medium text-neutral-400">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                Array.from({ length: 4 }).map((_, i) => (
                                    <tr key={i} className="border-t border-neutral-100">
                                        <td className="px-5 py-3.5"><div className="h-3 w-6 bg-neutral-100 rounded animate-pulse" /></td>
                                        <td className="px-5 py-3.5"><div className="h-3 w-28 bg-neutral-100 rounded animate-pulse" /></td>
                                        <td className="px-5 py-3.5"><div className="h-3 w-44 bg-neutral-100 rounded animate-pulse" /></td>
                                    </tr>
                                ))
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="px-5 py-10 text-center text-sm text-neutral-400">
                                        No users yet
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="border-t border-neutral-100 hover:bg-neutral-50 transition-colors">
                                        <td className="px-5 py-3.5 text-neutral-400 tabular-nums text-xs">{user.id}</td>
                                        <td className="px-5 py-3.5 text-neutral-900 font-medium">{user.name}</td>
                                        <td className="px-5 py-3.5 text-neutral-500">{user.email}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
