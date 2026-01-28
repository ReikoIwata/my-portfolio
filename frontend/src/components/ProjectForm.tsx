"use client";

import { useForm } from "react-hook-form";
import { Project, Skill } from "@/types";
import { apiRequest } from "@/lib/api-client";
import { Button, Input } from "@/components/ui";
import SkillForm from "./SkillForm"; // さっき作成したコンポーネント
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Sparkles, Loader2, PlusCircle, X } from "lucide-react";

interface ProjectFormProps {
  editingProject: Project | null;
  onSuccess: () => void;
}

type ProjectInput = Omit<Project, "id" | "created_at">;

export default function ProjectForm({
  editingProject,
  onSuccess,
}: ProjectFormProps) {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<ProjectInput>();

  // States
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [selectedSkillForModal, setSelectedSkillForModal] =
    useState<string>("");
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);

  // Watchers
  const currentImageUrl = watch("image_url");
  const title = watch("title");
  const techStack = watch("tech_stack");

  // AI説明文生成
  const handleAiGenerate = async () => {
    if (!title || !techStack) {
      toast.error("タイトルと技術スタックを先に入力してください。");
      return;
    }
    setIsGenerating(true);
    try {
      const res = await apiRequest("/ai/suggest-description", {
        method: "POST",
        body: JSON.stringify({ title, tech_stack: techStack }),
      });
      if (res.suggestion) {
        setValue("description", res.suggestion);
        toast.success("AIが説明文を作成しました！✍️");
      }
    } catch (error) {
      toast.error("AI生成に失敗しました。");
    } finally {
      setIsGenerating(false);
    }
  };

  // AIスキル抽出
  const handleExtractSkills = async () => {
    if (!techStack) {
      toast.error("技術スタックを入力してください。");
      return;
    }
    setIsExtracting(true);
    try {
      const res = await apiRequest<{ skills: string[] }>("/ai/extract-skills", {
        method: "POST",
        body: JSON.stringify({ tech_stack: techStack }),
      });
      setSuggestedSkills(res.skills || []);
      toast.success("スキルを抽出しました！🪄");
    } catch (error) {
      toast.error("スキルの抽出に失敗しました。");
    } finally {
      setIsExtracting(false);
    }
  };

  useEffect(() => {
    if (editingProject) {
      reset(editingProject);
    } else {
      reset({
        title: "",
        description: "",
        tech_stack: "",
        image_url: "",
        github_url: "",
        site_url: "",
      });
    }
  }, [editingProject, reset]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
    );
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      if (data.secure_url) {
        setValue("image_url", data.secure_url);
        toast.success("画像をアップロードしました！");
      }
    } catch (error) {
      toast.error("アップロード失敗");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProjectInput) => {
    try {
      const url = editingProject
        ? `/projects/${editingProject.id}`
        : "/projects";
      const method = editingProject ? "PUT" : "POST";
      await apiRequest(url, { method, body: JSON.stringify(data) });
      toast.success(editingProject ? "更新完了！" : "登録完了！");
      onSuccess();
    } catch (error) {
      toast.error("保存に失敗しました。");
    }
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-4 text-sm max-w-2xl mx-auto bg-white rounded-lg shadow-sm"
      >
        {/* タイトル入力 */}
        <Input
          label="タイトル"
          {...register("title", { required: true })}
          placeholder="アプリ名を入力"
        />

        {/* 技術スタック & スキル抽出 */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <Input
                label="技術スタック"
                {...register("tech_stack", { required: true })}
                placeholder="React, FastAPI, Docker..."
              />
            </div>
            <button
              type="button"
              onClick={handleExtractSkills}
              disabled={isExtracting}
              className="ml-2 mb-1 p-2 text-[#a5a58d] hover:text-[#cb997e] transition-colors"
              title="技術名のみを抽出してスキル登録"
            >
              {isExtracting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <PlusCircle className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* AI抽出結果のチップ表示 */}
          {suggestedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 p-3 bg-[#fdfbf9] rounded-md border border-[#ede7de]">
              <p className="text-[10px] text-[#a5a58d] w-full uppercase tracking-wider font-bold">
                未登録のスキル候補:
              </p>
              {suggestedSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    setSelectedSkillForModal(skill);
                    setIsSkillModalOpen(true);
                  }}
                  className="px-2 py-1 bg-white border border-[#e9e4db] hover:border-[#cb997e] text-[#6b705c] rounded text-[10px] transition-all"
                >
                  + {skill}
                </button>
              ))}
              <button
                onClick={() => setSuggestedSkills([])}
                className="text-[10px] text-rose-300 ml-auto"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* 説明 & AI生成 */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium text-gray-700">説明</label>
            <button
              type="button"
              onClick={handleAiGenerate}
              disabled={isGenerating}
              className="flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 disabled:text-gray-400"
            >
              {isGenerating ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Sparkles className="w-3 h-3" />
              )}
              AIで下書きを生成
            </button>
          </div>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 min-h-30 text-sm leading-relaxed"
            placeholder="AIボタンで自動生成できます"
          />
        </div>

        {/* 画像アップロード */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            プロジェクト画像
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
          />
          {currentImageUrl && (
            <div className="relative aspect-video mt-2">
              <img
                src={currentImageUrl}
                alt="Preview"
                className="w-full h-full object-cover rounded border"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="GitHub URL" {...register("github_url")} />
          <Input label="公開サイト URL" {...register("site_url")} />
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button
            type="submit"
            disabled={isUploading || isGenerating}
            className="px-10"
          >
            {editingProject ? "変更を保存" : "プロジェクトを登録"}
          </Button>
        </div>
      </form>

      {/* スキル登録用モーダル */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsSkillModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-[#3f4238] mb-4">
              スキルをリストに追加
            </h2>
            <SkillForm
              editingSkill={null}
              initialName={selectedSkillForModal}
              onSuccess={() => {
                setIsSkillModalOpen(false);
                setSuggestedSkills((prev) =>
                  prev.filter((s) => s !== selectedSkillForModal),
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
