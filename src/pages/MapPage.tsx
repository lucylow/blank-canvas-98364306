import { useState } from "react";
import { apiClient } from "@/services/api";
import type { SafeRouteResponse } from "@/mocks/routes";
import ARSimulation from "@/components/ARSimulation";
import SuccessScreen from "@/components/SuccessScreen";
import MapPreview from "@/components/MapPreview";
import GooseAnalysis from "@/components/GooseAnalysis";
import GooseBadge from "@/components/GooseBadge";
import { Navigation, Shield, MapPin, AlertTriangle, Search, RotateCcw, Brain, ArrowRight } from "lucide-react";

type Phase = "idle" | "analyzing" | "loading" | "preview" | "walking" | "result";

export default function MapPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [route, setRoute] = useState<SafeRouteResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ waypointsReached: number; offRouteCount: number; journeyTime: number } | null>(null);

  const startAnalysis = () => {
    setPhase("analyzing");
    setError(null);
  };

  const fetchRoute = async () => {
    setPhase("loading");
    try {
      const data = await apiClient.fetchSafeRoute();
      if (!data.success) {
        setError(data.error || "Failed to calculate route.");
        setPhase("idle");
        return;
      }
      setRoute(data);
      setPhase("preview");
    } catch {
      setError("Goose is unavailable. Showing a pre-tested safe demo route.");
      setPhase("idle");
    }
  };

  const handleWalkComplete = (res: { waypointsReached: number; offRouteCount: number; journeyTime: number }) => {
    setResult(res);
    setPhase("result");
  };

  const reset = () => {
    setPhase("idle");
    setRoute(null);
    setResult(null);
    setError(null);
  };

  // Result screen
  if (phase === "result" && route && result) {
    return (
      <div className="container py-10">
        <SuccessScreen
          waypointsReached={result.waypointsReached}
          totalWaypoints={route.path.length}
          offRouteCount={result.offRouteCount}
          journeyTime={result.journeyTime}
          safetyScore={route.safetyscore}
          onMintNFT={async () => { await apiClient.mintNFT("journey-new"); }}
          onClose={reset}
        />
      </div>
    );
  }

  // AR Walking simulation
  if (phase === "walking" && route) {
    return (
      <div className="container py-10 space-y-4">
        {/* Top HUD */}
        <div className="flex items-center justify-between bg-card rounded-xl border border-border px-5 py-3">
          <span className="text-sm font-semibold">Home — ~6 min</span>
          <div className={`text-sm font-bold px-3 py-1 rounded-full ${route.safetyscore >= 8 ? "bg-accent/20 text-accent" : "bg-accent-yellow/20 text-accent-yellow"}`}>
            Safety: {route.safetyscore}/10 (Goose)
          </div>
          <GooseBadge status="ready" />
        </div>
        <ARSimulation
          waypoints={route.path}
          onComplete={handleWalkComplete}
          onCancel={() => setPhase("preview")}
        />
      </div>
    );
  }

  // Goose Analysis animation
  if (phase === "analyzing") {
    return (
      <div className="container py-20">
        <GooseAnalysis onComplete={fetchRoute} />
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Navigation className="w-8 h-8 text-accent" /> Route Navigator
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            Find the safest route powered by <GooseBadge status={phase === "loading" ? "analyzing" : "ready"} />
          </p>
        </div>
        {phase === "idle" && (
          <button
            onClick={startAnalysis}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary-light transition-all self-start"
          >
            <Brain className="w-4 h-4" /> Find Safe Route with Goose
          </button>
        )}
        {phase === "preview" && (
          <div className="flex gap-3">
            <button
              onClick={() => setPhase("walking")}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition-all"
            >
              <Navigation className="w-4 h-4" /> Start AR Safe Route
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-3 rounded-full border border-border text-sm text-muted-foreground hover:bg-muted transition-all"
            >
              <RotateCcw className="w-4 h-4" /> New Route
            </button>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-accent-red/10 border border-accent-red/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-accent-red shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-accent-red">Route Error</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </div>
      )}

      {/* Loading fallback */}
      {phase === "loading" && (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center animate-pulse-glow">
            <Brain className="w-6 h-6 text-accent" />
          </div>
          <p className="text-muted-foreground text-lg">Goose is finalizing your route…</p>
        </div>
      )}

      {/* Route Preview (Goose output summary) */}
      {phase === "preview" && route && (
        <>
          {/* Goose summary card */}
          <div className="bg-card rounded-xl border border-primary/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-bold flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary-light" /> Goose Safe Route Ready
              </h2>
              <GooseBadge status="ready" />
            </div>
            <p className="text-sm text-muted-foreground">
              {route.path.length} waypoints · Safety Score: <span className="text-accent font-bold">{route.safetyscore}/10</span> · Est. 6 min
            </p>
            <p className="text-xs text-muted-foreground">
              Goose favors well-lit streets and places where people are around, and avoids recent incident hotspots.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="bg-card rounded-lg border border-border px-4 py-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold">Safety: <span className="text-accent">{route.safetyscore}/10</span></span>
            </div>
            <div className="bg-card rounded-lg border border-border px-4 py-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent-yellow" />
              <span className="text-sm font-semibold">{route.path.length} Waypoints</span>
            </div>
            <div className="bg-card rounded-lg border border-border px-4 py-2 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-primary-light" />
              <span className="text-sm font-semibold">~450m</span>
            </div>
          </div>

          <MapPreview route={route} />

          {/* Legend */}
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent inline-block shadow-[0_0_8px_hsl(var(--accent))]" /> Safe (8-10)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-yellow inline-block shadow-[0_0_8px_hsl(var(--accent-yellow))]" /> Caution (5-7)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-accent-red inline-block shadow-[0_0_8px_hsl(var(--accent-red))]" /> High Risk (1-4)
            </span>
          </div>

          {/* Waypoint Details */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-accent-yellow" /> Waypoint Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {route.path.map((wp, i) => {
                const color = wp.safety >= 8 ? "border-accent/40 bg-accent/5" : wp.safety >= 5 ? "border-accent-yellow/40 bg-accent-yellow/5" : "border-accent-red/40 bg-accent-red/5";
                const textColor = wp.safety >= 8 ? "text-accent" : wp.safety >= 5 ? "text-accent-yellow" : "text-accent-red";
                return (
                  <div key={i} className={`rounded-lg border p-4 ${color}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Waypoint {i + 1}</span>
                      <span className={`font-bold text-sm ${textColor}`}>{wp.safety}/10</span>
                    </div>
                    <p className="text-sm font-medium">{wp.description || `Point ${i + 1}`}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Idle state */}
      {phase === "idle" && !error && (
        <div className="text-center py-20 space-y-4">
          <div className="w-20 h-20 gradient-hero rounded-full mx-auto flex items-center justify-center animate-pulse-glow">
            <Brain className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-2xl font-bold">Goose AI: Ready to Navigate</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Press "Find Safe Route with Goose" to calculate the safest path. Goose analyzes lighting, crime data, and community reports in real-time.
          </p>
          <div className="text-xs text-muted-foreground mt-4">
            Demo: NYC Bus Stop (40.7128°N) → Home (40.7132°N) · ~450m
          </div>
        </div>
      )}
    </div>
  );
}
