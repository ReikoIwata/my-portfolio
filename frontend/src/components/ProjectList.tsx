"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { Project } from "@/types";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";

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
      const data = await apiRequest<Project[]>("/projects");
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

  const handleDelete = (id: number) => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4 p-2">
          <p className="text-sm font-semibold text-[#3f4238]">
            この実績を削除してもよろしいですか？
          </p>
          <div className="flex gap-3">
            {/* 作成したButtonコンポーネントを使用 */}
            <Button
              variant="danger"
              size="small"
              onClick={async () => {
                toast.dismiss(t.id);
                const loading = toast.loading("削除中...");
                try {
                  await apiRequest(`/projects/${id}`, { method: "DELETE" });
                  toast.success("削除しました✨", { id: loading });
                  fetchProjects();
                } catch (error) {
                  toast.error("失敗しました", { id: loading });
                }
              }}
            >
              削除する
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() => toast.dismiss(t.id)}
            >
              キャンセル
            </Button>
          </div>
        </div>
      ),
      { duration: 6000 },
    );
  };

  if (loading) return <p className="text-center py-10">読み込み中...⌛</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
      {projects.map((project) => (
        <article key={project.id} className="group cursor-pointer">
          <div className="relative aspect-video mb-6 overflow-hidden rounded-sm bg-[#e9e4db]">
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#a5a58d] text-xs tracking-widest uppercase">
                No Image
              </div>
            )}
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium text-[#3f4238] group-hover:text-[#cb997e] transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-[#6b705c] leading-relaxed line-clamp-2 font-light">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {project.tech_stack.split(",").map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] text-[#a5a58d] uppercase tracking-wider"
                >
                  #{tech.trim()}
                </span>
              ))}
            </div>

            {isAdmin && (
              <div className="flex gap-4 pt-4 border-t border-[#e9e4db] mt-4">
                <button
                  onClick={() => onEdit?.(project)}
                  className="text-[10px] uppercase tracking-tighter text-[#a5a58d] hover:text-[#6b705c]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-[10px] uppercase tracking-tighter text-rose-300 hover:text-rose-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
