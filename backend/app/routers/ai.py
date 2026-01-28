from fastapi import APIRouter, Depends, HTTPException
from ..services import ai_service
from .. import schemas

router = APIRouter(
    prefix="/ai",
    tags=["ai"]
)

# 技術スタックからスキル名を抽出
@router.post("/extract-skills", response_model=schemas.AISkillsOutput)
def extract_skills(data: schemas.AITechStackInput):
    try:
        skills_text = ai_service.extract_skills_from_text(data.tech_stack)
        skills_list = [s.strip() for s in skills_text.split(",") if s.strip()]
        return {"skills": skills_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 自己紹介文生成
@router.post("/generate-bio", response_model=schemas.AIBioResponse) # response_modelも指定
def generate_bio(data: schemas.AIBioRequest):
    try:
        suggestion = ai_service.generate_project_description(data.title, data.tech_stack)
        return {"suggestion": suggestion}
    except Exception as e:
        print(f"AI Bio Generation Error: {e}")
        raise HTTPException(status_code=500, detail="自己紹介の生成に失敗しました")

# プロジェクト説明文の自動生成
@router.post("/suggest-description", response_model=schemas.AIResponse)
def suggest_description(data: schemas.AITechStackInput):
    try:
        suggestion = ai_service.generate_project_description("", data.tech_stack)
        return {"suggestion": suggestion}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))