import StickyBanner from "@/components/StickyBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofBar from "@/components/SocialProofBar";
import WhereWeServe from "@/components/WhereWeServe";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import PlansSection from "@/components/PlansSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CouponsSection from "@/components/CouponsSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <StickyBanner />
      <div className="pt-10">
        <Navbar />
        <main>
          <HeroSection />
          <SocialProofBar />
          <ServicesSection />
          <WhyChooseUs />
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
