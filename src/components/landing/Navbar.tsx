import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Problem", href: "#problem" },
    { label: "Solution", href: "#solution" },
    { label: "Features", href: "#features" },
    { label: "Team", href: "#team" },
    { label: "Contact", href: "#cta" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-background/95 backdrop-blur-md border-b border-border">
      <a href="#home" className="flex items-center gap-2 font-bold text-xl">
        <span className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center text-sm font-bold text-primary-foreground">
          S
        </span>
        SafeStep AR
      </a>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="font-medium text-muted-foreground hover:text-accent transition-colors"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#cta"
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
        >
          Download App
        </a>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden text-foreground"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border flex flex-col gap-4 p-6 md:hidden animate-fade-in">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-medium text-muted-foreground hover:text-accent transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#cta"
            className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-center"
            onClick={() => setMobileOpen(false)}
          >
            Download App
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
