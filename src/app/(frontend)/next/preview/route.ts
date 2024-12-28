import { payloadToken } from "@/lib/data";
import { cookies, draftMode } from "next/headers";
import type { CollectionSlug } from "payload";
import { redirect } from "next/navigation";

export async function GET(
  req: {
    cookies: {
      get: (name: string) => {
        value: string;
      };
    };
  } & Request
): Promise<Response> {
  const cookieStore = await cookies();
  const token = cookieStore.get(payloadToken);

  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const collection = searchParams.get("collection") as CollectionSlug;
  const slug = searchParams.get("slug");

  const previewSecret = searchParams.get("previewSecret");

  if (previewSecret) {
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  if (!path) {
    return new Response("No path provided", { status: 404 });
  }

  if (!collection) {
    return new Response("No path provided", { status: 404 });
  }

  if (!slug) {
    return new Response("No path provided", { status: 404 });
  }

  if (!path.startsWith("/")) {
    return new Response(
      "This endpoint can only be used for internal previews",
      { status: 500 }
    );
  }

  const draft = await draftMode();

  // validate the Payload token
  const userReq = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token?.value}`,
      },
    }
  );

  const userRes = await userReq.json();

  if (!userReq.ok || !userRes?.user) {
    draft.disable();
    return new Response("You are not allowed to preview this page", {
      status: 403,
    });
  }

  draft.enable();

  redirect(path);
}
