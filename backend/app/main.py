from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import profile, skills, projects, ai

# 起動時にDBテーブルを自動生成
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS設定
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://my-portfolio-pi-pink-18.vercel.app",
    "https://my-portfolio-pi-pink-18.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 全てのドメインを許可（テスト用）
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
    expose_headers=["*"],
)

# ルーターを登録
app.include_router(skills.router)
app.include_router(profile.router)
app.include_router(projects.router)
app.include_router(ai.router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to my portfolio API👌💕🌈",
    }
