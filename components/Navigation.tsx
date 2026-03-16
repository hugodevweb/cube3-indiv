'use client';

import { useSession, signOut } from 'next-auth/react';

interface NavigationProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSellClick: () => void;
}

export default function Navigation({ searchQuery, onSearchChange, onSellClick }: NavigationProps) {
  const { data: session } = useSession();

  const userInitial = session?.user?.name?.[0]?.toUpperCase()
    ?? session?.user?.email?.[0]?.toUpperCase()
    ?? '?';
  const userName = session?.user?.name ?? session?.user?.email ?? '';

  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-border h-16 flex items-center px-8 gap-5 shadow-sm">
      {/* Logo */}
      <a href="#" className="text-2xl font-bold text-accent tracking-tight no-underline whitespace-nowrap flex-shrink-0">
        collector<span className="text-text font-normal">.shop</span>
      </a>

      {/* Search bar */}
      <div className="flex-1 relative max-w-[560px]">
        <svg
          width="16"
          height="16"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="search"
          placeholder="Rechercher des articles…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
          className="w-full h-10 pl-10 pr-4 border-[1.5px] border-border rounded-pill
                     font-sans text-sm text-text bg-background outline-none
                     transition-all duration-150
                     focus:border-accent focus:shadow-[0_0_0_3px_rgba(9,177,186,0.12)] focus:bg-surface
                     placeholder:text-text-muted"
        />
      </div>

      {/* Nav links + auth – hidden on mobile */}
      <div className="hidden md:flex items-center gap-1 flex-shrink-0 ml-auto">
        <a
          href="#"
          className="px-3 py-1.5 rounded-sm text-sm font-medium text-text-secondary no-underline
                    transition-all duration-150 hover:bg-background hover:text-text whitespace-nowrap"
        >
          Parcourir
        </a>
        <a
          href="#"
          className="px-3 py-1.5 rounded-sm text-sm font-medium text-text-secondary no-underline
                    transition-all duration-150 hover:bg-background hover:text-text whitespace-nowrap"
        >
          Comment ça marche
        </a>

        {session ? (
          <div className="flex items-center gap-2 ml-3 pl-3 border-l border-border">
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full bg-accent flex items-center justify-center
                         text-white text-sm font-bold flex-shrink-0"
              title={userName}
            >
              {userInitial}
            </div>
            <span className="text-sm font-medium text-text max-w-[120px] truncate">{userName}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-3 py-1.5 rounded-sm text-sm font-medium text-text-secondary
                        transition-all duration-150 hover:bg-background hover:text-text whitespace-nowrap cursor-pointer border-none bg-transparent"
            >
              Déconnexion
            </button>
          </div>
        ) : (
          <a
            href="/auth/signin"
            className="ml-3 pl-3 border-l border-border px-3 py-1.5 rounded-sm text-sm font-medium
                      text-accent no-underline transition-all duration-150 hover:bg-background whitespace-nowrap"
          >
            Se connecter
          </a>
        )}
      </div>

      {/* Sell button */}
      <button
        onClick={onSellClick}
        className="px-5 py-2 bg-accent text-white font-sans text-[0.9rem] font-semibold
                  border-none rounded-pill cursor-pointer whitespace-nowrap flex-shrink-0
                  shadow-[0_2px_8px_rgba(9,177,186,0.3)]
                  transition-all duration-150
                  hover:bg-accent-dark hover:shadow-[0_4px_14px_rgba(9,177,186,0.4)]
                  active:scale-[0.97]"
      >
        Vendre
      </button>
    </nav>
  );
}
