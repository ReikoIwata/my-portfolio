import os
import google.generativeai as genai
from dotenv import load_dotenv
from typing import List

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

if api_key:
    genai.configure(api_key=api_key)
    # モデル名は最新のものを指定
    model = genai.GenerativeModel('models/gemini-2.5-flash')
    print("✅ SUCCESS: Gemini APIキーを読み込みました")
else:
    model = None
    print("⚠️ WARNING: GOOGLE_API_KEY が見つかりません")

def generate_project_description(title: str, tech_stack: str) -> str:
    if not model: return "APIキーを設定してください"
    
    prompt = f"""
    あなたは優秀なITキャリアアドバイザーです。
    以下のプロジェクトについて、紹介文を150文字程度で作成してください。

    【条件】
    ・「{title}」という名前から想像されるポジティブなイメージを盛り込む
    ・「{tech_stack}」を選択した理由も根拠を添えて簡単に説明する
    ・ただの説明ではなく、ユーザーにどんな価値を届けるかを明るく表現する
    ・「〜です/ます」調で、前向きだけど冷静なトーンで文章にする

    プロジェクト名：{title}
    使用技術：{tech_stack}
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"生成失敗: {str(e)}"

# 関数名を routers/ai.py の呼び出し側に合わせました
def extract_skills_from_text(tech_stack: str, description: str = "") -> str:
    """
    技術スタックと説明文から、スキル名のみをカンマ区切りの文字列で返す
    """
    if not model: return ""

    prompt = f"""
    以下の「技術スタック」と「プロジェクト説明文」から、スキルとして登録すべき技術要素（言語、フレームワーク、ライブラリ、AWSサービス名など）を重複なく抽出してください。

    【ルール】
    ・出力はスキル名のみをカンマ区切りで一行で出力すること（例: Python, FastAPI, Docker）
    ・余計な解説や挨拶は一切含めないこと

    技術スタック: {tech_stack}
    説明文: {description}
    """

    try:
        response = model.generate_content(prompt)
        # routers/ai.py 側で split(",") しているので、ここでは文字列のまま返します
        return response.text
    except Exception as e:
        print(f"スキル抽出失敗: {str(e)}")
        return ""

def generate_bio_from_data(skills: List[str], projects: List[dict]) -> str:
    if not model: return ""

    # プロジェクト情報をテキストにまとめる
    project_info = "\n".join([f"- {p['title']}: {p['tech_stack']}" for p in projects])
    # スキルをカンマ区切りにする
    skill_info = ", ".join(skills)

    prompt = f"""
    あなたはプロの技術ライターです。以下のエンジニアの「所有スキル」と「制作実績」を基に、
    ポートフォリオ用の魅力的な自己紹介文（bio）を100文字〜150文字程度で作成してください。

    【所有スキル】
    {skill_info}

    【制作実績】
    {project_info}

    【ルール】
    ・未経験エンジニアであり、専門学校を卒業したばかりの設定で書く
    ・「どんな技術を使い、何を作れるエンジニアか」を一目でわかるようにする
    ・実績に基づいた具体的な強みを強調する
    ・親しみやすくもプロフェッショナルなトーン（〜です/ます調）
    ・箇条書きは使わず、自然な文章にすること
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Bio生成失敗: {str(e)}")
        return "自己紹介文の生成に失敗しました。"