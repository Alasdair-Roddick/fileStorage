export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-zinc-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3l9 9-9 9" />
                </svg>
            </div>
            <p className="text-sm font-medium text-zinc-700">No data yet</p>
            <p className="text-xs text-zinc-400">Add a user to get started</p>
            <a
                href="/add-user"
                className="mt-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-700 px-4 py-2 rounded transition-colors"
            >
                Add User
            </a>
        </div>
    );
}
