const steps = [
  {
    num: 1,
    title: "Enter Destination",
    desc: "Tell us where you're going. Our AI analyzes safety data in real time.",
  },
  {
    num: 2,
    title: "Follow AR Path",
    desc: "Hold up your phone – green arrows guide you. Haptic feedback confirms waypoints.",
  },
  {
    num: 3,
    title: "Arrive & Mint NFT",
    desc: "Reach your destination safely and mint a Soulbound NFT as proof.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Your Journey with SafeStep AR
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From entering your destination to minting your NFT.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {steps.map((s) => (
          <div
            key={s.num}
            className="flex-1 text-center p-8 bg-card rounded-lg"
          >
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-6 border-[3px] border-accent text-primary-foreground">
              {s.num}
            </div>
            <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
            <p className="text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
