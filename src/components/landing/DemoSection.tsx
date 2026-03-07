import { Play } from "lucide-react";

const DemoSection = () => {
  return (
    <section id="demo" className="container py-10">
      <div className="bg-card rounded-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">See It in Action</h2>
          <p className="text-muted-foreground">
            Watch a 3-minute demo of SafeStep AR.
          </p>
        </div>
        <div className="w-full h-[300px] md:h-[400px] bg-secondary rounded-md border-2 border-dashed border-primary flex items-center justify-center cursor-pointer hover:bg-secondary/80 transition-colors group">
          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-accent transition-colors">
            <Play className="w-8 h-8" />
            <span className="text-lg">Click to play demo</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
