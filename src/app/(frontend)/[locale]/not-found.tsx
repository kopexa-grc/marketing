"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileSearch } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function NotFoundPage() {
  return (
    <main className="container grid min-h-screen place-content-center w-full mx-auto relative isolate">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-6 relative motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in motion-safe:duration-1000 motion-safe:delay-300">
              {/* Pulsing background effect */}
              <div className="absolute inset-0 rounded-full bg-primary/5 motion-safe:animate-ping" />
              <FileSearch className="h-12 w-12 text-primary relative" />
            </div>
          </div>

          <div className="space-y-2 motion-safe:animate-in motion-safe:slide-in-from-top motion-safe:fade-in motion-safe:duration-700">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              404
            </h1>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Page Not Found
            </h2>
          </div>

          <p className="text-base text-muted-foreground sm:text-lg motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-1000 motion-safe:delay-200">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The
            page might have been moved, deleted, or never existed.
          </p>
        </div>

        <div className="space-y-4 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-1000 motion-safe:delay-500">
          <Button
            asChild
            variant="default"
            className="w-full group transition-all duration-300 motion-safe:hover:scale-105"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform motion-safe:group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              Need help?{" "}
              <Link
                href="/support"
                className="underline underline-offset-4 hover:text-primary transition-colors"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute h-full w-full bg-grid-black/[0.02] dark:bg-grid-white/[0.02] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000" />

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent motion-safe:animate-gradient-x" />

        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#e5e7eb,transparent)] dark:bg-[radial-gradient(circle_500px_at_50%_200px,rgba(255,255,255,0.06),transparent)] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000 motion-safe:delay-300" />
      </div>

      {/* Decorative blurred circles */}
      <div className="absolute left-[10%] top-1/4 h-48 w-48 rounded-full bg-primary/10 blur-3xl motion-safe:animate-pulse" />
      <div className="absolute right-[10%] bottom-1/4 h-48 w-48 rounded-full bg-primary/10 blur-3xl motion-safe:animate-pulse motion-safe:delay-500" />
    </main>
  );
}
