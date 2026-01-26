"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { Button, Card } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Skill } from "@/types";
interface SkillListProps {
  onEdit?: (skill: Skill) => void;
  isAdmin?: boolean; // 管理画面モードかどうか
}

export default function SkillList({ onEdit, isAdmin }: SkillListProps) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSkills = async () => {
    try {
      const data = await apiRequest("/skills");
      setSkills(data);
    } catch (error) {
      console.error("スキル取得に失敗しました💦:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // 削除処理
  const handleDelete = async (id: number) => {
    if (!window.confirm("このスキルを削除してもよろしいですか？")) return;

    try {
      await apiRequest(`/skills/${id}`, { method: "DELETE" });
      toast.success("スキルを削除しました✨");
      fetchSkills(); // リストを再読み込み
    } catch (error) {
      toast.error("削除に失敗しました。");
    }
  };

  if (loading) return <p className="text-center py-10">読み込み中...⌛</p>;
  if (skills.length === 0)
    return <p className="text-center py-10">登録されたスキルがありません。</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skills.map((skill) => (
        <div key={skill.id} className="group relative">
          <div className="space-y-2">
            {/* カテゴリ：極小フォントでさりげなく */}
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#a5a58d] block font-bold">
              {skill.category}
            </span>
            <h3 className="text-sm font-medium text-[#3f4238] border-b border-[#e9e4db] pb-2 flex justify-between items-end">
              {skill.name}
              {/* レベルをドットで表現 */}
              <span className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 h-1 rounded-full ${i < skill.level ? "bg-[#cb997e]" : "bg-[#e9e4db]"}`}
                  />
                ))}
              </span>
            </h3>
          </div>

          {isAdmin && (
            <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit?.(skill)}
                className="p-1 bg-white shadow-sm rounded-full text-[10px] text-[#6b705c] hover:bg-[#f5f2ed]"
              >
                ✎
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="p-1 bg-white shadow-sm rounded-full text-[10px] text-rose-300 hover:bg-rose-50"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
