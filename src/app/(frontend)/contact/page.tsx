import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactFormSection } from "./_components/contact-form-section";
import { Heading } from "@/components/ui/typography";

export const metadata: Metadata = {
  title: "Contact Us | Kopexa",
  description:
    "Get in touch with Kopexa. We're here to help with your compliance and risk management needs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <section className="py-16">
        <div className="layout">
          <div className="col-span-full md:col-span-4 lg:col-span-8 lg:col-start-3 text-center">
            <Heading as="h1">Get in Touch</Heading>
            <p className="text-lg text-muted-foreground">
              Have questions about Kopexa? We&apos;re here to help. Choose a
              topic below and we&apos;ll connect you with the right person.
            </p>
          </div>
        </div>
      </section>
      <ContactOptions />
      <ContactFormSection />
      <ContactFaq />
    </div>
  );
}

const contactOptions = [
  {
    icon: Phone,
    title: "Sales Inquiries",
    description: "Interested in Kopexa? Let's discuss your needs.",
    contact: "+1 (555) 123-4567",
  },
  {
    icon: Mail,
    title: "Support",
    description: "Need technical help? Our support team is ready.",
    contact: "support@kopexa.com",
  },
  {
    icon: Building,
    title: "Partnerships",
    description: "Explore partnership opportunities with us.",
    contact: "partners@kopexa.com",
  },
] as const;

function ContactOptions() {
  return (
    <section className="py-12">
      <div className="layout">
        {contactOptions.map((option, index) => (
          <Card
            key={option.title}
            className={`col-span-full md:col-span-2 lg:col-span-4 ${
              index === 1
                ? "lg:col-start-5"
                : index === 2
                ? "lg:col-start-9"
                : ""
            }`}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <option.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {option.description}
                  </p>
                  <Button variant="link" className="px-0">
                    {option.contact}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ContactFaq() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="layout">
        <div className="col-span-full md:col-span-4 lg:col-span-8 lg:col-start-3 text-center">
          <Heading as="h3" level={3} className="mb-4">
            Frequently Asked Questions
          </Heading>
          <p className="text-muted-foreground mb-8">
            Can&apos;t find what you&apos;re looking for? Check our help center
            for more information.
          </p>
          <Button variant="outline">Visit Help Center</Button>
        </div>
      </div>
    </section>
  );
}
