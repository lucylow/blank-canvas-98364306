import { Cloud, Users, CalendarDays } from "lucide-react";

export default function WeatherConditions() {
  return (
    <div className="flex flex-wrap gap-2 text-xs">
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground">
        <Cloud className="w-3 h-3" />
        <span>Weather: Clear</span>
        <span className="text-accent text-[10px]">●</span>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground">
        <Users className="w-3 h-3" />
        <span>Crowd: Moderate</span>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground opacity-50">
        <CalendarDays className="w-3 h-3" />
        <span>Events: None detected</span>
        <span className="text-[10px] italic">Future</span>
      </div>
    </div>
  );
}
