import { NextResponse } from "next/server";
import { getResumeData, updateResumeData } from "@/backend/services/resume.service";

export async function GET() {
  return NextResponse.json(getResumeData());
}

export async function POST(req: Request) {
  try {
    const updated = await req.json();
    const result = updateResumeData(updated);
    return NextResponse.json({ message: "Resume updated successfully", resume: result });
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
  }
}
