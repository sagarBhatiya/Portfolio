import { NextResponse } from "next/server";
import { AVAILABLE_MODELS } from "@/backend/services/groq.service";

export async function GET() {
  return NextResponse.json({ models: AVAILABLE_MODELS });
}
