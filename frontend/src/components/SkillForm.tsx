"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import Button from "./ui/Button";

export default function SkillForm() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Backend");

  // ログインしていない場合はメッセージを出す
  if (!user)
    return <p className="text-gray-500">ログインしてから登録してください✏✨</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSkill = {
      name: name,
      category: category,
      level: 3, // 固定値
    };

    try {
      await apiRequest("/skills/", {
        method: "POST",
        body: JSON.stringify(newSkill),
      });
      alert("登録が成功しました✨");
      setName(""); // フォームをクリア
    } catch (error) {
      alert("エラーです…💀: " + (error as Error).message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg bg-gray-50"
    >
      <div>
        <label className="block text-sm font-bold">スキル名</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="例: Next.js"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-bold">カテゴリ</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="Backend">Backend</option>
          <option value="Frontend">Frontend</option>
          <option value="Tool">Tool</option>
        </select>
      </div>
      <Button type="submit" variant="primary" className="w-full">
        スキルを登録
      </Button>
    </form>
  );
}
