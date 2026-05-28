import { NextResponse } from "next/server";

const GOOGLE_SHEETS_URL =
  "https://script.google.com/macros/s/AKfycbz62JBujqKBzVmNeKJrMFLiAI15MIhZMpMAKY4iYOsjX84LIQ3ZNBp9HR_zHtyDLRPi/exec";

export async function GET() {
  try {
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
    });

    const text = await response.text();

    if (!text || text.trim() === "") {
      return NextResponse.json(
        {
          error: "Empty response from Google Sheets API",
          details: "No text was returned from the upstream service.",
        },
        { status: 502 }
      );
    }

    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("CAREERS API JSON PARSE ERROR:", parseError, text);
      return NextResponse.json(
        {
          error: "Invalid JSON response from Google Sheets API",
          details: String(parseError),
          rawText: text,
        },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("CAREERS API ERROR:", error);

    return NextResponse.json(
      {
        error: "Unexpected error fetching careers.",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
