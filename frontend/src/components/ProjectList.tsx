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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
      {projects.map((project) => (
        <article key={project.id} className="group cursor-pointer">
          <div className="relative aspect-video mb-6 overflow-hidden rounded-sm bg-[#e9e4db]">
            {project.image_url ? (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
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
