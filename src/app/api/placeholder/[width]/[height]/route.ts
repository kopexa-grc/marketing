import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

interface Context {
  params: Promise<{
    width: string;
    height: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params: promiseParams }: Context
): Promise<ImageResponse> {
  try {
    const params = await promiseParams;
    const width = Number.parseInt(params.width);
    const height = Number.parseInt(params.height);

    // Validate dimensions
    if (
      Number.isNaN(width) ||
      Number.isNaN(height) ||
      width <= 0 ||
      height <= 0
    ) {
      throw new Error("Invalid dimensions");
    }

    // Cap maximum dimensions for security
    const safeWidth = Math.min(width, 1200);
    const safeHeight = Math.min(height, 1200);

    // Font size calculation (responsive to image size)
    const fontSize = Math.max(12, Math.min(safeWidth, safeHeight) * 0.15);

    return new ImageResponse(
      {
        type: "div",
        key: null,
        props: {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#f3f4f6",
            color: "#9ca3af",
            fontSize: `${fontSize}px`,
            fontFamily: "sans-serif",
          },
          children: `${safeWidth} × ${safeHeight}`,
        },
      },
      {
        width: safeWidth,
        height: safeHeight,
      }
    );
  } catch (error) {
    console.error("Error generating placeholder:", error);
    throw error;
  }
}
