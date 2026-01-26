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
  { value: "Backend", label: "Backend" },
  { value: "Frontend", label: "Frontend" },
  { value: "Tool", label: "Tool" },
];

const LEVEL_OPTIONS = [
  { value: "1", label: "⭐1 (学習中)" },
  { value: "2", label: "⭐2 (基礎)" },
  { value: "3", label: "⭐3 (実務レベル)" },
  { value: "4", label: "⭐4 (得意)" },
  { value: "5", label: "⭐5 (マスター)" },
];

export default function SkillForm({
  editingSkill,
  onSuccess,
}: {
  editingSkill: Skill | null;
  onSuccess: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      category: "Frontend",
      level: 3,
    },
  });

  // 編集対象が切り替わったときにフォームを同期する
  useEffect(() => {
    if (editingSkill) {
      reset(editingSkill);
    } else {
      reset({ name: "", category: "Frontend", level: 3 });
    }
  }, [editingSkill, reset]);

  const onSubmit = async (data: SkillInput) => {
    try {
      // 編集なら PUT /skills{id} 、新規なら POST /skills
      const url = editingSkill ? `/skills/${editingSkill.id}` : "/skills";
      const method = editingSkill ? "PUT" : "POST";

      await apiRequest(url, {
        method: method,
        body: JSON.stringify(data),
      });

      toast.success(editingSkill ? "更新しました！✨" : "登録しました！🚀");

      // 編集モードを解除し、リストを更新するために親の関数を呼ぶ
      onSuccess();
    } catch (error) {
      toast.error("失敗しました…: " + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="スキル名"
          {...register("name")}
          placeholder="例: Next.js"
          error={errors.name?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "送信中..." : editingSkill ? "更新する" : "登録する"}
        </Button>
      </div>
    </form>
  );
}
