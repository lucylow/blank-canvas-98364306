import { Brain, Info, Lock } from "lucide-react";
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription,
} from "@/components/ui/drawer";

interface Factor {
  label: string;
  value: number;
  levelLabel: string;
}

interface GooseExplainDrawerProps {
  safetyScore?: number;
  factors?: Factor[];
}

const defaultFactors: Factor[] = [
  { label: "Street Lighting", value: 85, levelLabel: "Strong" },
  { label: "Activity (people & businesses)", value: 60, levelLabel: "Medium" },
  { label: "Recent Incidents", value: 90, levelLabel: "Low risk in last 30 days" },
  { label: "Community Reports", value: 40, levelLabel: "Sparse data" },
];

export default function GooseExplainDrawer({ safetyScore = 8, factors = defaultFactors }: GooseExplainDrawerProps) {
  const confidence = safetyScore >= 8 ? "High" : safetyScore >= 5 ? "Medium" : "Low";
  const confidenceColor = safetyScore >= 8 ? "text-accent" : safetyScore >= 5 ? "text-accent-yellow" : "text-accent-red";

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-xs text-primary-light hover:text-accent transition-colors">
          <Info className="w-3.5 h-3.5" /> How Goose chose this route
        </button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-light" /> How Goose Thinks
          </DrawerTitle>
          <DrawerDescription>
            This path is ranked safer by Goose based on:
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-6 space-y-5">
          {/* Factor bars */}
          <div className="space-y-3">
            {factors.map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{f.label}</span>
                  <span className="text-xs text-muted-foreground">{f.levelLabel}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                    style={{ width: `${f.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Confidence */}
          <div className="bg-muted/50 rounded-lg border border-border p-3 flex items-center justify-between">
            <span className="text-sm font-medium">Goose Confidence</span>
            <span className={`text-sm font-bold ${confidenceColor}`}>{confidence}</span>
          </div>

          {/* Women-specific note */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 space-y-1.5">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Women and gender-diverse people often report feeling safer where streets are brighter and more active. Goose uses that insight to guide you.
            </p>
          </div>

          {/* Privacy note */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Goose uses anonymous, aggregated data. Your personal movements are not stored.</span>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
