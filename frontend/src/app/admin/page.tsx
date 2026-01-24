"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SkillForm from "@/components/SkillForm";
import SkillList from "@/components/SkillList";
import ProfileForm from "@/components/ProfileForm";
import { Button, Card } from "@/components/ui";
import LogoutButton from "@/components/LogoutButton";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [editingSkill, setEditingSkill] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // ログインしていない場合はプロテクト
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-10">🚪読み込み中...🚪</p>;
  if (!user) return null;

  // 成功時の共通処理
  const handleSuccess = () => {
    setEditingSkill(null);
    setRefreshKey((prev) => prev + 1); // SkillListを再読み込みさせる
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
