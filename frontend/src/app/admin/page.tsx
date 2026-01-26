// src/app/admin/page.tsx
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

  // 編集用ステート
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.push("/");
  }, [user, loading, router]);

  if (loading) return <p className="p-10 text-center">🚪読み込み中...🚪</p>;
  if (!user) return null;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="flex justify-between items-center mb-8 pb-6 border-b">
        <div>
          <h1 className="text-2xl font-bold">🛠 Admin Dashboard</h1>
          <p className="text-sm text-gray-500">{user.displayName} さん</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/")}>
            トップ表示
          </Button>
          <LogoutButton />
        </div>
      </header>

      {/* タブナビゲーション */}
      <div className="flex border-b mb-8 gap-4">
        {[
          { id: "profile", label: "プロフィール", icon: "👤" },
          { id: "projects", label: "実績管理", icon: "📁" },
          { id: "skills", label: "スキル管理", icon: "🚀" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-sky-500 text-sky-600"
                : "text-gray-400"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* コンテンツエリア */}
      <div className="space-y-6">
        {activeTab === "profile" && (
          <div className="grid gap-6">
            {/* 現在のプロフィールの簡易プレビュー */}
            <Card title="現在の公開内容">
              <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-xs text-gray-400 mb-2 font-bold uppercase">
                  Preview
                </p>
                <ProfileView /> {/* すでに作ったコンポーネントを再利用！ */}
              </div>
            </Card>

            {/* 編集フォーム */}
            <Card title="内容を編集する">
              <ProfileForm />
            </Card>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid gap-6">
            <Card title={editingProject ? "実績を編集" : "新規実績の登録"}>
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
                  className="mt-2 w-full"
                  onClick={() => setEditingProject(null)}
                >
                  キャンセル
                </Button>
              )}
            </Card>
            <Card title="登録済みの制作実績">
              <ProjectList
                key={refreshKey}
                isAdmin={true}
                onEdit={setEditingProject}
              />
            </Card>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="grid gap-6">
            <Card title={editingSkill ? "スキルを編集" : "スキルの追加"}>
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
                  className="mt-2 w-full"
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
