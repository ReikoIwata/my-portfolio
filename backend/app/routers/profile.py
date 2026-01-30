from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_user

router = APIRouter(
    tags=["profile"]
)

# 公開API：プロフィール取得
@router.get("/", response_model=schemas.ProfileResponse)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(models.Profile).first()
    if not profile:
        # データがない場合は404を返す
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

# 管理者API：プロフィール作成・更新
@router.post("/", response_model=schemas.ProfileResponse)
def create_or_update_profile(
    profile_data: schemas.ProfileCreate, 
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    db_profile = db.query(models.Profile).first()
    
    # 送信されたデータから DBモデルに存在する項目だけを抽出
    update_data = profile_data.model_dump()
    
    # SNSリンクも保存できるようにリストを更新
    allowed_keys = ["fullName", "title", "bio", "image_url", "github_url", "twitter_url"]
    valid_data = {k: v for k, v in update_data.items() if k in allowed_keys}
    if db_profile:
        # 更新
        for key, value in valid_data.items():
            setattr(db_profile, key, value)
    else:
        # 新規作成
        db_profile = models.Profile(**valid_data)
        db.add(db_profile)
    
    db.commit()
    db.refresh(db_profile)
    return db_profile