import { useState, useEffect, useCallback } from "react";
import type { Waypoint } from "@/mocks/routes";
import { Shield, AlertTriangle, CheckCircle, Navigation, MapPin, Brain } from "lucide-react";

interface ARSimulationProps {
  waypoints: Waypoint[];
  onComplete: (result: { waypointsReached: number; offRouteCount: number; journeyTime: number }) => void;
  onCancel: () => void;
}

const getSafetyColor = (safety: number) => {
  if (safety >= 8) return "bg-accent";
  if (safety >= 5) return "bg-accent-yellow";
  return "bg-accent-red";
};

const getSafetyGlow = (safety: number) => {
  if (safety >= 8) return "shadow-[0_0_20px_hsl(var(--accent))]";
  if (safety >= 5) return "shadow-[0_0_20px_hsl(var(--accent-yellow))]";
  return "shadow-[0_0_20px_hsl(var(--accent-red))]";
};

const getSafetyIcon = (safety: number) => {
  if (safety >= 8) return <CheckCircle className="w-5 h-5" />;
  return <AlertTriangle className="w-5 h-5" />;
};

export default function ARSimulation({ waypoints, onComplete, onCancel }: ARSimulationProps) {
  const [currentWaypoint, setCurrentWaypoint] = useState(0);
  const [offRouteCount, setOffRouteCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [showOffRouteWarning, setShowOffRouteWarning] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [started]);

  useEffect(() => {
    if (!started || currentWaypoint >= waypoints.length) return;
    const chance = setTimeout(() => {
      if (Math.random() < 0.15 && currentWaypoint > 0 && currentWaypoint < waypoints.length - 1) {
        triggerOffRoute();
      }
    }, 2000 + Math.random() * 3000);
    return () => clearTimeout(chance);
  }, [currentWaypoint, started]);

  const triggerOffRoute = useCallback(() => {
    setOffRouteCount((c) => c + 1);
    setShaking(true);
    setShowOffRouteWarning(true);
    setTimeout(() => setShaking(false), 600);
    setTimeout(() => setShowOffRouteWarning(false), 3000);
  }, []);

  const handleWalk = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (currentWaypoint < waypoints.length - 1) {
      setCurrentWaypoint((c) => c + 1);
    }
    if (currentWaypoint === waypoints.length - 2) {
      setTimeout(() => {
        onComplete({
          waypointsReached: waypoints.length,
          offRouteCount,
          journeyTime: Math.ceil(elapsed / 60) || 1,
        });
      }, 800);
    }
  };

  const wp = waypoints[currentWaypoint];
  const progress = ((currentWaypoint + 1) / waypoints.length) * 100;

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-border ${shaking ? "animate-shake" : ""}`}>
      <div className="relative h-[500px] bg-gradient-to-b from-[hsl(220,20%,8%)] via-[hsl(220,15%,12%)] to-[hsl(220,10%,6%)] flex flex-col">
        {/* Street perspective */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-t from-muted-foreground/20 to-transparent" />
          <div className="absolute bottom-0 left-[30%] w-[1px] h-[70%] bg-gradient-to-t from-muted-foreground/10 to-transparent" />
          <div className="absolute bottom-0 left-[70%] w-[1px] h-[70%] bg-gradient-to-t from-muted-foreground/10 to-transparent" />
          <div className="absolute top-[20%] left-[20%] w-32 h-32 rounded-full bg-accent-yellow/5 blur-3xl" />
          <div className="absolute top-[40%] right-[25%] w-24 h-24 rounded-full bg-accent/5 blur-3xl" />
        </div>

        {/* Off-route warning overlay */}
        {showOffRouteWarning && (
          <div className="absolute inset-0 bg-accent-red/15 z-20 flex items-center justify-center animate-pulse">
            <div className="bg-card/90 backdrop-blur-sm border border-accent-red rounded-xl px-6 py-4 text-center max-w-xs">
              <AlertTriangle className="w-8 h-8 text-accent-red mx-auto mb-2" />
              <p className="text-accent-red font-bold">You're off the safe path</p>
              <p className="text-sm text-muted-foreground mt-1">It's okay. Goose will help you get back to a safer path.</p>
            </div>
          </div>
        )}

        {/* Floating waypoint markers */}
        <div className="flex-1 relative flex items-center justify-center gap-6 px-8">
          {waypoints.map((w, i) => {
            const isReached = i <= currentWaypoint;
            const isCurrent = i === currentWaypoint;
            const scale = isCurrent ? "scale-125" : isReached ? "scale-90 opacity-60" : "scale-75 opacity-40";
            return (
              <div key={i} className={`flex flex-col items-center transition-all duration-500 ${scale}`}>
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500
                    ${isCurrent ? `${getSafetyColor(w.safety)} ${getSafetyGlow(w.safety)} border-foreground` : isReached ? `${getSafetyColor(w.safety)} border-transparent` : "bg-muted border-border"}`}
                  aria-label={`Safety marker ${i + 1}/${waypoints.length} — ${w.safety}/10: ${w.description || `Point ${i + 1}`}`}
                >
                  {isReached ? getSafetyIcon(w.safety) : <MapPin className="w-5 h-5 text-muted-foreground" />}
                </div>
                <span className={`text-xs mt-2 max-w-[80px] text-center leading-tight ${isCurrent ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {w.description || `Point ${i + 1}`}
                </span>
                {isCurrent && (
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <Shield className="w-3 h-3" />
                    <span className={w.safety >= 8 ? "text-accent" : w.safety >= 5 ? "text-accent-yellow" : "text-accent-red"}>
                      {w.safety}/10
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom HUD */}
        <div className="relative z-10 p-6 space-y-4 bg-gradient-to-t from-background/80 to-transparent">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Waypoints: {Math.min(currentWaypoint + 1, waypoints.length)}/{waypoints.length}</span>
              <span>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")} elapsed</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-accent">
              <CheckCircle className="w-4 h-4" />
              <span>{Math.min(currentWaypoint + (started ? 1 : 0), waypoints.length)} reached</span>
            </div>
            <div className={`flex items-center gap-1.5 ${offRouteCount > 3 ? "text-accent-red" : "text-accent-yellow"}`}>
              <AlertTriangle className="w-4 h-4" />
              <span>{offRouteCount} off-route</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary-light ml-auto">
              <Brain className="w-4 h-4" />
              <span className="text-xs">Goose Mode: ON</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleWalk}
              disabled={currentWaypoint >= waypoints.length - 1 && started}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary-light transition-all disabled:opacity-50 min-h-[48px]"
              aria-label={!started ? "Start walking the safe route" : `Walk to waypoint ${currentWaypoint + 2}`}
            >
              <Navigation className="w-4 h-4" />
              {!started ? "Start Walking" : currentWaypoint >= waypoints.length - 1 ? "Journey Complete" : `Walk to Waypoint ${currentWaypoint + 2}`}
            </button>
            <button
              onClick={onCancel}
              className="px-5 py-3 rounded-full border border-border text-sm text-muted-foreground hover:bg-muted transition-all min-h-[48px]"
              aria-label="Cancel navigation and return to route preview"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
