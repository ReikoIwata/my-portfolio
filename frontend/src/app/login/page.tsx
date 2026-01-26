"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginButton from "@/components/LoginButton";
import { Card } from "@/components/ui";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card title="管理者ログイン" className="w-full max-w-md text-center">
        <p className="mb-8 text-gray-600">
          ポートフォリオの更新には認証が必要です。
        </p>
        <LoginButton />
      </Card>
    </main>
  );
}
