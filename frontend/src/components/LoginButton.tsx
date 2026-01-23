"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "./ui";

export default function LoginButton() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleLogin}
      className="px-8 py-3 text-lg font-bold shadow-lg"
    >
      Googleアカウントで管理画面へ
    </Button>
  );
}
