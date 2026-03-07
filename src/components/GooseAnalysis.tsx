import { useState, useEffect } from "react";
import { Lightbulb, ShieldAlert, Users, CheckCircle, Loader2 } from "lucide-react";

interface GooseAnalysisProps {
  onComplete: () => void;
}

const steps = [
  { icon: Lightbulb, label: "Checking street lighting", source: "OpenStreetMap" },
  { icon: ShieldAlert, label: "Reviewing recent incidents", source: "Crime data" },
  { icon: Users, label: "Weighing community reports", source: "SafeStep network" },
];

export default function GooseAnalysis({ onComplete }: GooseAnalysisProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = steps.map((_, i) =>
      setTimeout(() => {
        setActiveStep(i + 1);
        if (i === steps.length - 1) {
          setTimeout(onComplete, 600);
        }
      }, (i + 1) * 1200)
    );
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 gradient-hero rounded-2xl mx-auto flex items-center justify-center animate-pulse-glow">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
        </div>
        <h2 className="text-xl font-bold">Goose is building your safe route</h2>
        <p className="text-sm text-muted-foreground">Analyzing lighting, incidents & community signals</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        {steps.map((step, i) => {
          const done = activeStep > i;
          const active = activeStep === i;
          return (
            <div key={i} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${done ? "bg-accent/20" : active ? "gradient-hero" : "bg-muted"}`}>
                {done ? (
                  <CheckCircle className="w-5 h-5 text-accent" />
                ) : (
                  <step.icon className={`w-5 h-5 ${active ? "text-primary-foreground animate-pulse" : "text-muted-foreground"}`} />
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium transition-colors ${done ? "text-accent" : active ? "text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </p>
                <p className="text-xs text-muted-foreground">{step.source}</p>
              </div>
              <span className={`text-xs font-semibold ${done ? "text-accent" : active ? "text-accent-yellow" : "text-muted-foreground"}`}>
                {done ? "Done ✔" : active ? "In Progress" : "Pending"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
