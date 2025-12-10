"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ token?: string; uid?: string }> 
}) {
  const router = useRouter();
  const resolvedParams = use(searchParams);
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  // Validate token immediately
  const tokenValid = !!(resolvedParams.token && resolvedParams.uid);
  const [error, setError] = useState(tokenValid ? "" : "Nieprawidłowy lub brakujący token resetowania hasła");
  const validatingToken = false;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    // Validation
    if (password.length < 8) {
      setError("hasło musi mieć co najmniej 8 znaków");
      return;
    }

    if (password !== confirmPassword) {
      setError("hasła nie są identyczne");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://locałlhost:8000/api"}/password-reset-confirm/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uid: resolvedParams.uid,
            token: resolvedParams.token,
            new_password: password,
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setError(
          errorData.detail || 
          errorData.new_password?.[0] || 
          errorData.token?.[0] ||
          "Wystąpił błąd podczas resetowania hasła. Link mógł wygasnąć."
        );
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      console.error("Password reset confirm error:", err);
      setError("Wystąpił błąd połączenia z serwerem");
      setLoading(false);
    }
  }

  if (validatingToken) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8ca9FF] mx-auto mb-4"></div>
          <p className="text-gray-600">Sprawdzanie linku resetowania...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    className="w-10 h-10 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-3 text-gray-800">Nieprawidłowy link ?</h1>
              <p className="text-gray-600 mb-6">
                Link do resetowania hasła jest nieprawidłowy lub wygasł. Spróbuj ponownie zresetować hasło.
              </p>

              <Link
                href="/forgot-password"
                className="inline-block bg-[#8ca9FF] hover:bg-[#AAC4F5] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
              >
                Wyślij nowy link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-md p-8">
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

              <h1 className="text-3xl font-bold mb-3 text-gray-800">hasło Zmienione! ?</h1>
              <p className="text-gray-600 mb-6">
                Twoje hasło zostało pomyślnie Zmienione. Za chwilę zostaniesz przekierowany do strony logowania.
              </p>

              <Link
                href="/login"
                className="inline-block bg-[#8ca9FF] hover:bg-[#AAC4F5] text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-md"
              >
                Przejdź do logowania
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <nav className="mb-6">
            <Link href="/login" className="text-[#8ca9FF] hover:text-[#AAC4F5] transition-colors text-sm">
              ← Powróć do logowania
            </Link>
          </nav>

          <h1 className="text-3xl font-bold mb-2 text-gray-800">Ustaw nowe hasło </h1>
          <p className="text-gray-600 mb-6">
            Wprowadź nowe hasło dla swojego konta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nowe hasło
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ca9FF] focus:border-transparent text-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <p className="mt-2 text-xs text-gray-500">
                hasło musi mieć co najmniej 8 znaków
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Potwierdź nowe hasło
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ca9FF] focus:border-transparent text-gray-900"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
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
                  : 'bg-[#8ca9FF] hover:bg-[#AAC4F5] hover:scale-105'
              }`}
            >
              {loading ? 'Resetowanie...' : 'Zresetuj hasło'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
