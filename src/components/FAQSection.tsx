import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("site_faqs").select("*").eq("active", true).order("sort_order").then(({ data }) => {
      if (data) setFaqs(data);
      setLoading(false);
    });
  }, []);

  if (loading || faqs.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-14">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Perguntas Frequentes</h2>
          <p className="font-body text-muted-foreground text-lg">Tudo o que você precisa saber antes de contratar nosso serviço.</p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} value={`item-${index}`} className="bg-white border border-border rounded-xl px-6 data-[state=open]:shadow-sm">
              <AccordionTrigger className="font-heading font-semibold text-foreground text-left hover:no-underline py-5">{faq.question}</AccordionTrigger>
              <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
