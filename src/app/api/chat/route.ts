import { NextRequest, NextResponse } from "next/server";
import { createChatStream } from "@/backend/services/groq.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, model } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question string is required" }, { status: 400 });
    }

    const stream = await createChatStream(question, model);
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const textChunk = chunk.choices[0]?.delta?.content || "";
            if (textChunk) {
              const payload = JSON.stringify({ chunk: textChunk });
              controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err: any) {
          const errPayload = JSON.stringify({ error: err?.message || "Stream error" });
          controller.enqueue(encoder.encode(`data: ${errPayload}\n\n`));
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
