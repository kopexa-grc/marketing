import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Calendar, CheckCircle } from "lucide-react";
import { Heading, Paragraph } from "../ui/typography";

export default function CTASection() {
  return (
    <section className="bg-background py-24">
      <div className="layout">
        <div className="col-span-full">
          <div className="relative">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-accent rounded-3xl" />

            {/* Content */}
            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
              {/* Left side - Text content */}
              <div className="flex-1 text-center lg:text-left space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">
                  Start Your Compliance Journey Today
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join leading companies in transforming their compliance and
                  risk management with AI-powered insights.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Schedule Demo
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Contact Sales
                  </Button>
                </div>
              </div>

              {/* Right side - Stats/Features */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">
                          Enterprise Security
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Bank-grade encryption and security measures
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row gap-4 items-center">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <Heading as="h3" level={5}>
                      Quick Setup
                    </Heading>
                  </CardHeader>
                  <CardContent>
                    <Paragraph level="small" color="muted">
                      Get started in minutes, not weeks
                    </Paragraph>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Compliance Ready</h3>
                        <p className="text-sm text-muted-foreground">
                          Pre-built templates for major standards
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">24/7 Support</h3>
                        <p className="text-sm text-muted-foreground">
                          Expert assistance whenever you need it
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
