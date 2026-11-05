import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import resume from "@/assets/resume.pdf.asset.json";

const sections = ["about", "projects", "skills", "contact"] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const pos = window.scrollY + 140;
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? "border-b border-border bg-background/75 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2 font-mono text-sm">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-primary/40 bg-primary/10 font-display text-xs font-bold text-primary">
            MR
          </span>
          <span className="hidden text-muted-foreground sm:inline">
            mahendra<span className="text-primary">.</span>data
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s, i) => (
            <a
              key={s}
              href={`#${s}`}
              className={`rounded-md px-3 py-2 font-mono text-xs transition-colors ${
                active === s ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="text-muted-foreground/60">0{i + 1}.</span> {s}
            </a>
          ))}
          <Button variant="terminal" size="sm" className="ml-3" asChild>
            <a href={resume.url} download="Mahendra-Reddy-RV-Resume.pdf">
              resume.pdf
            </a>
          </Button>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-3">
            {sections.map((s, i) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className="py-3 font-mono text-sm text-muted-foreground hover:text-primary"
              >
                <span className="text-muted-foreground/60">0{i + 1}.</span> {s}
              </a>
            ))}
            <a
              href={resume.url}
              download="Mahendra-Reddy-RV-Resume.pdf"
              className="py-3 font-mono text-sm text-primary"
            >
              ↓ resume.pdf
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
