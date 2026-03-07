import { useEffect, useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { apiClient } from "@/services/api";
import WalletConnect from "@/components/WalletConnect";
import GooseBadge from "@/components/GooseBadge";
import ImpactCard from "@/components/ImpactCard";
import type { UserJourney } from "@/mocks/user";
import { Shield, Award, FileWarning, Wallet, Copy, Check, Clock, CheckCircle, XCircle, Navigation, Brain, Heart, Globe, Scale } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { address } = useWallet();
  const [copied, setCopied] = useState(false);
  const [journeys, setJourneys] = useState<UserJourney[]>([]);
  const [stats, setStats] = useState<{ totalJourneys: number; passedJourneys: number; totalNFTs: number; avgSafetyScore: number; reportsSubmitted: number } | null>(null);

  useEffect(() => {
    if (address) {
      apiClient.getUserJourneys().then(setJourneys).catch(() => {});
      apiClient.getUserStats().then(setStats).catch(() => {});
    }
  }, [address]);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container py-10 max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Wallet className="w-8 h-8 text-accent" /> Profile
        </h1>
        <GooseBadge />
      </div>

      {/* Wallet Card */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Wallet Connection</h2>
          <WalletConnect />
        </div>
        {address ? (
          <div className="flex items-center gap-2 bg-background rounded-lg px-4 py-3 border border-border">
            <span className="w-3 h-3 rounded-full bg-accent animate-pulse-glow shrink-0" />
            <code className="text-sm text-muted-foreground break-all flex-1">{address}</code>
            <button onClick={copyAddress} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
              {copied ? <Check className="w-4 h-4 text-accent" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ) : (
          <p className="text-muted-foreground">Connect your wallet to view your profile and stats.</p>
        )}
      </div>

      {address && stats && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl border border-border p-6 text-center hover:border-accent/40 transition-colors">
              <Award className="w-8 h-8 text-accent mx-auto mb-3" />
              <p className="text-3xl font-extrabold text-accent">{stats.totalNFTs}</p>
              <p className="text-sm text-muted-foreground mt-1">NFTs Earned</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 text-center hover:border-accent-yellow/40 transition-colors">
              <FileWarning className="w-8 h-8 text-accent-yellow mx-auto mb-3" />
              <p className="text-3xl font-extrabold text-accent-yellow">{stats.reportsSubmitted}</p>
              <p className="text-sm text-muted-foreground mt-1">Reports Filed</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-6 text-center hover:border-primary/40 transition-colors">
              <Shield className="w-8 h-8 text-primary-light mx-auto mb-3" />
              <p className="text-3xl font-extrabold text-primary-light">{stats.avgSafetyScore}</p>
              <p className="text-sm text-muted-foreground mt-1">Avg Safety Score</p>
            </div>
          </div>

          {/* My Safe Journeys */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-muted-foreground" /> My Safe Journeys
            </h2>
            <div className="space-y-3">
              {journeys.map((j) => (
                <div key={j.id} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${j.passed ? "bg-accent/20" : "bg-accent-red/20"}`}>
                    {j.passed ? <CheckCircle className="w-5 h-5 text-accent" /> : <XCircle className="w-5 h-5 text-accent-red" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{j.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${j.passed ? "bg-accent/20 text-accent" : "bg-accent-red/20 text-accent-red"}`}>
                        {j.passed ? "PASSED" : "FAILED"}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary-light font-medium flex items-center gap-1">
                        <Brain className="w-3 h-3" /> Goose route
                      </span>
                      {j.nftMinted && <Award className="w-3.5 h-3.5 text-accent-yellow" />}
                    </div>
                    <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {j.safetyScore}/10</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {j.journeyTime}min</span>
                      <span>{j.waypointsReached}/{j.totalWaypoints} waypoints</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(j.startTime).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How Goose Decides */}
          <div className="bg-card rounded-xl border border-primary/30 p-6 space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary-light" /> How Goose Decides What's Safe
            </h2>
            <ul className="text-sm text-muted-foreground space-y-1.5">
              <li className="flex items-center gap-2"><span className="text-accent">✔</span> Prefers well-lit streets over dark shortcuts</li>
              <li className="flex items-center gap-2"><span className="text-accent">✔</span> Prioritizes areas with people and open businesses</li>
              <li className="flex items-center gap-2"><span className="text-accent">✔</span> Downweights routes with recent incident reports</li>
              <li className="flex items-center gap-2"><span className="text-accent">✔</span> Gives extra weight to verified community reports</li>
            </ul>
            <Link to="/data-sources" className="inline-flex items-center gap-1 text-sm text-primary-light hover:text-accent transition-colors">
              View Evidence Log →
            </Link>
          </div>

          {/* SDG Impact */}
          <div>
            <h2 className="text-lg font-semibold mb-4">SDG Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ImpactCard icon={Heart} sdg="SDG 5" title="Gender Equality" description="Helping women move without fear at night." />
              <ImpactCard icon={Globe} sdg="SDG 11" title="Sustainable Cities" description="Making public transit's last mile safer." />
              <ImpactCard icon={Scale} sdg="SDG 16" title="Peace & Justice" description="Creating transparent, accountable safety data." />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
