"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";
import LogoutButton from "@/components/LogoutButton";
import ProfileForm from "@/components/ProfileForm";
import ProfileView from "@/components/ProfileView";
import SkillForm from "@/components/SkillForm";
import SkillList from "@/components/SkillList";
import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import { Skill, Project } from "@/types";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "skills">(
    "profile",
  );

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  if (loading)
    return (
      <p className="p-10 text-center text-[#6b705c] animate-pulse">
        🌿 読み込み中... 🌿
      </p>
    );
  if (!user) return null;

  return (
    <main className="max-w-5xl mx-auto p-8 min-h-screen">
      {/* ヘッダー */}
      <header className="flex justify-between items-end mb-12 pb-6 border-b border-[#e9e4db]">
        <div>
          <h1 className="text-3xl font-serif italic text-[#3f4238] tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-sm text-[#a5a58d] mt-1">
            Welcome back,{" "}
            <span className="font-bold text-[#6b705c]">{user.displayName}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="small"
            onClick={() => router.push("/")}
          >
            サイトを表示
          </Button>
          <LogoutButton />
        </div>
      </header>

      {/* タブナビゲーション */}
      <nav className="flex border-b border-[#e9e4db] mb-10 gap-2">
        {[
          { id: "profile", label: "Profile", icon: "🍃" },
          { id: "projects", label: "Projects", icon: "🎨" },
          { id: "skills", label: "Skills", icon: "🌱" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              relative pb-4 px-6 text-sm font-bold transition-all duration-300
              ${
                activeTab === tab.id
                  ? "text-[#6b705c]"
                  : "text-[#a5a58d] hover:text-[#6b705c]"
              }
            `}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg">{tab.icon}</span> {tab.label}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-px left-0 w-full h-0.75 bg-[#cb997e] rounded-t-full" />
            )}
          </button>
        ))}
      </nav>

      {/* コンテンツエリア */}
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700">
        {activeTab === "profile" && (
          <div className="flex flex-col gap-10 max-w-3xl mx-auto">
            {/* プレビューを上配置に変更 */}
            <Card title="現在の表示プレビュー">
              <div className="p-8 bg-[#fcfaf8] rounded-xl border border-dashed border-[#e9e4db]">
                <ProfileView />
              </div>
            </Card>

            {/* フォームを下配置に変更 */}
            <Card title="内容を編集する">
              <ProfileForm />
            </Card>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid gap-10">
            <Card title={editingProject ? "実績を編集する" : "実績を登録する"}>
              <ProjectForm
                editingProject={editingProject}
                onSuccess={() => {
                  setEditingProject(null);
                  setRefreshKey((k) => k + 1);
                }}
              />
              {editingProject && (
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => setEditingProject(null)}
                >
                  キャンセルして戻る
                </Button>
              )}
            </Card>
            <Card title="実績一覧">
              <ProjectList
                key={refreshKey}
                isAdmin={true}
                onEdit={setEditingProject}
              />
            </Card>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="grid gap-10">
            {/* スキルも縦並びの方が見やすい場合は grid-cols を削除 */}
            <Card title={editingSkill ? "スキルを編集" : "スキルを登録する"}>
              <SkillForm
                editingSkill={editingSkill}
                onSuccess={() => {
                  setEditingSkill(null);
                  setRefreshKey((k) => k + 1);
                }}
              />
              {editingSkill && (
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => setEditingSkill(null)}
                >
                  キャンセル
                </Button>
              )}
            </Card>
            <Card title="スキル一覧">
              <SkillList
                key={refreshKey}
                isAdmin={true}
                onEdit={setEditingSkill}
              />
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
