import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhereWeServe from "@/components/WhereWeServe";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServicesSection from "@/components/ServicesSection";
import PlansSection from "@/components/PlansSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhereWeServe />
        <WhyChooseUs />
        <ServicesSection />
        <PlansSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
