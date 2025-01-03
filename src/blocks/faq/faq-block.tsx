import { RichText } from "@/components/cms/rich-text";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Heading } from "@/components/ui/typography";
import type { FAQBlock as FAQBlockProps } from "@/payload-types";
import { useId } from "react";

export const FAQBlock = ({ headline, faqs }: FAQBlockProps) => {
  const headingId = useId();
  const regionId = useId();

  return (
    <section
      aria-labelledby={headingId}
      aria-describedby={regionId}
      className="pt-xhuge"
    >
      <div className="layout">
        <div className="col-span-4 lg:col-span-8">
          <Heading as="h2" level={2} id={headingId}>
            {headline}
          </Heading>
          {/* Hidden description for screen readers */}
          <p className="sr-only" id={regionId}>
            A list of frequently asked questions and their answers. Each
            question can be expanded to reveal its answer.
          </p>
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

            {/* Skip link for keyboard users */}
            <div className="sr-only focus-visible:not-sr-only">
              <a
                href="#skip-faq"
                className="block py-2 text-sm text-primary underline focus:outline-none"
              >
                Skip FAQ section
              </a>
            </div>
            <div id="skip-faq" tabIndex={-1} />
          </div>
        )}
      </div>
    </section>
  );
};
