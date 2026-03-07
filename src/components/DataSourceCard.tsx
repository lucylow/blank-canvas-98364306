import { ExternalLink, type LucideIcon } from "lucide-react";

interface DataSourceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  url: string;
}

export default function DataSourceCard({ icon: Icon, title, description, url }: DataSourceCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 flex items-start gap-4 hover:border-primary/40 transition-colors">
      <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-light hover:text-accent transition-colors shrink-0 mt-1"
        aria-label={`Open ${title} source`}
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}
