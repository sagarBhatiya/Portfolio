FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

WORKDIR /app

# Install system dependencies needed for PyMuPDF/fitz and text processing
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source and assets
COPY . .

EXPOSE 8000

# Start FastAPI uvicorn server binding to dynamic PORT
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
