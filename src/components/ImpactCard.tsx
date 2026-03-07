import { type LucideIcon } from "lucide-react";

interface ImpactCardProps {
  icon: LucideIcon;
  sdg: string;
  title: string;
  description: string;
}

export default function ImpactCard({ icon: Icon, sdg, title, description }: ImpactCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 hover:border-primary/40 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div>
          <span className="text-xs font-bold text-primary-light uppercase tracking-wider">{sdg}</span>
          <h3 className="font-semibold mt-1">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
