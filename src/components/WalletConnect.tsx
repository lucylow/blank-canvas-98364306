import { useWallet } from "@/hooks/useWallet";
import { ChevronDown, Wallet, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function WalletConnect() {
  const { address, connecting, connect, disconnect } = useWallet();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (address) {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:border-primary transition-colors"
        >
          <Wallet className="w-4 h-4 text-accent" />
          {address.slice(0, 6)}...{address.slice(-4)}
          <ChevronDown className="w-3 h-3" />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
            <button
              onClick={() => { disconnect(); setOpen(false); }}
              className="flex items-center gap-2 w-full px-4 py-3 text-sm text-accent-red hover:bg-muted transition-colors"
            >
              <LogOut className="w-4 h-4" /> Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      disabled={connecting}
      className="flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary-light transition-all disabled:opacity-50"
    >
      <Wallet className="w-4 h-4" />
      {connecting ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}
