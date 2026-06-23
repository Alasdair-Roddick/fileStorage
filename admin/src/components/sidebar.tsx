import { useLocation } from "react-router";

const links = [
    {
        href: "/",
        label: "Dashboard",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
            </svg>
        ),
    },
    {
        href: "/add-user",
        label: "Add User",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const { pathname } = useLocation();

    return (
        <aside className="w-56 shrink-0 flex flex-col bg-neutral-950 h-screen">
            <div className="px-5 py-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-indigo-500 flex items-center justify-center shrink-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-white text-sm font-semibold tracking-tight">Admin</span>
                    <span className="ml-auto text-[10px] text-neutral-600 font-mono">v1</span>
                </div>
            </div>

            <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
                {links.map(({ href, label, icon }) => {
                    const active = pathname === href;
                    return (
                        <a
                            key={href}
                            href={href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                                active
                                    ? "bg-white/10 text-white"
                                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <span className={active ? "text-white" : "text-neutral-500"}>{icon}</span>
                            {label}
                        </a>
                    );
                })}
            </nav>

            <div className="px-5 py-4 border-t border-white/10">
                <a
                    href="/logout"
                    className="flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign out
                </a>
            </div>
        </aside>
    );
}
