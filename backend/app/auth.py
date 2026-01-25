import os
import json
import firebase_admin
from firebase_admin import credentials, auth
from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

service_account_env = os.getenv("FIREBASE_SERVICE_ACCOUNT")

if service_account_env:
    # Render等の本番環境：環境変数の文字列(JSON)をパースする
    cert_info = json.loads(service_account_env)
    cred = credentials.Certificate(cert_info)
else:
    # ローカル環境：JSONファイルから読み込む
    cred = credentials.Certificate("my-portfolio-e3730-0c5402706721.json")

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Bearerトークンを取得するための設定
security = HTTPBearer()

def get_current_user(res: HTTPAuthorizationCredentials = Depends(security)):
    """
    リクエストヘッダーの Authorization: Bearer <TOKEN> を検証する
    """
    token = res.credentials
    try:
        # Firebaseでトークンを検証
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )