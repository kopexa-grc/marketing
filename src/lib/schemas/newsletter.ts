import { z } from "zod";

export const newsletterSubscriptionSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine(
      (email) => {
        // Basic business email validation
        const commonPersonalDomains = [
          "gmail.com",
          "yahoo.com",
          "hotmail.com",
          "outlook.com",
          "aol.com",
        ];
        const domain = email.split("@")[1].toLowerCase();
        return !commonPersonalDomains.includes(domain);
      },
      {
        message: "Please use your work email address",
      }
    ),
});

export type NewsletterSubscriptionInput = z.infer<
  typeof newsletterSubscriptionSchema
>;
