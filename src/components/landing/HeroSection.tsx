import PhoneMock from "./PhoneMock";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="container flex flex-col md:flex-row items-center justify-between gap-12 py-16 md:py-24 min-h-[80vh]"
    >
      <div className="flex-1 max-w-xl text-center md:text-left">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 gradient-text">
          Navigate Home Without Fear
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          SafeStep AR combines AI-powered route analysis, AR navigation, and
          blockchain-verified community reports to guide you safely through the
          last mile.
        </p>
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          <Link
            to="/app"
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-light transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30"
          >
            Get Started
          </Link>
          <a
            href="#demo"
            className="px-8 py-3 rounded-full border-2 border-primary text-foreground font-semibold hover:bg-primary transition-all"
          >
            Watch Demo
          </a>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <PhoneMock />
      </div>
    </section>
  );
};

export default HeroSection;
