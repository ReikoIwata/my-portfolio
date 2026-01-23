"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillSchema, type SkillInput } from "@/lib/schema";
import { apiRequest } from "@/lib/api-client";
import { Button, Input, Select } from "@/components/ui";
import toast from "react-hot-toast";

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

export default function SkillForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillInput>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      category: "Backend",
      level: 3,
    },
  });

  const onSubmit = async (data: SkillInput) => {
    try {
      await apiRequest("/skills/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      toast.success("登録が成功しました✨");
      reset(); // フォームをクリア
    } catch (error) {
      toast.success("エラーです…💀: " + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          label="スキル名"
          {...register("name")}
          placeholder="例: Next.js"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Select
            label="カテゴリ"
            {...register("category")}
            options={CATEGORY_OPTIONS}
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <Select
            label="習熟度"
            {...register("level", { valueAsNumber: true })} // 数値として取得
            options={LEVEL_OPTIONS}
          />
          {errors.level && (
            <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "送信中..." : "スキルを登録"}
      </Button>
    </form>
  );
}
