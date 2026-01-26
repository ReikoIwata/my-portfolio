"use client";

import { useForm } from "react-hook-form";
import { Project } from "@/types";
import { apiRequest } from "@/lib/api-client";
import { Button, Input } from "@/components/ui";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

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
  const [isUploading, setIsUploading] = useState(false);

  // 画像URLを監視してプレビューを表示
  const currentImageUrl = watch("image_url");

  // 編集モード時に値をセット
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
        toast.success("画像をアップロードしました！📸");
      }
    } catch (error) {
      toast.error("画像のアップロードに失敗しました。");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProjectInput) => {
    try {
      if (editingProject) {
        await apiRequest(`/projects/${editingProject.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
        toast.success("実績を更新しました！✨");
      } else {
        await apiRequest("/projects", {
          method: "POST",
          body: JSON.stringify(data),
        });
        toast.success("実績を登録しました！🚀");
      }
      onSuccess();
    } catch (error) {
      toast.error("保存に失敗しました。");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 text-sm">
      <Input
        label="タイトル"
        {...register("title", { required: true })}
        placeholder="アプリ名"
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">説明</label>
        <textarea
          {...register("description", { required: true })}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 min-h-[100px]"
          placeholder="プロジェクトの概要や工夫した点"
        />
      </div>

      <Input
        label="技術スタック"
        {...register("tech_stack", { required: true })}
        placeholder="React, FastAPI, PostgreSQL (カンマ区切り)"
      />

      {/* 画像アップロードセクション */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          プロジェクト画像
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-8 file:text-xs file:font-semibold file:bg-[#6b705c] file:text-white hover:file:bg-[#3f4238] cursor-pointer"
        />
        {isUploading && (
          <p className="text-xs text-gray-700 animate-pulse">
            アップロード中...
          </p>
        )}

        {currentImageUrl && (
          <div className="relative w-full h-40 mt-2">
            <img
              src={currentImageUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-md border"
            />
          </div>
        )}
        {/* URLを手動入力したい時や、hiddenで値を保持するためにInputを表示 */}
        <Input
          label="画像URL (自動入力されます)"
          {...register("image_url")}
          placeholder="https://res.cloudinary.com/..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="GitHub URL"
          {...register("github_url")}
          placeholder="https://github.com/..."
        />
        <Input
          label="公開サイト URL"
          {...register("site_url")}
          placeholder="https://..."
        />
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">
          {editingProject ? "更新する" : "登録する"}
        </Button>
      </div>
    </form>
  );
}
