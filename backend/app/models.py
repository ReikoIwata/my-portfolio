from sqlalchemy import Column, Integer, String, Text
from .database import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    bio = Column(Text, nullable=True)
    image_url = Column(String, nullable=True) # Firebase StorageのURLを保存

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), nullable=False)
    category = Column(String(50), nullable=False)  # Backend, Tool
    level = Column(Integer,default=1) # 1から5の範囲でスキルレベルを表す
    icon_url = Column(String, nullable=True) # Firebase StorageのURLを保存
