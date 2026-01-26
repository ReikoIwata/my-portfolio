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
    <main className="max-w-5xl mx-auto p-8">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-sky-400 to-teal-500 bg-clip-text text-transparent">
            ReikoIwata&apos;s Portfolio
          </h1>
          <p className="text-gray-500 mt-2">
            Web Engineer / Full Stack Developer
          </p>
        </div>

        {/* 管理画面へのリンク */}
        <Link
          href="/login"
          className="text-sm text-gray-400 hover:text-sky-400 underline"
        >
          Admin Login
        </Link>
      </header>

      {/* --- プロフィールセクション--- */}
      <ProfileView />

      {/* --- Projects セクション --- */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          🌎 Featured Projects
        </h2>
        <ProjectList />
      </section>

      {/* --- Skills セクション --- */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          🚀 Skills
        </h2>
        <SkillList />
      </section>
    </main>
  );
}
