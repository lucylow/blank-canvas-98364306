const team = [
  { emoji: "👩‍💻", name: "Alex Rivera", role: "Founder & Lead Developer" },
  { emoji: "👩‍🔬", name: "Dr. Sam Chen", role: "Safety Researcher" },
  { emoji: "👨‍🚀", name: "Jordan Taylor", role: "Blockchain Architect" },
  { emoji: "👩‍🎨", name: "Priya Kumar", role: "UI/UX Designer" },
];

const TeamSection = () => {
  return (
    <section id="team" className="container py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We're builders, researchers, and advocates for safer cities.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {team.map((t, i) => (
          <div key={i} className="text-center">
            <div className="w-32 h-32 md:w-36 md:h-36 gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
              {t.emoji}
            </div>
            <p className="font-semibold text-lg">{t.name}</p>
            <p className="text-muted-foreground text-sm">{t.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
