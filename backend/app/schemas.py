from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

# --- Profile関連 ---
class ProfileBase(BaseModel):
    fullName: str 
    title: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None

    # Pydantic v2 設定方法
    model_config = ConfigDict(
        from_attributes=True   # SQLAlchemyモデルからの変換を許可
    )

class ProfileCreate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    id: int

# --- Skill関連 ---
class SkillBase(BaseModel):
    name: str
    category: str
    level: int
    icon_url: Optional[str] = None
    
    model_config = ConfigDict(from_attributes=True)

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: int

# --- Project関連 ---
class ProjectBase(BaseModel):
    title: str
    description: str
    tech_stack: str
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    site_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime