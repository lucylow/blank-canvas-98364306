import { FileText, Globe, ShieldAlert, Users, Brain } from "lucide-react";
import DataSourceCard from "@/components/DataSourceCard";
import GooseBadge from "@/components/GooseBadge";
import AIPoweredByPanel from "@/components/AIPoweredByPanel";

const sources = [
  {
    icon: Users,
    title: "UN Women – Safe Cities",
    description: "Global street harassment statistics informing risk models for women's safety.",
    url: "https://www.unwomen.org/en/what-we-do/ending-violence-against-women/creating-safe-public-spaces",
  },
  {
    icon: Globe,
    title: "OpenStreetMap – Lighting Data",
    description: "Street-level lighting tags (Key: lit) used to assess nighttime visibility.",
    url: "https://wiki.openstreetmap.org/wiki/Key:lit",
  },
  {
    icon: ShieldAlert,
    title: "Crime & Transit Safety Reports",
    description: "Publicly available transit safety and crime incident datasets.",
    url: "https://data.cityofnewyork.us/",
  },
  {
    icon: FileText,
    title: "Community Reports (SafeStep)",
    description: "User-submitted safety reports verified through DAO governance staking.",
    url: "#",
  },
];

export default function DataSourcesPage() {
  return (
    <div className="container py-10 max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Brain className="w-8 h-8 text-primary-light" /> Evidence & Data Sources
        </h1>
        <GooseBadge />
      </div>

      <p className="text-muted-foreground">
        These sources inform how Goose ranks and scores routes. Each data point contributes to the safety score you see during navigation.
      </p>

      <div className="bg-card rounded-xl border border-primary/30 p-5 space-y-2">
        <h2 className="font-semibold flex items-center gap-2 text-sm">
          <Brain className="w-4 h-4 text-primary-light" /> How Goose Decides What's Safe
        </h2>
        <ul className="text-sm text-muted-foreground space-y-1.5">
          <li className="flex items-center gap-2">
            <span className="text-accent">✔</span> Prefers well-lit streets over dark shortcuts
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">✔</span> Prioritizes areas with people and open businesses
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">✔</span> Downweights routes with recent incident reports
          </li>
          <li className="flex items-center gap-2">
            <span className="text-accent">✔</span> Gives extra weight to verified community reports
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        {sources.map((s, i) => (
          <DataSourceCard key={i} {...s} />
        ))}
      </div>

      <AIPoweredByPanel />

      <p className="text-xs text-muted-foreground text-center">
        See EVIDENCE_LOG.md for full citations and methodology.
      </p>
    </div>
  );
}
