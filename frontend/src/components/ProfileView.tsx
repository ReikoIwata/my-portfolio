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
      <div className="py-20 animate-pulse text-[#a5a58d] text-center tracking-widest uppercase text-xs">
        Loading Story...
      </div>
    );

  const displayProfile = profile || {
    fullName: "Iwata Reiko",
    title: "Web Engineer",
    bio: "自己紹介文を管理画面から登録してください✏",
    image_url: "",
  };

  return (
    <section className="mb-24 flex flex-col md:flex-row items-center gap-12 md:gap-16 max-w-4xl mx-auto">
      {/* 画像エリア：ポラロイド風・強い影 */}
      <div className="relative group">
        {/* さらに深い「落ち影」の演出 */}
        <div className="absolute inset-0 bg-black/10 translate-x-6 translate-y-6 blur-3xl rounded-sm"></div>

        <div className="relative w-64 h-60 shrink-0 overflow-hidden shadow-[25px_25px_60px_rgba(0,0,0,0.15)] transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[30px_30px_70px_rgba(0,0,0,0.2)]">
          <Image
            src={
              displayProfile.image_url ||
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500"
            }
            alt={displayProfile.fullName}
            fill
            className="object-cover grayscale-15 group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
          />
        </div>
      </div>

      {/* テキストエリア：落ち着いた配色とフォント使い */}
      <div className="flex-1 space-y-6 text-[#6b705c] leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-3xl font-serif italic text-[#3f4238] tracking-tight">
            {displayProfile.fullName}
          </h2>
          <p className="text-[#cb997e] font-medium tracking-widest uppercase text-xs">
            {displayProfile.title}
          </p>
        </div>

        <div className="relative py-4">
          {/* 自己紹介文：アースカラーなアクセントライン */}
          <p className="whitespace-pre-wrap text-lg font-light text-[#5a5a4a] border-l border-[#cb997e]/40 pl-6">
            {displayProfile.bio}
          </p>
        </div>

        <p className="text-sm text-[#a5a58d] font-light">
          Based in Tokyo, exploring the intersection of art and technology.
        </p>
      </div>
    </section>
  );
}
