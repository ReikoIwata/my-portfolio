"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { Card } from "@/components/ui";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

type Skill = {
  id: number;
  name: string;
  category: string;
  level: number;
};

export default function SkillList({
  onEdit,
}: {
  onEdit?: (skill: Skill) => void;
}) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSkills = async () => {
    try {
      const data = await apiRequest("/skills/");
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <Card
          key={skill.id}
          className="hover:border-blue-300 transition-colors relative group"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {skill.category}
              </span>
              <h3 className="text-lg font-bold mt-2">{skill.name}</h3>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-yellow-500 font-bold">
                {"⭐".repeat(skill.level)}
              </div>

              {user && (
                <div className="flex gap-4 mt-4 pt-3 border-t border-gray-100 justify-end">
                  <button
                    onClick={() => onEdit?.(skill)}
                    className="text-xs text-gray-400 hover:text-red-500"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="text-xs text-gray-400 hover:text-red-500"
                  >
                    削除
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
