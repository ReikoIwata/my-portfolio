"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import { Profile } from "@/types";
import Image from "next/image";

export default function ProfileView() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest("/profile");
        setProfile(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("プロフィールの取得に失敗しました💦:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="py-10 animate-pulse text-gray-400">読み込み中...⌛</div>
    );

  const displayProfile = profile || {
    fullName: "Iwata Reiko",
    title: "Web Engineer",
    bio: "自己紹介文を管理画面から登録してください✏",
    image_url: "",
  };

  return (
    <section className="mb-16 flex flex-col md:flex-row items-center gap-8 max-w-4xl">
      {/* 画像エリア */}
      <div className="relative group">
        {/* 写真の下に敷く「強い影」の演出 */}
        <div className="absolute inset-0 bg-black/20 translate-x-4 translate-y-4 blur-2xl rounded-sm"></div>

        <div className="relative w-60 h-60 shrink-0 overflow-hidden  shadow-[20px_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:-translate-y-2">
          <Image
            src={
              displayProfile.image_url ||
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500"
            }
            alt={displayProfile.fullName}
            fill
            className="object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>

      {/* テキストエリア */}
      <div className="space-y-4 text-gray-600 leading-relaxed">
        <p className="text-lg">
          <span className="font-bold text-gray-800">
            {displayProfile.fullName}
          </span>{" "}
          のポートフォリオをご覧いただきありがとうございます。
        </p>
        <p>
          私は現在、
          <span className="text-gray-800 font-medium">
            {displayProfile.title}
          </span>
          として活動しております。
        </p>
        <p className="whitespace-pre-wrap pt-2 border-l-2 border-gray-200 pl-4 italic">
          {displayProfile.bio}
        </p>
      </div>
    </section>
  );
}
