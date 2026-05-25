import { NextResponse } from "next/server";

import Groq from "groq-sdk/index.mjs";

export const runtime = "nodejs";

const groq = new Groq({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const completion =
      await groq.chat.completions.create({
        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",

            content: "Say hello",
          },
        ],
      });

    return NextResponse.json({
      success: true,

      response:
        completion.choices[0]
          ?.message?.content,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json({
      success: false,

      error:
        error?.message ||
        "Unknown error",
    });
  }
}