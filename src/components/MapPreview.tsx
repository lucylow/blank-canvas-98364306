import type { SafeRouteResponse } from "@/mocks/routes";
import { mockPrimaryRoute } from "@/mocks/routes";
import TrustedPoints from "@/components/TrustedPoints";
import { Brain } from "lucide-react";

const getColor = (safety: number) => {
  if (safety >= 8) return "bg-accent";
  if (safety >= 5) return "bg-accent-yellow";
  return "bg-accent-red";
};

const getGlow = (safety: number) => {
  if (safety >= 8) return "shadow-[0_0_8px_hsl(var(--accent))]";
  if (safety >= 5) return "shadow-[0_0_8px_hsl(var(--accent-yellow))]";
  return "shadow-[0_0_8px_hsl(var(--accent-red))]";
};

const getStroke = (safety: number) => {
  if (safety >= 8) return "hsl(var(--accent))";
  if (safety >= 5) return "hsl(var(--accent-yellow))";
  return "hsl(var(--accent-red))";
};

interface MapPreviewProps {
  route?: SafeRouteResponse;
}

export default function MapPreview({ route }: MapPreviewProps) {
  const data = route || mockPrimaryRoute;
  const waypoints = data.path;

  return (
    <div className="w-full h-[500px] rounded-lg bg-card border border-border relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />

      {/* Safety heat overlay - green glow along safe path */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Safe corridor glow */}
        <div className="absolute top-[30%] left-[10%] right-[10%] h-[40%] rounded-full bg-accent/5 blur-3xl" />
        {/* Avoid zone hints */}
        <div className="absolute top-[10%] left-[5%] w-24 h-24 rounded-full bg-accent-red/8 blur-2xl" />
        <div className="absolute bottom-[15%] right-[8%] w-20 h-20 rounded-full bg-accent-red/8 blur-2xl" />
        {/* Active safe zone */}
        <div className="absolute top-[40%] left-[40%] w-32 h-32 rounded-full bg-accent/8 blur-3xl" />
      </div>

      {/* Route visualization */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet">
        {/* Glow filter */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {waypoints.slice(1).map((point, index) => {
          const x1 = 50 + index * 110;
          const y1 = 250 + Math.sin(index * 1.5) * 80;
          const x2 = 50 + (index + 1) * 110;
          const y2 = 250 + Math.sin((index + 1) * 1.5) * 80;
          return (
            <line key={index} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={getStroke(point.safety)} strokeWidth="4" strokeLinecap="round" opacity="0.8" filter="url(#glow)" />
          );
        })}
      </svg>

      {/* Trusted points (24h shops, cafes, etc.) */}
      <TrustedPoints />

      {/* Waypoint dots */}
      {waypoints.map((point, idx) => {
        const left = `${8 + idx * (84 / Math.max(waypoints.length - 1, 1))}%`;
        const top = `${50 + Math.sin(idx * 1.5) * 16}%`;
        return (
          <div key={idx} className="absolute group" style={{ left, top, transform: "translate(-50%, -50%)" }}>
            <div className={`w-4 h-4 rounded-full ${getColor(point.safety)} ${getGlow(point.safety)} border-2 border-background cursor-pointer transition-transform hover:scale-150`} />
            <div className="hidden group-hover:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-popover border border-border rounded-md p-2 text-xs w-40 z-10 shadow-lg">
              <p className="font-semibold">Safety: {point.safety}/10</p>
              <p className="text-muted-foreground">{point.description || `Waypoint ${idx + 1}`}</p>
            </div>
            {idx === 0 && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-accent whitespace-nowrap">START</span>
            )}
            {idx === waypoints.length - 1 && (
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-accent whitespace-nowrap">END</span>
            )}
          </div>
        );
      })}

      {/* Safety heat legend */}
      <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2.5 text-xs space-y-1.5 z-10">
        <div className="flex items-center gap-1.5 font-semibold text-foreground">
          <Brain className="w-3 h-3 text-primary-light" /> Goose Safety Layers
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" /> Well-lit, active, low-incident
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-accent-yellow inline-block" /> Lighting or activity borderline
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-accent-red inline-block" /> Incidents or poor lighting
        </div>
      </div>

      <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-card/80 px-2 py-1 rounded border border-border">
        Interactive map preview • Hover waypoints for details
      </div>
    </div>
  );
}
