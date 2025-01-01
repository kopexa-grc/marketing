"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newsletterSubscriptionSchema,
  type NewsletterSubscriptionInput,
} from "@/lib/schemas/newsletter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function NewsletterFormClient() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewsletterSubscriptionInput>({
    resolver: zodResolver(newsletterSubscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: NewsletterSubscriptionInput) {
    try {
      setIsLoading(true);

      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      toast("Successfully subscribed!", {
        description: "Please check your email to confirm your subscription.",
      });

      form.reset();
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Enter your work email"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    </Form>
  );
}
