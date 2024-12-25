import { NextResponse } from "next/server";
import { newsletterSubscriptionSchema } from "@/lib/schemas/newsletter";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = newsletterSubscriptionSchema.parse(body);

    console.log("validatedData", validatedData);

    // TODO: Send verification email

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter." },
      { status: 500 }
    );
  }
}
