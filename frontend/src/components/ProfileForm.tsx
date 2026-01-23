"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "@/lib/schema";
import { Input, Button } from "@/components/ui";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      // APIにPATCHまたはPUTで送信する想定
      toast.success("プロフィールを更新しました！✨");
    } catch (error) {
      toast.error("更新に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
      <div>
        <label className="block text-sm font-bold mb-1">自己紹介</label>
        <textarea
          {...register("bio")}
          className="w-full p-2 border rounded h-32"
        />
        {errors.bio && (
          <p className="text-red-500 text-xs">{errors.bio.message}</p>
        )}
      </div>
      <Button type="submit">更新する</Button>
    </form>
  );
}
