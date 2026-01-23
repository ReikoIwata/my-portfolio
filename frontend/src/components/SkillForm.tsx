"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { Button, Input, Select } from "@/components/ui";

export default function SkillForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Backend");
  const CATEGORY_OPTIONS = [
    { value: "Backend", label: "Backend" },
    { value: "Frontend", label: "Frontend" },
    { value: "Tool", label: "Tool" },
  ];

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="スキル名"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="例: Next.js"
        required
      />
      <Select
        label="カテゴリ"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={CATEGORY_OPTIONS}
      />

      <Button type="submit" variant="primary" className="w-full">
        スキルを登録
      </Button>
    </form>
  );
}
