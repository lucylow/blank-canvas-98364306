import { useEffect, useState } from "react";
import { apiClient } from "@/services/api";
import type { CommunityReport } from "@/mocks/community";
import { AlertTriangle, Lightbulb, MapPin, HelpCircle } from "lucide-react";

const statusLabels = ["Pending", "Valid", "Invalid", "Cancelled"];
const statusColors = [
  "bg-accent-yellow/20 text-accent-yellow",
  "bg-accent/20 text-accent",
  "bg-accent-red/20 text-accent-red",
  "bg-muted text-muted-foreground",
];

const typeLabels = ["Broken Light", "Suspicious", "Unsafe Area", "Other"];
const typeIcons = [Lightbulb, AlertTriangle, MapPin, HelpCircle];

export default function ReportsList() {
  const [reports, setReports] = useState<CommunityReport[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .getReports()
      .then(setReports)
      .catch(() => setError("Failed to load reports."));
  }, []);

  if (error) return <p className="text-accent-red py-8 text-center">{error}</p>;

  return (
    <div className="space-y-4">
      {reports.map((r) => {
        const TypeIcon = typeIcons[r.reportType] || HelpCircle;
        return (
          <div key={r.id} className="bg-card rounded-lg border border-border p-6 hover:border-primary transition-colors">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <TypeIcon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Report #{r.id}</h3>
                  <p className="text-xs text-muted-foreground">{typeLabels[r.reportType]}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[r.status]}`}>
                {statusLabels[r.status]}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">{r.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span>Stake: <strong className="text-foreground">{r.stakeAmount} MATIC</strong></span>
              <span>For: <strong className="text-accent">{r.yesVotes}</strong></span>
              <span>Against: <strong className="text-accent-red">{r.noVotes}</strong></span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
