from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# 環境変数からDATABASE_URLを取得
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if SQLALCHEMY_DATABASE_URL:
    # RenderのURLが 'postgres://' で始まっている場合、'postgresql://' に置換する
    if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("postgres://", "postgresql://", 1)
else:
    # ローカル開発用のデフォルト（例: SQLite）
    SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# データベースエンジンの作成
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# セッションローカルの作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ベースクラスの作成
Base = declarative_base()

# データベース接続を取得するための依存関係
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()