from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

# --- Profile関連 ---
class ProfileBase(BaseModel):
    full_name: str = Field(..., alias="fullName") 
    title: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    twitter_url: Optional[str] = None

    # Pydantic v2 設定方法
    model_config = ConfigDict(
        populate_by_name=True, # エイリアス(fullName)と変数名(full_name)両方を許可
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