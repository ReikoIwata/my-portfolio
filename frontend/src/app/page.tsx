import SkillList from "@/components/SkillList";
import ProjectList from "@/components/ProjectList";
import Link from "next/link";

export default function Home() {
  // 後からAPI取得に変更
  const profile = {
    fullName: "岩田 怜子",
    title: "Web Engineer / Full Stack Developer",
    bio: "職業訓練校でのチーム開発を通じて、技術の基礎から実践までを丁寧に学んでまいりました💻開発をする上で大切にしているのは「粘り強く調べ、一歩ずつ丁寧に進めること」です📚現在、就職活動中です。",
  };

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
      <section className="mb-16 text-gray-600 leading-relaxed max-w-3xl">
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-bold text-gray-800">{profile.fullName}</span>{" "}
            のポートフォリオをご覧いただきありがとうございます。
          </p>
          <p>
            私は現在、
            <span className="text-gray-800 font-medium">{profile.title}</span>
            として活動しております。
          </p>
          <p className="whitespace-pre-wrap pt-2 border-l-2 border-gray-200 pl-4 italic">
            {profile.bio}
          </p>
        </div>
      </section>

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
