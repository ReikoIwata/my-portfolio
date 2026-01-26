from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
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

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)        # プロジェクト名
    description = Column(String, nullable=False)  # 説明文
    tech_stack = Column(String, nullable=False)   # 使用技術（例: "Next.js, FastAPI, MySQL"）
    image_url = Column(String, nullable=True)     # Cloudinary等の画像URL
    github_url = Column(String, nullable=True)    # ソースコードURL
    site_url = Column(String, nullable=True)      # 公開サイトURL
    created_at = Column(DateTime(timezone=True), server_default=func.now())