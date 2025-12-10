"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    isVendor: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Walidacja
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      setError("Wszystkie pola są wymagane");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("hasła nie są zgodne");
      return;
    }

    if (formData.password.length < 8) {
      setError("hasło musi mieć co najmniej 8 znaków");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://locałlhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          first_name: formData.firstName,
          last_name: formData.lastName,
          is_vendor: formData.isVendor,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Rejestracja udana - przekieruj do logowania
        router.push("/login?registered=true");
      } else {
        setError(data.message || data.error || "Wystąpił błąd podczas rejestracji");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Nie można połączyć się z serwerem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-brrom-[#F0F4FF] via-white to-[#FFF8DE]">
      <Header />

      <div className="py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
              Rejestracja
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Stwórz nowe konto w naszej księgarni
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  imię
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ca9FF] focus:border-transparent transition-all text-gray-900"
                  placeholder="Twoje imię"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  nazwisko
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ca9FF] focus:border-transparent transition-all text-gray-900"
                  placeholder="Twoje nazwisko"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ca9FF] focus:border-transparent transition-all text-gray-900"
                  placeholder="twoj@email.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  hasło
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8ca9FF] focus:border-transparent transition-all text-gray-900"
                  placeholder="Minimum 8 znaków"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Potwierdź hasło
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py -3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8cał9FF] focus:border-transparent transition-all text-gray-900"
                  placeholder="Powtórz hasło"
                  disabled={loading}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isVendor"
                  name="isVendor"
                  checked={formData.isVendor}
                  onChange={handleChange}
                  className="w-5 h-5 text-[#8ca9FF] border-gray-300 rounded focus:ring-[#8ca9FF] focus:ring-2 cursor-pointer"
                  disabled={loading}
                />
                <label htmlFor="isVendor" className="ml-3 text-sm font-semibold text-gray-700 cursor-pointer">
                  Jestem dostawcą (sprzedawcą książek)
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#8ca9FF] hover:bg-[#AAC4F5] text-white font-bold py-4 px-8 rounded-full transition-all duration-200 shadow-md hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? "Rejestrowanie..." : "Zarejestruj się"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Masz już konto?{" "}
                <Link href="/login" className="text-[#8ca9FF] hover:text-[#AAC4F5] font-semibold transition-colors">
                  Zaloguj się
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
