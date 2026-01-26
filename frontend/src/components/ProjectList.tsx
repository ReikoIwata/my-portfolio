"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { Card, Button } from "@/components/ui";
import { Project } from "@/types";
import toast from "react-hot-toast";

interface ProjectListProps {
  onEdit?: (project: Project) => void;
  isAdmin?: boolean; // 管理画面モードかどうか
}

export default function ProjectList({
  onEdit,
  isAdmin = false,
}: ProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await apiRequest("/projects");
      setProjects(data);
    } catch (error) {
      console.error("実績の取得に失敗しました:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("この実績を削除しますか？")) return;
    try {
      await apiRequest(`/projects${id}`, { method: "DELETE" });
      toast.success("削除しました");
      fetchProjects();
    } catch (error) {
      toast.error("削除に失敗しました");
    }
  };

  if (loading) return <p className="text-center py-10">読み込み中...⌛</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden flex flex-col">
          {/* 画像がある場合は表示 */}
          {project.image_url && (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-4 grow">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-gray-600 text-sm mt-2 line-clamp-3">
              {project.description}
            </p>

            {/* 技術タグの表示 */}
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech_stack.split(",").map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-md border border-slate-200"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* 管理者用のボタン */}
          {isAdmin && (
            <div className="p-4 border-t flex justify-end gap-2 bg-slate-50">
              <Button
                variant="outline"
                size="small"
                onClick={() => onEdit?.(project)}
                className="text-gray-400 hover:text-gray-600"
              >
                編集
              </Button>
              <Button
                variant="outline"
                size="small"
                className="text-rose-400 hover:bg-rose-50"
                onClick={() => handleDelete(project.id)}
              >
                削除
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
