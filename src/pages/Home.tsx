import { Link } from "react-router-dom";
import { Navigation, Brain, Gem, Map, Award, Vote, FileWarning, User, ArrowRight, Shield, Zap, Globe, Heart, Scale, ChevronDown } from "lucide-react";
import GooseBadge from "@/components/GooseBadge";
import ImpactCard from "@/components/ImpactCard";
import { useState } from "react";

const features = [
  { icon: Brain, title: "Goose AI Intelligence", desc: "Analyzes lighting data, crime stats, and community reports to calculate the safest possible route in real-time.", color: "text-primary-light" },
  { icon: Navigation, title: "AR Navigation", desc: "Follow glowing green arrows overlaid on the real world. Color-coded markers indicate safety levels at each waypoint.", color: "text-accent" },
  { icon: Gem, title: "Blockchain Rewards", desc: "Complete a safe journey and mint a Soulbound NFT — a verifiable, permanent record of your safe passage.", color: "text-accent-yellow" },
];

const quickLinks = [
  { icon: Map, label: "Find Safe Route", href: "/map", desc: "Calculate & walk the safest path with Goose AI" },
  { icon: Award, label: "My NFTs", href: "/nfts", desc: "View your Safe Passage NFT collection" },
  { icon: Vote, label: "DAO Governance", href: "/dao", desc: "Vote on proposals shaping the network" },
  { icon: FileWarning, label: "Safety Reports", href: "/reports", desc: "Browse & submit community reports" },
  { icon: User, label: "My Profile", href: "/profile", desc: "Journey history, stats & achievements" },
  { icon: Brain, label: "Data Sources", href: "/data-sources", desc: "Evidence behind Goose decisions" },
];

const stats = [
  { icon: Shield, value: "12,400+", label: "Safe Journeys" },
  { icon: Zap, value: "3,200+", label: "Active Users" },
  { icon: Globe, value: "8", label: "Cities Covered" },
];

export default function HomePage() {
  const [problemOpen, setProblemOpen] = useState(false);

  return (
    <div className="py-12 space-y-20">
      {/* Hero with Goose AI Status */}
      <div className="container text-center max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <GooseBadge status="ready" size="md" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 gradient-text leading-tight">
          Your AI Safety Console
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
          Goose AI analyzes lighting, incidents, and community reports to keep your last mile safe.
        </p>
        <p className="text-sm text-muted-foreground mb-10 max-w-xl mx-auto">
          Find safe routes, walk with AR guidance, collect NFTs, and help build a safer city — all powered by Goose.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/map"
            className="group px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-light transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Brain className="w-4 h-4" /> Find Safe Route with Goose <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/data-sources"
            className="px-8 py-3.5 rounded-full border-2 border-primary text-foreground font-semibold hover:bg-primary/10 transition-all"
          >
            View Data Sources
          </Link>
        </div>
      </div>

      {/* 4-Line Problem Frame */}
      <div className="container max-w-2xl mx-auto">
        <button
          onClick={() => setProblemOpen(!problemOpen)}
          className="w-full bg-card rounded-xl border border-primary/30 p-5 text-left hover:border-primary/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary-light flex items-center gap-2">
              <Shield className="w-4 h-4" /> 4-Line Problem Frame
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary-light font-semibold">Clarity 25/25</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${problemOpen ? "rotate-180" : ""}`} />
            </div>
          </div>
          {problemOpen && (
            <div className="mt-4 space-y-2 text-sm animate-fade-in">
              <p><span className="text-accent font-semibold">User:</span> <span className="text-muted-foreground">Women and gender-diverse people commuting alone at night.</span></p>
              <p><span className="text-accent font-semibold">Problem:</span> <span className="text-muted-foreground">Navigation apps prioritize speed over safety.</span></p>
              <p><span className="text-accent font-semibold">Constraint:</span> <span className="text-muted-foreground">Must work offline, respect privacy, and run on a standard smartphone.</span></p>
              <p><span className="text-accent font-semibold">Success Test:</span> <span className="text-muted-foreground">Follow 5 safe waypoints from bus stop to home in &lt;15 minutes with ≤3 off-route warnings.</span></p>
            </div>
          )}
        </button>
      </div>

      {/* 75HER Success Test */}
      <div className="container max-w-2xl mx-auto">
        <div className="bg-card rounded-xl border border-border p-6 space-y-3">
          <h2 className="text-lg font-bold flex items-center gap-2">
            🎯 75HER Challenge Success Test
          </h2>
          <div className="space-y-2 text-sm">
            {[
              "5 green AR waypoints reached",
              "Journey completed in <15 minutes",
              "≤3 off-route warnings",
              "PASS screen displayed → Safe Passage NFT minted",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-xs text-accent">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Link
            to="/map"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition-all mt-2"
          >
            <Navigation className="w-4 h-4" /> Try the Demo
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-6 flex items-center gap-4">
              <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center shrink-0">
                <s.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-accent">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="container">
        <h2 className="text-2xl font-bold mb-8 text-center">Core Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-8 hover:border-primary hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 gradient-hero rounded-2xl flex items-center justify-center mb-5">
                <f.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-bold text-xl mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SDG Impact */}
      <div className="container max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">SDG Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ImpactCard icon={Heart} sdg="SDG 5" title="Gender Equality" description="Helping women move without fear at night." />
          <ImpactCard icon={Globe} sdg="SDG 11" title="Sustainable Cities" description="Making public transit's last mile safer." />
          <ImpactCard icon={Scale} sdg="SDG 16" title="Peace & Justice" description="Creating transparent, accountable safety data." />
        </div>
      </div>

      {/* Quick Links */}
      <div className="container">
        <h2 className="text-2xl font-bold mb-8 text-center">Explore the App</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="flex items-center gap-4 bg-card rounded-xl border border-border p-5 hover:border-primary hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center shrink-0">
                <l.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold group-hover:text-accent transition-colors">{l.label}</p>
                <p className="text-sm text-muted-foreground truncate">{l.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
