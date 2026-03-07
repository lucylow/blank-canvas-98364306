import { Brain } from "lucide-react";

interface GooseBadgeProps {
  status?: "ready" | "analyzing" | "offline";
  size?: "sm" | "md";
  className?: string;
}

export default function GooseBadge({ status = "ready", size = "sm", className = "" }: GooseBadgeProps) {
  const dotColor = status === "ready" ? "bg-accent" : status === "analyzing" ? "bg-accent-yellow animate-pulse" : "bg-accent-red";
  const label = status === "ready" ? "Ready" : status === "analyzing" ? "Analyzing…" : "Offline";

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card border border-border text-xs font-medium ${className}`}>
      <Brain className={size === "sm" ? "w-3 h-3 text-primary-light" : "w-4 h-4 text-primary-light"} />
      <span className="text-muted-foreground">Goose</span>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className={status === "ready" ? "text-accent" : status === "analyzing" ? "text-accent-yellow" : "text-accent-red"}>
        {label}
      </span>
    </div>
  );
}
