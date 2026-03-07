import { Map, Globe, ShieldAlert, Users, Brain } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  role: string;
  icon: LucideIcon;
}

const defaultSources: DataSource[] = [
  { id: "osm", name: "OpenStreetMap", role: "Highlights well-lit streets", icon: Map },
  { id: "unwomen", name: "UN Women", role: "Quantifies harassment risk", icon: Globe },
  { id: "incidents", name: "Local Incident Data", role: "Flags recent transit hotspots", icon: ShieldAlert },
  { id: "community", name: "Community Reports", role: "Photos & check-ins from users", icon: Users },
];

interface AIPoweredByPanelProps {
  sources?: DataSource[];
  compact?: boolean;
}

export default function AIPoweredByPanel({ sources = defaultSources, compact = false }: AIPoweredByPanelProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Brain className="w-3 h-3 text-primary-light" /> Goose is using:
        </span>
        {sources.map((s) => (
          <span key={s.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
            <s.icon className="w-3 h-3 text-primary-light" />
            {s.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <Brain className="w-4 h-4 text-primary-light" />
        <span>Goose is using:</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sources.map((s) => (
          <div key={s.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 border border-border">
            <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center shrink-0">
              <s.icon className="w-4 h-4 text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">{s.name}</p>
              <p className="text-xs text-muted-foreground truncate">{s.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
