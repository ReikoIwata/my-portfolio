"use client";

import { useForm } from "react-hook-form";
import { Project } from "@/types";
import { apiRequest } from "@/lib/api-client";
import { Button, Input } from "@/components/ui";
import toast from "react-hot-toast";
import { useEffect } from "react";

interface ProjectFormProps {
  editingProject: Project | null;
  onSuccess: () => void;
}

type ProjectInput = Omit<Project, "id" | "created_at">;

export default function ProjectForm({
  editingProject,
  onSuccess,
}: ProjectFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm<ProjectInput>();

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

  const onSubmit = async (data: ProjectInput) => {
    try {
      if (editingProject) {
        await apiRequest(`/projects/${editingProject.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
        toast.success("実績を更新しました！✨");
      } else {
        await apiRequest("/projects/", {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
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

      <Input
        label="画像URL (Cloudinary等)"
        {...register("image_url")}
        placeholder="https://res.cloudinary.com/..."
      />

      <Button type="submit" className="w-full">
        {editingProject ? "更新する" : "実績を登録する"}
      </Button>
    </form>
  );
}
