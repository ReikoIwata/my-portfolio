from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from . import models
from . import schemas

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

# プロフィール作成・更新API
@app.post("/profile", response_model=schemas.ProfileResponse)
def create_or_update_profile(
    profile_data: schemas.ProfileCreate,
    db: Session = Depends(get_db)
):
    # 既存のプロフィールがあるか確認
    db_profile = db.query(models.Profile).first()
    if db_profile:
        # 既存のプロフィールがある場合は更新
        db_profile.name = profile_data.name
        db_profile.bio = profile_data.bio
        db_profile.image_url = profile_data.image_url
    else:
        # プロフィールがない場合は新規作成
        db_profile = models.Profile(
            name=profile_data.name,
            bio=profile_data.bio,
            image_url=profile_data.image_url
        )
        db.add(db_profile)
    
    db.commit()
    db.refresh(db_profile)
    return db_profile