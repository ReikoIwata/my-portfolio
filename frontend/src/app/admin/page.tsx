"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SkillForm from "@/components/SkillForm";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // ログインしていない場合はプロテクト
  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-10">🚪読み込み中...🚪</p>;
  if (!user) return null;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">🛠 管理者ダッシュボード</h1>
        <Button variant="outline" onClick={() => router.push("/")}>
          トップへ戻る
        </Button>
      </div>

      <div className="grid gap-8">
        <Card title="スキル登録">
          <SkillForm />
        </Card>

        {/* 今後、ここに ProfileForm や ProjectForm を追加 */}
        <Card title="プロフィール編集">
          <p className="text-gray-500 text-sm">
            （ここに今後プロフィール用フォームを入れる）
          </p>
        </Card>
      </div>
    </main>
  );
}
