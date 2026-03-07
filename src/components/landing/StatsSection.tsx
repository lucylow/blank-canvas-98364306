const stats = [
  {
    number: "54%",
    label: "of women in Tokyo experienced harassment on trains (Tokyo Metro Survey 2026)",
  },
  {
    number: "49%",
    label: "of women feel unsafe using navigation apps at night (Chennai Study 2026)",
  },
  {
    number: "50+",
    label: "weekly transit offences in the UK (British Transport Police)",
  },
];

const StatsSection = () => {
  return (
    <section id="problem" className="container">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          The Reality of the Last Mile
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Data shows the urgent need for a safer navigation solution.
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-around gap-8 bg-card rounded-lg p-8 md:p-12">
        {stats.map((s, i) => (
          <div key={i} className="text-center flex-1">
            <p className="text-5xl font-extrabold text-accent mb-2">
              {s.number}
            </p>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
