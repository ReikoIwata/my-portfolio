from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from .. import models, schemas
from ..auth import get_current_user

router = APIRouter(
    tags=["skills"]
)

# 公開API：スキル一覧取得（誰でも見れる）
@router.get("/", response_model=List[schemas.SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    "スキル一覧を取得"
    return db.query(models.Skill).all()

# 管理者API：スキル作成(認証必要)
@router.post("/", response_model=schemas.SkillResponse, status_code=status.HTTP_201_CREATED)
def create_skill(
    skill: schemas.SkillCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user) # 認証済みユーザーのみアクセス可能
):
    "新しいスキルを作成（管理者のみ）"
    db_skill = models.Skill(**skill.model_dump())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.put("/{skill_id}", response_model=schemas.SkillResponse)
def update_skill(
    skill_id: int,
    skill_update: schemas.SkillUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user) # 認証済みユーザーのみアクセス可能
):
    "スキルを更新（管理者のみ）"
    db_skill = db.query(models.Skill).filter(models.Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="スキルが見つかりません💡")
    # 既存のレコードを上書きする
    for key, value in skill_update.model_dump().items():
        setattr(db_skill, key, value)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.delete("/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_skill(
    skill_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user) # 認証済みユーザーのみアクセス可能
):
    "スキルを削除（管理者のみ）"
    db_skill = db.query(models.Skill).filter(models.Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="スキルが見つかりません💡")
    db.delete(db_skill)
    db.commit()
    return None