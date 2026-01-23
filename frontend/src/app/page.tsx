"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // ログイン済みなら管理者ページへリダイレクト
  useEffect(() => {
    if (!loading && user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (loading) return <p className="p-8">🚪読み込み中...🚪</p>;
  if (user) return null;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        ReikoIwata's Portfolio 管理者ログイン
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 inline-block">
        <p className="mb-4 text-gray-600">
          管理者はここからログインしてください
        </p>
        <LoginButton />
      </div>
    </main>
  );
}
