"use client";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api-client";
import SkillList from "@/components/SkillList";
import ProjectList from "@/components/ProjectList";
import ProfileView from "@/components/ProfileView";
import Link from "next/link";
import { Profile } from "@/types";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f2ed]">
      {/* 背景に薄い紙のようなテクスチャ感（オプション） */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>

      <div className="relative max-w-4xl mx-auto px-6 py-20">
        <header className="flex justify-between items-baseline mb-24">
          <div>
            <h1 className="text-4xl font-serif italic text-[#3f4238] tracking-tight">
              Reiko Iwata
            </h1>
            <p className="text-sm text-[#a5a58d] mt-2 tracking-[0.1em] font-medium">
              Web Engineer / Focused on Minimal Design
            </p>
          </div>

          <Link
            href="/login"
            className="text-xs font-semibold text-[#6b705c] hover:text-[#3f4238] transition-colors border-b border-[#6b705c]/30 pb-1"
          >
            Admin
          </Link>
        </header>

        {/* プロフィール：装飾を削ぎ落としたデザイン */}
        <section className="mb-32">
          <ProfileView />
        </section>

        {/* 各セクション：植物が合うような落ち着いた見出し */}
        <div className="grid gap-32">
          <section>
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#a5a58d] mb-12 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#cb997e]"></span>
              Selected Projects
            </h2>
            <ProjectList />
          </section>

          <section className="pb-24">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#a5a58d] mb-12 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-[#cb997e]"></span>
              Toolbox
            </h2>
            <SkillList />
          </section>
        </div>
      </div>
    </main>
  );
}
