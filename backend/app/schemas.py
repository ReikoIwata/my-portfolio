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

    model_config = ConfigDict(
        from_attributes=True
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

class SkillUpdate(BaseModel):
    name: str | None = None
    level: int | None = None
    icon_url: Optional[str] = None
    

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

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tech_stack: Optional[str] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    site_url: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass