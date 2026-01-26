import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "FastAPI + Next.js Portfolio Site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${inter.className} bg-[#f8f5f0] text-[#3f4238] antialiased selection:bg-[#cb997e]/20`}
      >
        <AuthProvider>{children}</AuthProvider>

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#fdfbf9",
              color: "#3f4238",
              border: "2px solid #e9e4db",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: "600",
            },
            success: {
              iconTheme: {
                primary: "#6b705c",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#a47148",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
