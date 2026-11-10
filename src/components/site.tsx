import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

const nav = [
  { to: "/careers", label: "Careers" },
  { to: "/courses", label: "Courses" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-md border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
    >
      {dark ? "☀ light" : "☾ dark"}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="font-mono text-primary">{"{ }"}</span> Forgeline
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground font-medium" }}
            >
              {n.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="rounded-md border px-2.5 py-1.5 font-mono text-xs">
            {open ? "close" : "menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t px-5 py-3 md:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-muted-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-muted-foreground md:flex-row md:justify-between">
        <p className="font-mono">
          <span className="text-primary">{"{ }"}</span> Forgeline — learn skills and experience real-world tech work.
        </p>
        <div className="flex gap-6">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="hover:text-foreground">{n.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-10">
      <p className="animate-fade-up font-mono text-sm text-primary">// {eyebrow}</p>
      <h1 className="animate-fade-up mt-3 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-6xl" style={{ animationDelay: "80ms" }}>
        {title}
      </h1>
      {children && (
        <div className="animate-fade-up mt-5 max-w-2xl text-lg text-muted-foreground" style={{ animationDelay: "160ms" }}>
          {children}
        </div>
      )}
    </section>
  );
}

export function seo(title: string, description: string, path: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
