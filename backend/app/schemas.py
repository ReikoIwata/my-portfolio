from pydantic import BaseModel
from typing import Optional

# profile関連のスキーマ
class ProfileCreate(BaseModel):
    name: str
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