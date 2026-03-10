import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhereWeServe from "@/components/WhereWeServe";
import ServicesSection from "@/components/ServicesSection";
import PlansSection from "@/components/PlansSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WhereWeServe />
        <ServicesSection />
        <PlansSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Index;
