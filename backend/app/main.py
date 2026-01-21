from fastapi import FastAPI
from .database import engine, Base
from .routers import profiles

# 起動時にDBテーブルを自動生成
Base.metadata.create_all(bind=engine)

app = FastAPI()

# プロフィールのルーターを登録
app.include_router(profiles.router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to my portfolio API👌💕🌈",
    }
