import StickyBanner from "@/components/StickyBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import WhereWeServe from "@/components/WhereWeServe";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import SEOContentSection from "@/components/SEOContentSection";
import PlansSection from "@/components/PlansSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CouponsSection from "@/components/CouponsSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Helmet } from "react-helmet-async";

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
