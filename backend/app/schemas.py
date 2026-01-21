from pydantic import BaseModel
from typing import Optional

# リクエストの型定義
class ProfileCreate(BaseModel):
    name: str
    bio: Optional[str] = None
    image_url: Optional[str] = None

class ProfileResponse(ProfileCreate):
    id: int
    class Config:
        from_attributes = True