import { getBlogByUID } from "@/data/get-author";
import { getLayoutData } from "@/data/layout";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("matched api call");

  const layout = await getLayoutData("en-us");
  const page = await getBlogByUID(
    "the-hidden-costs-of-manual-compliance",
    "en-us"
  );

  return NextResponse.json(
    { layout, page },
    {
      status: 200,
    }
  );
}
