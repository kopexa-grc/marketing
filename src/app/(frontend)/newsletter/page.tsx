import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter - Weekly Compliance & Risk Insights | Kopexa",
  description:
    "Subscribe to Kopexa's weekly newsletter for expert insights on compliance, risk management, and industry trends.",
};

export default async function NewsletterPage() {
  return (
    <div className="min-h-screen bg-background">
      <NewsletterHero />
      <NewsletterBenefits />
      <NewsletterForm />
      <NewsletterArchive />
    </div>
  );
}

function NewsletterHero() {
  return (
    <section className="py-16 bg-gradient-to-b from-primary/10 to-background">
      <div className="layout">
        <div className="col-span-full md:col-span-4 lg:col-span-8 lg:col-start-3 text-center">
          <Heading as="h1" className="mb-4">
            Stay Ahead in Compliance & Risk
          </Heading>
          <p className="text-lg text-muted-foreground">
            Join thousands of professionals receiving weekly insights on
            compliance, risk management, and industry best practices.
          </p>
        </div>
      </div>
    </section>
  );
}

import { Card } from "@/components/ui/card";
import { TrendingUp, FileText, BookOpen, Lock, Newspaper } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Weekly Market Analysis",
    description:
      "Stay updated on the latest compliance trends and regulatory changes",
  },
  {
    icon: FileText,
    title: "Expert Insights",
    description:
      "Deep dives into complex compliance topics from industry experts",
  },
  {
    icon: BookOpen,
    title: "Case Studies",
    description:
      "Real-world examples and best practices from leading organizations",
  },
  {
    icon: Lock,
    title: "Exclusive Content",
    description: "Access to subscriber-only resources and early announcements",
  },
] as const;

function NewsletterBenefits() {
  return (
    <section className="py-12">
      <div className="layout">
        {benefits.map((benefit, index) => (
          <Card
            key={benefit.title}
            className={`col-span-full md:col-span-2 lg:col-span-3 ${
              index === 1
                ? "lg:col-start-4"
                : index === 2
                ? "lg:col-start-7"
                : index === 3
                ? "lg:col-start-10"
                : ""
            }`}
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

import { Mail } from "lucide-react";
import { NewsletterFormClient } from "./newsletter-form-client";
import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";

function NewsletterForm() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="layout">
        <Card className="col-span-full lg:col-span-8 lg:col-start-3">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <Heading level={4} as="h2">
                  Subscribe to Our Newsletter
                </Heading>
                <Paragraph color="muted">
                  Get weekly updates delivered straight to your inbox
                </Paragraph>
              </div>
            </div>

            <NewsletterFormClient />

            <Paragraph level="small" color="muted" className="mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company. You can unsubscribe at any time.
            </Paragraph>
          </div>
        </Card>
      </div>
    </section>
  );
}

const recentNewsletters = [
  {
    date: "Dec 18, 2024",
    title: "2025 Compliance Trends: What to Expect",
    preview:
      "A comprehensive look at upcoming regulatory changes and how to prepare...",
  },
  {
    date: "Dec 11, 2024",
    title: "AI in Risk Management: Best Practices",
    preview:
      "Exploring how artificial intelligence is transforming risk assessment...",
  },
  {
    date: "Dec 04, 2024",
    title: "ESG Reporting: New Guidelines Explained",
    preview:
      "Breaking down the latest ESG reporting requirements and their impact...",
  },
] as const;

function NewsletterArchive() {
  return (
    <section className="py-12">
      <div className="layout">
        <div className="col-span-full lg:col-span-8 lg:col-start-3">
          <div className="flex items-center justify-between mb-8">
            <Heading level={3} as="h2">
              Recent Newsletters
            </Heading>
            <Button variant="outline">View All</Button>
          </div>

          <div className="space-y-6">
            {recentNewsletters.map((newsletter) => (
              <Card key={newsletter.title} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <Newspaper className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Paragraph level="small" color="muted" className="mb-1">
                      {newsletter.date}
                    </Paragraph>
                    <Heading as="h3" level={6} className="mb-2">
                      {newsletter.title}
                    </Heading>
                    <Paragraph level="small" color="muted">
                      {newsletter.preview}
                    </Paragraph>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
