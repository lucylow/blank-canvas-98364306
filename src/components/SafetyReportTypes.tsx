import { Lightbulb, ShieldAlert, Users, AlertTriangle, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ReportType {
  icon: LucideIcon;
  label: string;
  description: string;
  positive?: boolean;
}

const reportTypes: ReportType[] = [
  { icon: Lightbulb, label: "Broken / missing streetlight", description: "Report lighting issues that affect visibility" },
  { icon: ShieldAlert, label: "Harassment or catcalling reported", description: "Help others know about unsafe behavior" },
  { icon: Users, label: "Group loitering near route", description: "Report intimidating gatherings near walkways" },
  { icon: AlertTriangle, label: "Unsafe shortcut / alley", description: "Flag dark or isolated pathways to avoid" },
  { icon: Heart, label: "Area feels safe & active", description: "Mark well-lit, busy spots that feel secure", positive: true },
];

export default function SafetyReportTypes() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Report a Safety Concern</h3>
      <div className="space-y-2">
        {reportTypes.map((r, i) => (
          <button
            key={i}
            className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors text-left hover:-translate-y-0.5 transition-all ${
              r.positive
                ? "border-accent/30 bg-accent/5 hover:border-accent/50"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              r.positive ? "bg-accent/20" : "gradient-hero"
            }`}>
              <r.icon className={`w-4 h-4 ${r.positive ? "text-accent" : "text-accent"}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium">{r.label}</p>
              <p className="text-xs text-muted-foreground">{r.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Guidance */}
      <div className="bg-muted/50 rounded-lg border border-border p-3 space-y-1.5 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground text-xs">Reporting guidelines:</p>
        <p>• Do not include faces, license plates, or identifying details.</p>
        <p>• Focus on place conditions (lighting, crowd, visibility).</p>
        <p className="text-primary-light mt-2">Your report helps other women and gender-diverse commuters choose safer routes.</p>
      </div>
    </div>
  );
}
