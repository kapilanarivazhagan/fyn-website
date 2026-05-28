import { NextResponse } from "next/server";

const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbz62JBujqKBzVmNeKJrMFLiAI15MIhZMpMAKY4iYOsjX84LIQ3ZNBp9HR_zHtyDLRPi/exec";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    const contentType = response.headers.get("content-type") ?? "";

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Application forwarding failed.",
          status: response.status,
          details: text,
        },
        { status: 502 }
      );
    }

    if (!contentType.includes("application/json") && text.trim().startsWith("<")) {
      return NextResponse.json(
        {
          error: "Upstream Apps Script returned a non-JSON response.",
          details: text,
        },
        { status: 502 }
      );
    }

    let data: unknown;

    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      if (text.trim().startsWith("<")) {
        return NextResponse.json(
          {
            error: "Upstream Apps Script returned invalid JSON.",
            details: text,
          },
          { status: 502 }
        );
      }
      data = { message: text };
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Apply API error:", error);
    return NextResponse.json(
      {
        error: "Unexpected error forwarding application.",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
