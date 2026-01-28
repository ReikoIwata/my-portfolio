"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, type SkillInput } from "@/lib/schema";
import { apiRequest } from "@/lib/api-client";
import { Button, Input, Select } from "@/components/ui";
import toast from "react-hot-toast";
import { Skill } from "@/types";

const CATEGORY_OPTIONS = [
  { value: "Backend", label: "🌿 Backend" },
  { value: "Frontend", label: "🍃 Frontend" },
  { value: "Tool", label: "🌳 Tool" },
];

const LEVEL_OPTIONS = [
  { value: "1", label: "🌱 Step 1 (学習中)" },
  { value: "2", label: "🌿 Step 2 (基礎)" },
  { value: "3", label: "🌳 Step 3 (実務レベル)" },
  { value: "4", label: "✨ Step 4 (得意)" },
  { value: "5", label: "👑 Step 5 (マスター)" },
];

export default function SkillForm({
  editingSkill,
  onSuccess,
  initialName = "", // AIで抽出した名前を外から受け取れるように追加
}: {
  editingSkill: Skill | null;
  onSuccess: () => void;
  initialName?: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue, // プログラムから値を書き換えるために必要
    formState: { errors, isSubmitting },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: initialName || "",
      category: "Frontend",
      level: 3,
    },
  });

  // 編集モードやAI抽出名が変わった時にフォームを更新
  useEffect(() => {
    if (editingSkill) {
      reset(editingSkill);
    } else if (initialName) {
      setValue("name", initialName);
    } else {
      reset({ name: "", category: "Frontend", level: 3 });
    }
  }, [editingSkill, initialName, reset, setValue]);

  const onSubmit = async (data: SkillInput) => {
    try {
      const url = editingSkill ? `/skills/${editingSkill.id}` : "/skills";
      const method = editingSkill ? "PUT" : "POST";

      await apiRequest(url, {
        method: method,
        body: JSON.stringify(data),
      });

      toast.success(
        editingSkill ? "スキルを更新しました！✨" : "スキルを登録しました！🌱",
      );
      onSuccess();
    } catch (error) {
      toast.error("保存に失敗しました…: " + (error as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 bg-[#fdfbf9] p-2 rounded-xl"
    >
      <div className="relative group">
        <Input
          label="スキル名"
          {...register("name")}
          placeholder="例: Next.js / TypeScript"
          error={errors.name?.message}
          className="text-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="カテゴリ"
          {...register("category")}
          options={CATEGORY_OPTIONS}
          error={errors.category?.message}
        />
        <Select
          label="習熟度"
          {...register("level", { valueAsNumber: true })}
          options={LEVEL_OPTIONS}
          error={errors.level?.message}
        />
      </div>

      <div className="flex justify-end items-center gap-4 pt-4 border-t border-[#ede7de]">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="min-w-35 shadow-md"
        >
          {isSubmitting
            ? "登録中...⌛"
            : editingSkill
              ? "変更を保存"
              : "スキルを登録"}
        </Button>
      </div>
    </form>
  );
}
