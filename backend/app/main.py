from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from . import models

# 起動時にDBテーブルを自動生成
Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def read_root():
    return {
        "message": "Database connected👌💕🌈",
    }

# プロフィールを取得するAPIのサンプル
@app.get("/profile")
def get_profile(db: Session = Depends(get_db)):
    # 最初の1件を取得（まだデータがない場合はNoneが返る）
    profile = db.query(models.Profile).first()
    if profile:
        return profile
    return {"message": "No profile data yet💀."}