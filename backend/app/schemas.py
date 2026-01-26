from pydantic import BaseModel, HttpUrl
from typing import Optional
from datetime import datetime

# profile関連のスキーマ
class ProfileCreate(BaseModel):
    fullName: str
    title: str
    bio: Optional[str] = None
    image_url: Optional[str] = None

class ProfileResponse(ProfileCreate):
    id: int
    class Config:
        from_attributes = True


# skill関連のスキーマ
class SkillBase(BaseModel):
    name: str
    category: str  # Backend, Tool
    level: int  # 1から5の範囲でスキルレベルを表す
    icon_url: Optional[str] = None

# 作成用
class SkillCreate(SkillBase):
    pass

# 更新用
class SkillUpdate(SkillBase):
    pass

# レスポンス用
class SkillResponse(SkillBase):
    id: int
    class Config:
        from_attributes = True

# project関連のスキーマ
# 共通のフィールド
class ProjectBase(BaseModel):
    title: str
    description: str
    tech_stack: str  # ここを "Next.js, FastAPI" などの文字列で管理
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    site_url: Optional[str] = None

    class Config:
        from_attributes = True

# 登録時に使う（フロントから送られてくるデータ）
class ProjectCreate(ProjectBase):
    pass

# 更新時に使う（すべてのフィールドを任意にする）
class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[str] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    site_url: Optional[str] = None

# 取得時に使う（DBから読み出すデータ）
class Project(ProjectBase):
    id: int
    created_at: datetime
