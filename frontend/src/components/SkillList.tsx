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
      await apiRequest(`/skills${id}`, { method: "DELETE" });
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
            <div className="flex flex-col items-end gap-2 min-width: 90px shrink-0">
              <div className="text-yellow-500 font-bold text-sm">
                {"⭐".repeat(skill.level)}
              </div>

              {isAdmin && (
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 justify-end">
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => onEdit?.(skill)}
                    className="text-gray-400 hover:text-gray-600 min-w-fit flex-1"
                  >
                    編集
                  </Button>
                  <Button
                    variant="outline"
                    size="small"
                    className="text-rose-400 hover:bg-rose-50 flex-1"
                    onClick={() => handleDelete(skill.id)}
                  >
                    削除
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
