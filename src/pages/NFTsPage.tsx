import NFTGallery from "@/components/NFTGallery";
import { Award, Info } from "lucide-react";

export default function NFTsPage() {
  return (
    <div className="container py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Award className="w-8 h-8 text-accent" /> My Safe Passage NFTs
        </h1>
        <p className="text-muted-foreground mt-1">Soulbound tokens minted for each safe journey you complete.</p>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Safe Passage NFTs are non-transferable Soulbound tokens. Each one records your journey's date, safety score, distance, and a unique route hash on-chain.
        </p>
      </div>

      <NFTGallery />
    </div>
  );
}
