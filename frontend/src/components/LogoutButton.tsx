"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Button from "./ui/Button";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("ログアウトできませんでした💦:", error);
    }
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      ログアウト
    </Button>
  );
}
