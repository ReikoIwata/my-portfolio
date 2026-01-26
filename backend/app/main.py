from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routers import profiles, skills, projects

# 起動時にDBテーブルを自動生成
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS設定
origins = [
    "http://localhost:3000", # Next.jsのURLを許可する
    "https://my-portfolio-pi-pink-18.vercel.app/", # VercelのURLを将来的にここで許可
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターを登録
app.include_router(skills.router)
app.include_router(profiles.router)
app.include_router(projects.router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to my portfolio API👌💕🌈",
    }
