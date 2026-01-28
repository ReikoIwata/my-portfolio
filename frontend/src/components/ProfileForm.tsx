"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/lib/schema";
import { apiRequest } from "@/lib/api-client";
import { Input, Button } from "@/components/ui";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Skill, Project, AIBioInput } from "@/types";

export default function ProfileForm() {
  const [isUploading, setIsUploading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  // 画像URLを監視
  const currentImageUrl = watch("image_url");

  // AI自己紹介生成
  const handleGenerateBio = async () => {
    setIsGenerating(true);
    const loadingToast = toast.loading("実績を分析して自己紹介を執筆中...");

    try {
      // スキルとプロジェクトをDBから取得
      const [skills, projects] = await Promise.all([
        apiRequest<Skill[]>("/skills"),
        apiRequest<Project[]>("/projects"),
      ]);

      // AIBioInput 型に準拠したペイロードを作成
      const payload: AIBioInput = {
        skills: skills.map((s) => s.name),
        projects: projects.map((p) => ({
          title: p.title,
          tech_stack: p.tech_stack,
        })),
      };

      const res = await apiRequest<{ bio: string }>("/ai/generate-bio", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (res.bio) {
        setValue("bio", res.bio);
        toast.success("自己紹介文を生成しました！✨", { id: loadingToast });
      }
    } catch (error) {
      toast.error(
        "生成に失敗しました。実績が登録されているか確認してください。",
        { id: loadingToast },
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // 初期値の取得
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest("/profile");
        const profile = Array.isArray(data) ? data[0] : data;
        if (profile) {
          reset(profile);
        }
      } catch (error) {
        console.error("プロフィールの取得に失敗:", error);
      }
    };
    fetchProfile();
  }, [reset]);

  // Cloudinaryへのアップロード処理
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
        toast.success("写真をアップロードしました！📸");
      }
    } catch (error) {
      toast.error("写真のアップロードに失敗しました。");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await apiRequest("/profile", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("プロフィールを更新しました！✨");
    } catch (error) {
      toast.error("更新に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="氏名"
            {...register("fullName")}
            error={errors.fullName?.message}
          />
          <Input
            label="肩書き"
            {...register("title")}
            error={errors.title?.message}
          />

          {/* 自己紹介ラベル + AIボタン */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-bold text-[#3f4238]">
                自己紹介
              </label>
              <button
                type="button"
                onClick={handleGenerateBio}
                disabled={isGenerating}
                className="flex items-center gap-1 text-[10px] font-bold text-sky-600 hover:text-sky-800 disabled:text-gray-400 transition-colors uppercase tracking-wider"
              >
                {isGenerating ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3" />
                )}
                実績からAI生成
              </button>
            </div>
            <textarea
              {...register("bio")}
              className="w-full p-3 border border-[#e9e4db] rounded-md h-40 focus:ring-1 focus:ring-[#cb997e] outline-none transition-all text-sm leading-relaxed"
              placeholder="AIボタンでこれまでの実績に基づいた自己紹介を生成できます"
            />
            {errors.bio && (
              <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
            )}
          </div>
        </div>

        {/* 写真アップロード */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-[#3f4238]">
            プロフィール写真
          </label>

          <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-[#e9e4db] rounded-xl bg-[#fcfaf8]">
            {/* プレビュー：アーズな角あり影強めスタイル */}
            {currentImageUrl ? (
              <div className="relative w-32 h-40 shadow-[10px_10px_25px_rgba(0,0,0,0.1)] border-4 border-white rounded-sm overflow-hidden">
                <img
                  src={currentImageUrl}
                  alt="Avatar Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-32 h-40 bg-[#e9e4db] rounded-sm flex items-center justify-center text-[#a5a58d] text-xs">
                No Image
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#6b705c] file:text-white hover:file:bg-[#3f4238] cursor-pointer"
            />

            {isUploading && (
              <p className="text-xs text-[#cb997e] animate-pulse">
                アップロード中...⌛
              </p>
            )}
          </div>

          <Input
            label="画像URL"
            {...register("image_url")}
            placeholder="自動入力されます"
          />
          <Input label="GitHub URL" {...register("github_url")} />
          <Input label="Twitter URL" {...register("twitter_url")} />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#e9e4db]">
        <Button
          type="submit"
          className="bg-[#6b705c] hover:bg-[#3f4238] text-white"
        >
          プロフィールを保存する
        </Button>
      </div>
    </form>
  );
}
