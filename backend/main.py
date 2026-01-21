from fastapi import FastAPI
import os

app = FastAPI()

@app.get("/")
def read_root():
    # .env から渡された環境変数が取得できるかテスト
    db_url = os.getenv("DATABASE_URL")
    return {
        "message": "Hello World from FastAPI💕🌈",
        "database_status": "URL is set" if db_url else "URL is missing"
    }

@app.get("/health")
def health_check():
    return {"status": "ok💕✨"}