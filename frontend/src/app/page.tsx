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
      {/* 背景 */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.6]"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/felt.png')",
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="relative max-w-4xl mx-auto px-6 py-20">
        <header className="flex justify-between items-baseline mb-15">
          <div>
            <h1 className="text-4xl font-serif italic text-[#3f4238] tracking-tight">
              My Portfolio
            </h1>
          </div>

          <Link
            href="/login"
            className="text-xs font-semibold text-[#6b705c] hover:text-[#3f4238] transition-colors border-b border-[#6b705c]/30 pb-1"
          >
            Admin
          </Link>
        </header>

        {/* プロフィール */}
        <section className="mb-20">
          <ProfileView />
        </section>

        {/* 各セクション */}
        <div className="grid gap-20">
          <section>
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#a5a58d] mb-12 flex items-center gap-4">
              <span className="w-12 h-px bg-[#cb997e]"></span>
              Selected Projects
            </h2>
            <ProjectList />
          </section>

          <section className="pb-24">
            <h2 className="text-xs uppercase tracking-[0.3em] text-[#a5a58d] mb-12 flex items-center gap-4">
              <span className="w-12 h-px bg-[#cb997e]"></span>
              Toolbox
            </h2>
            <SkillList />
          </section>
        </div>
      </div>
    </main>
  );
}
