"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/password-reset/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.detail || errorData.email?.[0] || "Wyst¹pi³ b³¹d. Spróbuj ponownie.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
    } catch (err) {
      console.error("Password reset error:", err);
      setError("Wyst¹pi³ b³¹d po³¹czenia z serwerem");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <nav className="mb-6">
              <Link href="/login" className="text-[#8CA9FF] hover:text-[#AAC4F5] transition-colors text-sm">
                ‹ Powrót do logowania
              </Link>
            </nav>

            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-3 text-gray-800">Email wys³any! ??</h1>
              <p className="text-gray-600 mb-6">
                Jeœli konto z tym adresem email istnieje, wys³aliœmy instrukcje resetowania has³a na adres <strong>{email}</strong>
              </p>

              <div className="bg-[#AAC4F5]/20 border border-[#AAC4F5] rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-700">
                  ?? SprawdŸ folder spam, jeœli nie widzisz wiadomoœci w skrzynce odbiorczej.
                </p>
              </div>

              <Link
                href="/login"
                className="inline-block bg-[#8CA9FF] hover:bg-[#AAC4F5] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
              >
                Powrót do logowania
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <nav className="mb-6">
            <Link href="/login" className="text-[#8CA9FF] hover:text-[#AAC4F5] transition-colors text-sm">
              ‹ Powrót do logowania
            </Link>
          </nav>

          <h1 className="text-3xl font-bold mb-2 text-gray-800">Zapomnia³eœ has³a? ??</h1>
          <p className="text-gray-600 mb-6">
            Nie martw siê! Wpisz swój adres email, a wyœlemy Ci link do resetowania has³a.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres email
              </label>
              <input
                type="email"
                placeholder="twoj@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent text-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="mt-2 text-xs text-gray-500">
                WprowadŸ adres email, którego u¿y³eœ podczas rejestracji.
              </p>
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
              {loading ? 'Wysy³anie...' : 'Wyœlij link resetuj¹cy'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Pamiêtasz has³o? <Link href="/login" className="text-[#8CA9FF] hover:text-[#AAC4F5] font-semibold">Zaloguj siê</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
