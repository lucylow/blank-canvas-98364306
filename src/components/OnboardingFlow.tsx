import { useState } from "react";
import { Bus, Route, Lock, ArrowRight, X } from "lucide-react";

const slides = [
  {
    icon: Bus,
    title: "Built for the last mile",
    copy: "SafeStep is designed for women and gender-diverse people who have to walk home alone at night from buses, trains, and rideshares.",
    visual: "🚌 → 🌙 → 🏠",
  },
  {
    icon: Route,
    title: "Safety over speed",
    copy: "Goose will choose safer-feeling routes over fastest shortcuts, based on lighting, activity, and community reports.",
    visual: "🔴 dark park shortcut vs 🟢 lit streets",
  },
  {
    icon: Lock,
    title: "Privacy and control",
    copy: "We don't store your GPS history. You control what you share, and you can use demo mode with mock data anytime.",
    visual: "🔒 Your data stays yours",
  },
];

interface OnboardingFlowProps {
  onComplete: () => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < slides.length - 1) {
      setStep(step + 1);
    } else {
      localStorage.setItem("safestep-onboarded", "true");
      onComplete();
    }
  };

  const handleSkip = () => {
    localStorage.setItem("safestep-onboarded", "true");
    onComplete();
  };

  const s = slides[step];

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-fade-in" key={step}>
        {/* Skip */}
        <div className="flex justify-end">
          <button onClick={handleSkip} className="text-muted-foreground hover:text-foreground transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Icon */}
        <div className="text-center space-y-6">
          <div className="w-20 h-20 gradient-hero rounded-3xl mx-auto flex items-center justify-center">
            <s.icon className="w-10 h-10 text-accent" />
          </div>

          <h2 className="text-2xl font-bold">{s.title}</h2>

          <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
            {s.copy}
          </p>

          {/* Visual hint */}
          <div className="bg-card rounded-xl border border-border p-4 text-sm text-muted-foreground">
            {s.visual}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${i === step ? "bg-accent w-6" : "bg-muted"}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary-light transition-all"
          >
            {step < slides.length - 1 ? (
              <>Next <ArrowRight className="w-4 h-4" /></>
            ) : (
              "Get Started"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
