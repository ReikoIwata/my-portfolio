from sqlalchemy import Column, Integer, String, Text
from .database import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    bio = Column(Text, nullable=True)
    image_url = Column(String, nullable=True) # Firebase StorageのURLを保存