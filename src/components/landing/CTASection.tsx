const CTASection = () => {
  return (
    <section id="cta" className="container py-10">
      <div className="gradient-hero rounded-lg p-10 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
          Ready to Walk Safely?
        </h2>
        <p className="max-w-xl mx-auto mb-8 text-primary-foreground/90">
          Join the waitlist for early access. Be the first to experience
          AI-powered AR navigation and earn your Safe Passage NFTs.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#"
            className="px-8 py-3 rounded-full bg-foreground text-primary font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
          >
            Join Waitlist
          </a>
          <a
            href="#"
            className="px-8 py-3 rounded-full border-2 border-foreground text-foreground font-semibold hover:bg-foreground hover:text-primary transition-all"
          >
            Read Whitepaper
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
