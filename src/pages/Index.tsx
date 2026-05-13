import { lazy, Suspense } from "react";
import StickyBanner from "@/components/StickyBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import { Helmet } from "react-helmet-async";

// Below-the-fold: carregadas sob demanda para reduzir JS inicial
const WhereWeServe = lazy(() => import("@/components/WhereWeServe"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const SEOContentSection = lazy(() => import("@/components/SEOContentSection"));
const PlansSection = lazy(() => import("@/components/PlansSection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const CouponsSection = lazy(() => import("@/components/CouponsSection"));
const Footer = lazy(() => import("@/components/Footer"));
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

const Index = () => {
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Guio Clean",
          "description": "Agência de diaristas profissionais em São Paulo. Limpeza residencial, comercial, pós-obra e passadoria.",
          "url": "https://guioclean.com.br",
          "telephone": "+5511999999999",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "addressCountry": "BR"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "5000"
          },
          "priceRange": "$$"
        })}</script>
      </Helmet>
      <StickyBanner />
      <div className="pt-10">
        <Navbar />
        <main>
          <HeroSection />
          <SocialProofBar />
          <ServicesSection />
          <WhyChooseUs />
          <SEOContentSection />
          <WhereWeServe />
          <PlansSection />
          <TestimonialsSection />
          <FAQSection />
          <CouponsSection />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;
