import { auth } from "./firebase";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  // 現在ログインしているユーザーからトークンを取得
  const user = auth.currentUser;
  let token = "";

  if (user) {
    // トークンを強制リフレッシュして取得
    token = await user.getIdToken(true);
  }

  // ヘッダーの準備
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  // フェッチの実行
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "APIリクエストに失敗しました💡");
  }

  return response.json();
};
