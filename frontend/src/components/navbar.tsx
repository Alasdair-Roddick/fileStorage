import { UserButton } from "@clerk/react";

export default function NavBar() {
    return (
        <nav className="bg-white border-b border-zinc-200 px-6 py-0 flex items-center justify-between h-14 shrink-0">
            <span className="font-semibold text-zinc-900 tracking-tight text-sm">DockerPG</span>
            <div className="flex items-center gap-3">
                <a
                    className="text-sm text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 px-3 py-1.5 rounded transition-colors"
                    href="/"
                >
                    Home
                </a>
                <UserButton />
            </div>
        </nav>
    );
}
