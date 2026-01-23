"use client";

import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Button from "./ui/Button";

export default function LoginButton() {
  const { user, loading } = useAuth();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      console.log("ログイン成功💕🌈✨");
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...✨</p>;

  return (
    <div className="flex items-center gap-4">
      <Button variant="danger" onClick={handleLogin}>
        Googleでログイン
      </Button>
    </div>
  );
}
