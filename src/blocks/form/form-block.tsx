/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { FormBlock as FormBlockProps } from "@/payload-types";
import { useForm } from "react-hook-form";
import { buildInitialFormState } from "./lib/build-initial-form-state";
import { Form } from "@/components/ui/form";
import { RenderFields } from "./fields";
import { Button } from "@/components/ui/button";
import { useCallback, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormValidation } from "./lib/build-form-validation";
import { Heading } from "@/components/ui/typography";
import { RichText } from "@/components/cms/rich-text";
import { formBlock } from "./styles";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Callout } from "@/components/ui/callout";

export type Value = unknown;

export interface Property {
  [key: string]: Value;
}

export interface Data {
  [key: string]: Property | Property[];
}

interface ValidationError {
  name: string;
  data: {
    collection: string;
    errors: Array<{
      message: string;
      path: string;
    }>;
  };
  message: string;
}

export const FormBlock = ({
  heading,
  headingTag,
  description,
  contentLayout = "none",
  form: formFromProps,
}: FormBlockProps) => {
  const [isPending, startTransition] = useTransition();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const validation = createFormValidation(formFromProps);

  const form = useForm({
    defaultValues:
      typeof formFromProps === "number"
        ? {}
        : Array.isArray(formFromProps.fields)
          ? // @ts-expect-error .. what is this?
            buildInitialFormState(formFromProps.fields)
          : {},
    resolver: zodResolver(validation.schema),
  });

  const handleValidationErrors = useCallback(
    (errors: ValidationError["data"]["errors"]) => {
      for (const error of errors) {
        // Extract field name from the path (e.g., "submissionData.5.value" -> "5")
        const fieldMatch = error.path.match(/submissionData\.(\d+)\.value/);
        if (fieldMatch?.[1]) {
          const fieldIndex = fieldMatch[1];
          // Find the corresponding field name using the index
          if (typeof formFromProps !== "number" && formFromProps.fields) {
            const field = formFromProps.fields[Number.parseInt(fieldIndex)];
            if (field && "name" in field) {
              form.setError(field.name as string, {
                type: "server",
                message: error.message,
              });
            }
          }
        }
      }
      setError("Please check your input and try again.");
    },
    [form, formFromProps]
  );

  const handleSubmitSuccess = useCallback(() => {
    setHasSubmitted(true);
    setError(null);
    form.reset();

    if (typeof formFromProps === "number") return;

    if (
      formFromProps.confirmationType === "redirect" &&
      formFromProps.redirect?.url
    ) {
      router.push(formFromProps.redirect.url);
    } else {
      toast.success("Form submitted successfully");
    }
  }, [form, formFromProps, router]);

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onSubmit = (data: any) => {
    // Validate data before sending
    const result = validation.validate(data);

    if (!result.success) {
      // Handle validation errors
      for (const error of result.error.errors) {
        form.setError(error.path[0] as string, {
          type: "custom",
          message: error.message,
        });
      }
      return;
    }

    const dataToSend = Object.entries(data).map(([name, value]) => ({
      field: name,
      value,
    }));

    setError(null);

    startTransition(async () => {
      try {
        const req = await fetch("/api/form-submissions", {
          body: JSON.stringify({
            form:
              typeof formFromProps === "number"
                ? formFromProps
                : formFromProps.id,
            submissionData: dataToSend,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });

        const res = await req.json();

        if (!req.ok) {
          if (res.errors?.[0]?.name === "ValidationError") {
            handleValidationErrors(res.errors[0].data.errors);
          }

          switch (req.status) {
            case 429:
              setError("Too many attempts. Please try again later.");
              break;
            case 400:
              setError("Invalid form data. Please check your input.");
              break;
            case 404:
              setError("Form not found.");
              break;
            case 403:
              setError("You don't have permission to submit this form.");
              break;
            default:
              throw new Error("Failed to submit form");
          }
          return;
        }

        handleSubmitSuccess();
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error(
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        );
      }
    });
  };

  if (typeof formFromProps === "number") {
    return null;
  }

  const css = formBlock({
    contentLayout: contentLayout ?? "none",
  });

  return (
    <section className={css.section()}>
      <div className={css.container()}>
        <div className={css.contentWrapper()}>
          {(heading || description) && (
            <div className={css.header()}>
              {heading && (
                <Heading as={headingTag ?? "h2"} level={3}>
                  {heading}
                </Heading>
              )}
              {description && <RichText content={description} />}
            </div>
          )}
        </div>
        <div className={css.formWrapper()}>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {!isPending &&
            hasSubmitted &&
            formFromProps.confirmationType === "message" && (
              <Callout variant="success">
                {formFromProps.confirmationMessage ? (
                  <RichText content={formFromProps.confirmationMessage} />
                ) : (
                  <div className="prose prose-sm">
                    <p>Thank you for your submission!</p>
                  </div>
                )}
              </Callout>
            )}

          {!hasSubmitted && (
            <Form {...form}>
              <form
                id={`${formFromProps.id}`}
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-wrap -mx-4 space-y-4">
                  <RenderFields fields={formFromProps.fields} />
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending && <Loader2 className="size-4 animate-spin" />}
                  {formFromProps.submitButtonLabel || "Submit"}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </section>
  );
};
