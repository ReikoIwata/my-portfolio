import LoginButton from "@/components/LoginButton";
import SkillForm from "@/components/SkillForm";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">✨My Portfolio 管理者ページ✨</h1>
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 inline-block">
        <p className="mb-4 text-gray-600">
          管理者はここからログインしてください
        </p>
        <LoginButton />
      </div>
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">新規スキル登録</h2>
        <SkillForm />
      </section>
    </main>
  );
}
