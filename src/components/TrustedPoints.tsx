import { Store, Coffee, Shield, Cctv } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TrustedPoint {
  icon: LucideIcon;
  label: string;
  detail: string;
  position: { left: string; top: string };
}

const defaultPoints: TrustedPoint[] = [
  { icon: Store, label: "24h Shop", detail: "Open late, more people around", position: { left: "25%", top: "35%" } },
  { icon: Coffee, label: "Late-night café", detail: "Staffed until 2 AM", position: { left: "55%", top: "60%" } },
  { icon: Cctv, label: "Transit hub", detail: "CCTV monitored area", position: { left: "75%", top: "40%" } },
  { icon: Shield, label: "Main intersection", detail: "Well-lit, high foot traffic", position: { left: "45%", top: "25%" } },
];

interface TrustedPointsProps {
  points?: TrustedPoint[];
}

export default function TrustedPoints({ points = defaultPoints }: TrustedPointsProps) {
  return (
    <>
      {points.map((p, i) => (
        <div
          key={i}
          className="absolute group z-10"
          style={{ left: p.position.left, top: p.position.top, transform: "translate(-50%, -50%)" }}
        >
          <div className="w-6 h-6 rounded-lg bg-secondary border border-primary/30 flex items-center justify-center cursor-pointer hover:scale-125 transition-transform">
            <p.icon className="w-3.5 h-3.5 text-primary-light" />
          </div>
          <div className="hidden group-hover:block absolute bottom-8 left-1/2 -translate-x-1/2 bg-popover border border-border rounded-lg p-2.5 text-xs w-44 z-20 shadow-lg">
            <p className="font-semibold text-foreground">{p.label}</p>
            <p className="text-muted-foreground mt-0.5">{p.detail}</p>
          </div>
        </div>
      ))}
    </>
  );
}
