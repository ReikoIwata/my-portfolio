"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { Card } from "@/components/ui";

type Skill = {
  id: number;
  name: string;
  category: string;
  level: number;
};

export default function SkillList() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchSkills();
  }, []);

  if (loading) return <p className="text-center py-10">読み込み中...⌛</p>;
  if (skills.length === 0)
    return <p className="text-center py-10">登録されたスキルがありません。</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skills.map((skill) => (
        <Card
          key={skill.id}
          className="hover:border-blue-300 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {skill.category}
              </span>
              <h3 className="text-lg font-bold mt-2">{skill.name}</h3>
            </div>
            <div className="text-yellow-500 font-bold">
              {"⭐".repeat(skill.level)}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
