import os
import json
import uuid
import asyncio
from pathlib import Path
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv
from groq import Groq
from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pypdf import PdfReader

# Load environment variables
for env_candidate in [
    Path(__file__).parent / ".env",
    Path(__file__).parent.parent / ".env.local",
    Path(__file__).parent.parent / ".env",
]:
    if env_candidate.exists():
        load_dotenv(env_candidate)

def get_groq_client() -> Optional[Groq]:
    api_key = os.getenv("GROQ_API_KEY")
    if api_key:
        return Groq(api_key=api_key)
    return None

client = get_groq_client()


DEFAULT_MODEL = "openai/gpt-oss-120b"
AVAILABLE_MODELS = [
    {"id": "openai/gpt-oss-120b", "name": "GPT-OSS 120B (Groq)", "provider": "Groq", "description": "High accuracy reasoning model"},
    {"id": "qwen/qwen3.6-27b", "name": "Qwen 3.6 27B", "provider": "Groq", "description": "Fast & intelligent standard model"},
    {"id": "canopylabs/orpheus-v1-english", "name": "Orpheus English", "provider": "Groq", "description": "Conversational assistant"},
    {"id": "groq/compound", "name": "Groq Compound", "provider": "Groq", "description": "Compound reasoning model"}
]

app = FastAPI(title="Dynamic Resume AI Assistant API", version="4.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Resume Schema
class Experience(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    duration: Optional[str] = None
    description: Optional[str] = None
    skills_used: List[str] = []

class Resume(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    github: Optional[str] = None
    linkedin: Optional[str] = None
    leetcode: Optional[str] = None
    total_experience_years: Optional[float] = None
    summary: Optional[str] = None
    skills: List[str] = []
    experiences: List[Experience] = []
    education: List[str] = []
    projects: List[str] = []
    certifications: List[str] = []

resume_schema = Resume.model_json_schema()

class ChatRequest(BaseModel):
    question: str
    model: Optional[str] = DEFAULT_MODEL
    session_id: Optional[str] = None

class Message(BaseModel):
    id: str
    role: str
    content: str
    timestamp: str

class Session(BaseModel):
    id: str
    title: str
    createdAt: str
    model: str
    messages: List[Message] = []

CACHED_RESUME: Optional[Resume] = None
SESSIONS: Dict[str, Session] = {}

def read_pdf(file_path: Path) -> str:
    """Extract raw text dynamically from PDF file using PyMuPDF / PyPDF."""
    if not file_path.exists():
        return ""
    
    # Try PyMuPDF
    try:
        import pymupdf
        doc = pymupdf.open(file_path)
        text = ""
        for page in doc:
            page_text = page.get_text("text")
            if page_text:
                text += page_text + "\n"
        if text.strip():
            return text.strip()
    except Exception as e:
        print(f"PyMuPDF extraction note: {e}")

    # Fallback to PyPDF
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
        return text.strip()
    except Exception as e:
        print(f"PyPDF extraction note: {e}")
        return ""

def parse_resume(resume_text: str) -> Resume:
    """Parse raw PDF resume text dynamically using Groq LLM model into structured JSON schema."""
    active_client = client or get_groq_client()
    if not resume_text or not active_client:
        return Resume()
    
    system_prompt = f"""
You are an expert resume parser.
Extract information from the resume text based on its meaning.
Return ONLY valid JSON matching this schema:
{json.dumps(resume_schema, indent=2)}

Important rules:
1. Extract exact candidate details present in the text (name, contact, email, links, CGPA, skills, experiences, education, projects, achievements/certifications).
2. Do not hardcode or hallucinate details not in the text.
3. If a list or value has no information in the resume text, return null or an empty list.
"""
    try:
        response = active_client.chat.completions.create(
            model=DEFAULT_MODEL,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Parse the following resume:\n\n{resume_text}"}
            ],
            response_format={"type": "json_object"}
        )
        raw_output = response.choices[0].message.content
        data = json.loads(raw_output)
        return Resume(**data)
    except Exception as e:
        print(f"LLM Resume Parsing Error: {e}")
        return Resume()

def get_or_load_resume() -> Resume:
    """Dynamically read and parse PDF resume from latest resume.pdf."""
    global CACHED_RESUME
    if CACHED_RESUME is not None:
        return CACHED_RESUME

    pdf_path = Path(__file__).parent / "latest resume.pdf"
    resume_text = read_pdf(pdf_path)
    if resume_text:
        CACHED_RESUME = parse_resume(resume_text)
    else:
        CACHED_RESUME = Resume()
    
    return CACHED_RESUME

def build_system_prompt(resume: Resume, raw_pdf_text: str = "") -> str:
    return f"""
You are an intelligent, professional AI assistant representing the candidate based on their uploaded PDF resume.

CANDIDATE PARSED RESUME DETAILS:
{resume.model_dump_json(indent=2)}

RAW PDF TEXT:
{raw_pdf_text}

Rules:
1. Answer only using this candidate information from the PDF resume.
2. Never hallucinate details. If information is unavailable, say: "I don't have enough information in the resume to answer that."
3. Be professional and articulate, as if interviewing the candidate.
4. Format answers using Markdown (bullet points, bold text, code blocks when applicable).
"""

# API Endpoints
@app.get("/")
def get_home():
    resume = get_or_load_resume()
    return {
        "status": "online",
        "service": "portfolio-ai-backend",
        "mode": "dynamic_pdf_parsing",
        "candidate": resume.name,
        "email": resume.email,
        "models_available": len(AVAILABLE_MODELS)
    }

@app.get("/health")
def health():
    active_client = client or get_groq_client()
    return {
        "status": "ok",
        "service": "portfolio-ai-backend",
        "version": "4.0.0",
        "groq_configured": bool(active_client)
    }

@app.get("/api/models")
def get_models():
    return {"models": AVAILABLE_MODELS}

@app.get("/api/resume")
def get_resume():
    global CACHED_RESUME
    CACHED_RESUME = None # Force dynamic re-read & parse from PDF
    resume = get_or_load_resume()
    return resume.model_dump()

@app.post("/api/resume")
def update_resume(updated: Resume):
    global CACHED_RESUME
    CACHED_RESUME = updated
    return {"message": "Resume updated in memory", "resume": CACHED_RESUME.model_dump()}

@app.post("/api/chat")
async def chat(request: ChatRequest, stream: bool = False):
    active_client = client or get_groq_client()
    if not active_client:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured in .env")

    if stream:
        return await chat_stream(request)

    pdf_path = Path(__file__).parent / "latest resume.pdf"
    raw_pdf_text = read_pdf(pdf_path)
    resume = get_or_load_resume()
    system_prompt = build_system_prompt(resume, raw_pdf_text)

    try:
        selected_model = request.model or DEFAULT_MODEL
        response = active_client.chat.completions.create(
            model=selected_model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": request.question}
            ]
        )
        answer = response.choices[0].message.content
        return {"answer": answer, "model": selected_model}
    except Exception as e:
        print(f"Chat API Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/chat/stream")
async def chat_stream(request: ChatRequest):
    active_client = client or get_groq_client()
    if not active_client:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY is not configured in .env")

    pdf_path = Path(__file__).parent / "latest resume.pdf"
    raw_pdf_text = read_pdf(pdf_path)
    resume = get_or_load_resume()
    system_prompt = build_system_prompt(resume, raw_pdf_text)
    selected_model = request.model or DEFAULT_MODEL

    async def event_generator():
        try:
            stream = active_client.chat.completions.create(
                model=selected_model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": request.question}
                ],
                stream=True
            )
            for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    text_chunk = chunk.choices[0].delta.content
                    payload = json.dumps({"chunk": text_chunk})
                    yield f"data: {payload}\n\n"
                    await asyncio.sleep(0.01)
            yield "data: [DONE]\n\n"
        except Exception as err:
            err_payload = json.dumps({"error": str(err)})
            yield f"data: {err_payload}\n\n"
            yield "data: [DONE]\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

# Sessions API
@app.get("/api/sessions")
def get_sessions():
    return {"sessions": list(SESSIONS.values())}

@app.post("/api/sessions")
def create_session(title: str = "New Chat", model: str = DEFAULT_MODEL):
    session_id = str(uuid.uuid4())
    session = Session(
        id=session_id,
        title=title,
        createdAt="Just now",
        model=model,
        messages=[]
    )
    SESSIONS[session_id] = session
    return session.model_dump()

@app.delete("/api/sessions/{session_id}")
def delete_session(session_id: str):
    if session_id in SESSIONS:
        del SESSIONS[session_id]
        return {"message": "Session deleted"}
    raise HTTPException(status_code=404, detail="Session not found")

@app.delete("/api/sessions")
def clear_all_sessions():
    SESSIONS.clear()
    return {"message": "All sessions cleared"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)