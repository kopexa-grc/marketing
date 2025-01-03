import { RichText } from "@/components/cms/rich-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heading } from "@/components/ui/typography";
import type { FAQBlock as FAQBlockProps } from "@/payload-types";

export const FAQBlock = ({ headline, faqs }: FAQBlockProps) => {
  return (
    <section className="pt-xhuge">
      <div className="layout">
        <div className="col-span-4 lg:col-span-8">
          <Heading as="h2" level={2}>
            {headline}
          </Heading>
        </div>
        {Array.isArray(faqs) && (
          <div className="col-span-full">
            <Accordion collapsible>
              {faqs.map((faq) => (
                <AccordionItem key={`${faq.id}`} value={`${faq.id}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <RichText content={faq.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </section>
  );
};
