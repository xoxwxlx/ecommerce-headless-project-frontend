"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/token/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.detail || "Nieprawid³owy email lub has³o");
        setLoading(false);
        return;
      }

      const data = await res.json();

      localStorage.setItem("authToken", data.access);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("userEmail", email);

      // Wyœlij custom event ¿eby Header siê zaktualizowa³
      window.dispatchEvent(new Event('auth-change'));

      router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Wyst¹pi³ b³¹d po³¹czenia z serwerem");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <nav className="mb-6">
            <Link href="/" className="text-[#8CA9FF] hover:text-[#AAC4F5] transition-colors text-sm">
              ‹ Powrót do strony g³ównej
            </Link>
          </nav>

          <h1 className="text-3xl font-bold mb-2 text-gray-800">Logowanie ??</h1>
          <p className="text-gray-600 mb-6">Zaloguj siê do swojego konta</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="twoj@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Has³o
                </label>
                <Link href="/forgot-password" className="text-xs text-[#8CA9FF] hover:text-[#AAC4F5] font-medium">
                  Zapomnia³eœ has³a?
                </Link>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-semibold py-3 px-6 rounded-full text-white transition-all duration-200 shadow-md ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#8CA9FF] hover:bg-[#AAC4F5] hover:scale-105'
              }`}
            >
              {loading ? 'Logowanie...' : 'Zaloguj siê'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Nie masz konta? <Link href="/register" className="text-[#8CA9FF] hover:text-[#AAC4F5] font-semibold">Zarejestruj siê</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
