// components/contact/contact-form-section.tsx
import { Card } from "@/components/ui/card";
import { ContactForm } from "./contact-form";
import { MapPin } from "lucide-react";

export function ContactFormSection() {
  return (
    <section className="py-12">
      <div className="layout">
        {/* Form Side */}
        <div className="col-span-full lg:col-span-6">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
          <ContactForm />
        </div>

        {/* Contact Information Side */}
        <div className="col-span-full lg:col-span-5 lg:col-start-8 space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Our Offices</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Kiel (HQ)</h3>
                    <p className="text-sm text-muted-foreground">
                      Fleethörn 7
                      <br />
                      24103 Kiel
                      <br />
                      Germany
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">
              Additional Information
            </h3>
            <div className="prose prose-sm text-muted-foreground">
              <p>
                Our support team is available Monday through Friday, 9:00 AM to
                6:00 PM (CET). For urgent matters outside of business hours,
                please use our 24/7 emergency support line.
              </p>
              <p className="mt-4">
                For media inquiries, please contact our PR team at
                press@kopexa.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
