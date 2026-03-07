import { Navigation, Brain, Gem, Users, ShieldCheck, Image } from "lucide-react";

const features = [
  {
    icon: Navigation,
    title: "AR Navigation",
    desc: "Follow glowing green arrows overlaid on the real world. Color-coded markers indicate safety levels (green = safe, yellow = caution, red = risk).",
  },
  {
    icon: Brain,
    title: "Goose AI Intelligence",
    desc: "Our backend uses Block's open-source Goose AI to analyze lighting data, community reports, and crime stats to find the safest route.",
  },
  {
    icon: Gem,
    title: "Blockchain Rewards",
    desc: "Complete a journey and mint a Soulbound NFT – a verifiable record of your safe passage. NFTs unlock premium AR features and governance rights.",
  },
  {
    icon: Users,
    title: "Community DAO",
    desc: "NFT holders vote on key parameters: minimum report stakes, safety score weights, and more. Your voice shapes the network.",
  },
  {
    icon: ShieldCheck,
    title: "Staked Reporting",
    desc: "Submit safety reports with a small MATIC stake. Other users vote; valid reports earn rewards. Spam is economically disincentivized.",
  },
  {
    icon: Image,
    title: "NFT Gallery",
    desc: "View your collected Safe Passage NFTs, each with unique metadata: date, safety score, route hash. Share your achievements via QR code.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How SafeStep AR Works
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Three core technologies working together to keep you safe.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-card p-8 rounded-lg border border-border hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(44,122,123,0.2)] hover:border-primary transition-all duration-300 cursor-pointer group"
          >
            <div className="w-14 h-14 gradient-hero rounded-2xl flex items-center justify-center mb-6">
              <f.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-muted-foreground mb-4">{f.desc}</p>
            <span className="text-accent font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
              Learn more →
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
