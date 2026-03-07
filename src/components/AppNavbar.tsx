import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import WalletConnect from "@/components/WalletConnect";

const appLinks = [
  { label: "Home", href: "/app" },
  { label: "Map", href: "/map" },
  { label: "NFTs", href: "/nfts" },
  { label: "DAO", href: "/dao" },
  { label: "Reports", href: "/reports" },
  { label: "Profile", href: "/profile" },
  { label: "Evidence", href: "/data-sources" },
];

export default function AppNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-background/95 backdrop-blur-md border-b border-border">
      <Link to="/" className="flex items-center gap-2 font-bold text-lg">
        <span className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center text-sm font-bold text-primary-foreground">
          S
        </span>
        SafeStep AR
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {appLinks.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            className={`text-sm font-medium transition-colors ${
              location.pathname === l.href ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <WalletConnect />
      </div>

      <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border flex flex-col gap-3 p-6 md:hidden animate-fade-in">
          {appLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`text-sm font-medium ${location.pathname === l.href ? "text-accent" : "text-muted-foreground"}`}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <WalletConnect />
        </div>
      )}
    </nav>
  );
}
