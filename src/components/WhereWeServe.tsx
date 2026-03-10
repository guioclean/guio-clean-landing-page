const locations = [
  {
    title: "Apartamentos",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-foreground">
        <rect x="10" y="14" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="16" y="20" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="26" y="20" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="16" y="30" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <rect x="26" y="30" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
        <line x1="24" y1="6" x2="24" y2="14" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    title: "Casas",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-foreground">
        <path d="M8 24L24 10L40 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="14" y="24" width="20" height="16" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
        <rect x="20" y="32" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
  {
    title: "Escritórios",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-foreground">
        <rect x="8" y="10" width="32" height="32" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="8" y1="18" x2="40" y2="18" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="26" x2="40" y2="26" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="34" x2="40" y2="34" stroke="currentColor" strokeWidth="1.5" />
        <line x1="24" y1="10" x2="24" y2="42" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Clínicas",
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-foreground">
        <rect x="12" y="14" width="24" height="28" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="24" y1="22" x2="24" y2="32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="19" y1="27" x2="29" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 14V10C18 8.89543 18.8954 8 20 8H28C29.1046 8 30 8.89543 30 10V14" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
];

const WhereWeServe = () => {
  return (
    <section id="onde-atendemos" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground text-center mb-4">
          Onde Atendemos
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto mb-16 rounded-full" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {locations.map((loc) => (
            <div key={loc.title} className="flex flex-col items-center gap-4 icon-pulse cursor-default">
              {loc.icon}
              <span className="font-heading font-bold text-lg text-foreground">{loc.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhereWeServe;
