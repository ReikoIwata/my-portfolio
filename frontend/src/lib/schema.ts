// src/lib/schema.ts
import { z } from "zod";
export const CATEGORIES = ["Backend", "Frontend", "Tool"] as const;

export const skillSchema = z.object({
  name: z
    .string()
    .min(1, "スキル名を入力してください")
    .max(20, "20文字以内で入力してください"),

  category: z
    .string()
    .min(1, "カテゴリーを選択してください")
    .refine((val) => CATEGORIES.includes(val as (typeof CATEGORIES)[number]), {
      message: "無効なカテゴリーです",
    }),

  level: z
    .number()
    .min(1, "レベルは1以上で指定してください")
    .max(5, "レベルは5以下で指定してください"),
});

export type SkillInput = z.infer<typeof skillSchema>;
