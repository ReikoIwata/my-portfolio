"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SkillForm from "@/components/SkillForm";
import SkillList from "@/components/SkillList";
import ProfileForm from "@/components/ProfileForm";
import ProjectList from "@/components/ProjectList";
import ProjectForm from "@/components/ProjectForm";
import { Button, Card } from "@/components/ui";
import LogoutButton from "@/components/LogoutButton";
import { Skill, Project } from "@/types";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // スキルの状態
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  // プロジェクトの状態
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectRefreshKey, setProjectRefreshKey] = useState(0);

  // ログインしていない場合はプロテクト
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-10">🚪読み込み中...🚪</p>;
  if (!user) return null;

  // スキル用 handleSuccess
  const handleSuccess = () => {
    setEditingSkill(null);
    setRefreshKey((prev) => prev + 1); // SkillListを再読み込みさせる
  };

  // 実績用 handleSuccess
  const handleProjectSuccess = () => {
    setEditingProject(null);
    setProjectRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">🛠 管理者ダッシュボード</h1>
          <p className="text-gray-600 mt-2">
            {user.displayName} さんとしてログイン中
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/")}>
            トップを確認
          </Button>
          <LogoutButton />
        </div>
      </div>

      <div className="grid gap-12">
        {/* --- 実績管理セクション --- */}
        <section className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-xl font-semibold">📁 実績管理</h2>
          </div>

          <Card>
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <span className="font-medium">
                {editingProject ? "実績を編集中..." : "新規実績を登録"}
              </span>
              {editingProject && (
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => setEditingProject(null)}
                >
                  キャンセル
                </Button>
              )}
            </div>
            {/* ProjectForm の組み込み */}
            <ProjectForm
              editingProject={editingProject}
              onSuccess={handleProjectSuccess}
            />
          </Card>

          <Card title="登録済みの制作実績">
            <ProjectList
              key={projectRefreshKey}
              isAdmin={true}
              onEdit={(project) => setEditingProject(project)}
            />
          </Card>
        </section>
      </div>

      <div className="grid gap-8">
        <Card title={editingSkill ? "🚀 スキルを編集" : "🚀 スキル登録"}>
          <SkillForm editingSkill={editingSkill} onSuccess={handleSuccess} />
          {editingSkill && (
            <Button
              variant="outline"
              className="mt-4 w-full"
              onClick={() => setEditingSkill(null)}
            >
              キャンセルして新規登録に戻る
            </Button>
          )}
        </Card>

        <Card title="登録済みスキルの管理">
          <div className="mt-4">
            <SkillList
              key={refreshKey}
              onEdit={(skill) => setEditingSkill(skill)}
            />
          </div>
        </Card>

        <Card title="プロフィール編集">
          <div className="text-gray-600">
            <ProfileForm />
          </div>
        </Card>
      </div>
    </main>
  );
}
