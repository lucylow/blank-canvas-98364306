import { CheckCircle, XCircle, Award, Share2, Shield, Brain } from "lucide-react";
import { useState } from "react";
import GooseBadge from "@/components/GooseBadge";
import AIPoweredByPanel from "@/components/AIPoweredByPanel";
import GooseExplainDrawer from "@/components/GooseExplainDrawer";

interface SuccessScreenProps {
  waypointsReached: number;
  totalWaypoints: number;
  offRouteCount: number;
  journeyTime: number;
  safetyScore: number;
  onMintNFT: () => Promise<void>;
  onClose: () => void;
}

export default function SuccessScreen({
  waypointsReached,
  totalWaypoints,
  offRouteCount,
  journeyTime,
  safetyScore,
  onMintNFT,
  onClose,
}: SuccessScreenProps) {
  const [minting, setMinting] = useState(false);
  const [minted, setMinted] = useState(false);
  const [txHash, setTxHash] = useState("");

  const allWaypoints = waypointsReached >= totalWaypoints;
  const withinWarnings = offRouteCount <= 3;
  const withinTime = journeyTime <= 15;
  const passed = allWaypoints && withinWarnings && withinTime;

  const handleMint = async () => {
    setMinting(true);
    try {
      await onMintNFT();
      setTxHash(`0x${Math.random().toString(16).slice(2, 18)}...polygon`);
      setMinted(true);
    } catch {
      // handled by parent
    } finally {
      setMinting(false);
    }
  };

  const handleShare = () => {
    const text = `🛡️ Goose guided me home safely: ${waypointsReached}/${totalWaypoints} waypoints, ${offRouteCount} off-route warning${offRouteCount !== 1 ? "s" : ""}, ${journeyTime} min journey, ${safetyScore}/10 safety score. #SafeStep #75HER`;
    if (navigator.share) {
      navigator.share({ title: "SafeStep Goose Report", text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${passed ? "bg-accent/20" : "bg-accent-red/20"}`}>
          {passed ? (
            <CheckCircle className="w-10 h-10 text-accent" />
          ) : (
            <XCircle className="w-10 h-10 text-accent-red" />
          )}
        </div>
        <h2 className="text-3xl font-extrabold">
          {passed ? "Safe Arrival – Goose Test Passed" : "❌ JOURNEY INCOMPLETE"}
        </h2>
        <p className="text-muted-foreground">
          {passed ? "This route met all your safety criteria." : "Success criteria not met"}
        </p>
        <div className="flex justify-center">
          <GooseBadge status="ready" />
        </div>
      </div>

      {/* Success Test Results */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-4">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
          Success Test Results
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {allWaypoints ? <CheckCircle className="w-4 h-4 text-accent" /> : <XCircle className="w-4 h-4 text-accent-red" />}
              <span className="text-sm">Waypoints reached</span>
            </div>
            <span className={`text-sm font-bold ${allWaypoints ? "text-accent" : "text-accent-red"}`}>
              {waypointsReached}/{totalWaypoints}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {withinWarnings ? <CheckCircle className="w-4 h-4 text-accent" /> : <XCircle className="w-4 h-4 text-accent-red" />}
              <span className="text-sm">Off-route incidents</span>
            </div>
            <span className={`text-sm font-bold ${withinWarnings ? "text-accent" : "text-accent-red"}`}>
              {offRouteCount} / ≤3 allowed
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {withinTime ? <CheckCircle className="w-4 h-4 text-accent" /> : <XCircle className="w-4 h-4 text-accent-red" />}
              <span className="text-sm">Journey time</span>
            </div>
            <span className={`text-sm font-bold ${withinTime ? "text-accent" : "text-accent-red"}`}>
              {journeyTime} min / ≤15 min allowed
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-primary-light" />
              <span className="text-sm">Safety score (Goose)</span>
            </div>
            <span className={`text-sm font-bold ${safetyScore >= 8 ? "text-accent" : safetyScore >= 5 ? "text-accent-yellow" : "text-accent-red"}`}>
              {safetyScore}/10
            </span>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between">
            <span className="font-bold">🎯 SUCCESS TEST:</span>
            <span className={`font-extrabold text-lg ${passed ? "text-accent" : "text-accent-red"}`}>
              {passed ? "PASSED" : "FAILED"}
            </span>
          </div>
        </div>
      </div>

      {/* Safety Score */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-3">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 gradient-hero rounded-xl flex items-center justify-center">
            <Shield className="w-7 h-7 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Safety Score (Goose AI)</p>
            <p className="text-3xl font-extrabold text-accent">{safetyScore}/10</p>
            {safetyScore >= 8 && <p className="text-xs text-accent">Goose Confidence: High</p>}
          </div>
        </div>
        <GooseExplainDrawer safetyScore={safetyScore} />
      </div>

      <AIPoweredByPanel compact />

      {/* NFT Mint */}
      {passed && (
        <div className="space-y-3">
          {minted ? (
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center space-y-2">
              <Award className="w-8 h-8 text-accent mx-auto" />
              <p className="font-bold text-accent">Safe Passage NFT Minted!</p>
              <p className="text-xs text-muted-foreground break-all font-mono">TX: {txHash}</p>
            </div>
          ) : (
            <button
              onClick={handleMint}
              disabled={minting}
              className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary-light transition-all disabled:opacity-50 min-h-[48px]"
              aria-label="Mint your Safe Passage NFT on Polygon blockchain"
            >
              <Award className="w-5 h-5" />
              {minting ? "Minting on Polygon..." : "Mint Safe Passage NFT"}
            </button>
          )}

          <button
            onClick={handleShare}
            className="w-full py-3 rounded-full border border-border text-sm font-semibold flex items-center justify-center gap-2 hover:bg-muted transition-all"
          >
            <Share2 className="w-4 h-4" /> Share Goose Report
          </button>

          <p className="text-xs text-muted-foreground text-center">
            No GPS history is stored. Only an anonymized safety summary can be minted.
          </p>
        </div>
      )}

      <button
        onClick={onClose}
        className="w-full py-3 text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
      >
        Return to Dashboard
      </button>
    </div>
  );
}
