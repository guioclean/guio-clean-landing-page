import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type Testimonial = {
  id: string;
  author_name: string;
  author_role: string;
  text: string;
  rating: number;
  review_date: string;
  avatar_url: string;
  review_link: string;
};

// Avaliações de exemplo exibidas APENAS quando ainda não há avaliações reais cadastradas
// no painel administrativo. Assim que o admin cadastra a primeira, elas somem.
const fallbackTestimonials: Testimonial[] = [
  {
    id: "f1",
    author_name: "Carolina Mendes",
    author_role: "Arquiteta — Vila Mariana",
    avatar_url: "https://i.pravatar.cc/150?u=carolinamendes",
    rating: 5,
    text: "Exemplo: cadastre suas avaliações reais no painel administrativo para substituir esta demonstração.",
    review_date: "2025-02-12",
    review_link: "",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-label={`${rating} de 5 estrelas`}>
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
    ))}
  </div>
);

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
  </svg>
);

const TestimonialsSection = () => {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [googleUrl, setGoogleUrl] = useState("https://www.google.com/search?q=Guio+Clean+S%C3%A3o+Paulo");

  useEffect(() => {
    (async () => {
      const [{ data: list }, { data: setting }] = await Promise.all([
        supabase
          .from("site_testimonials")
          .select("*")
          .eq("active", true)
          .order("sort_order")
          .order("review_date", { ascending: false }),
        supabase.from("quote_settings").select("text_value").eq("key", "google_reviews_url").maybeSingle(),
      ]);
      if (list && list.length > 0) setTestimonials(list as Testimonial[]);
      if (setting?.text_value) setGoogleUrl(setting.text_value);
    })();
  }, []);

  // Schema.org Review markup para indexação rica no Google
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Guio Clean",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": testimonials.length.toString(),
      "bestRating": "5",
    },
    "review": testimonials.map((t) => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": t.author_name },
      "datePublished": t.review_date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": t.rating.toString(),
        "bestRating": "5",
      },
      "reviewBody": t.text,
    })),
  };

  return (
    <section id="depoimentos" className="py-24 bg-gradient-soft">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-primary font-heading font-bold tracking-wider text-sm uppercase mb-3 block">
            Depoimentos
          </span>
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-foreground mb-4">
            Avaliações reais no Google
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <StarRating rating={5} />
            <span className="font-heading font-bold text-foreground">4,9</span>
            <span className="font-body text-muted-foreground text-sm">
              · baseado em +5.000 clientes
            </span>
          </div>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja o que dizem nossos clientes que avaliaram a Guio Clean diretamente no Google.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="-ml-4 items-start">
            {testimonials.map((t) => (
              <CarouselItem
                key={t.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <article className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative">
                  <Quote className="w-8 h-8 text-primary/15 absolute top-5 right-5" />
                  <div className="flex items-center gap-2 mb-2">
                    <GoogleLogo />
                    <span className="font-body text-xs text-muted-foreground font-medium">
                      Avaliação no Google
                    </span>
                  </div>
                  <div className="mb-3">
                    <StarRating rating={t.rating} />
                  </div>
                  <p className="font-body text-foreground leading-relaxed mb-5">
                    "{t.text}"
                  </p>

                  <footer className="flex items-center gap-3 pt-4 border-t border-border">
                    {t.avatar_url ? (
                      <img
                        src={t.avatar_url}
                        alt={`Foto de ${t.author_name}, cliente da agência de diaristas Guio Clean`}
                        loading="lazy"
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-primary/10 ring-2 ring-primary/20 flex items-center justify-center font-heading font-bold text-primary">
                        {t.author_name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="font-heading font-bold text-sm text-foreground">
                        {t.author_name}
                      </h3>
                      <p className="font-body text-xs text-primary font-medium">
                        {t.author_role}
                      </p>
                    </div>
                  </footer>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-card border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-card border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground" />
        </Carousel>

        <div className="text-center mt-10">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-heading font-semibold hover:underline"
          >
            <GoogleLogo />
            Ver todas as avaliações no Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
