# 1. ベースとなるPythonのイメージを指定
FROM python:3.11-slim

# 2. コンテナ内の作業ディレクトリを設定
WORKDIR /app

# 3. 依存関係ファイルをコピーしてインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. ソースコードをコピー
COPY . .

# 5. FastAPIを起動
CMD uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}