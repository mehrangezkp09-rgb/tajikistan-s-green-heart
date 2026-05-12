import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Главная" },
  { to: "/pollution", label: "Загрязнение" },
  { to: "/deforestation", label: "Вырубка" },
  { to: "/animals", label: "Животные" },
  { to: "/help", label: "Как помочь" },
  { to: "/news", label: "Новости" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="glass rounded-2xl flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-[var(--gradient-sun)] text-primary-foreground glow">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="font-display text-lg leading-none">
              <span className="text-gradient">Sabz</span>
              <span className="text-foreground">Tajik</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                activeProps={{ className: "px-3 py-2 text-sm rounded-lg text-foreground bg-secondary/80" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            <div className="w-5 space-y-1.5">
              <span className="block h-0.5 bg-foreground" />
              <span className="block h-0.5 bg-foreground" />
              <span className="block h-0.5 bg-foreground w-3" />
            </div>
          </button>
        </div>
        {open && (
          <div className="md:hidden glass mt-2 rounded-2xl p-2 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                activeProps={{ className: "px-3 py-2 text-sm rounded-lg text-foreground bg-secondary/80" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
