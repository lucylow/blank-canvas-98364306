import { Moon } from "lucide-react";

export default function NightModeIndicator() {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-medium">
      <Moon className="w-3 h-3 text-accent-yellow" />
      <span className="text-muted-foreground">Night Safety Mode</span>
    </div>
  );
}
