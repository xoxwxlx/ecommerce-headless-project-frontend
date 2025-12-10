'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getVendorsList, registerVendorUser } from '@/services/api';

interface Vendor {
  id: number;
  company_name: string;
}

export default function VendorRegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    vendorId: '',
    companyPassword: ''
  });

  useEffect(() => {
    async function fetchVendors() {
      try {
        const data = await getVendorsList();
        setVendors(data);
      } catch (err) {
        console.error('Failed to fetch vendors:', err);
        setError('Nie udało się pobrać listy firm');
      } finally {
        setLoadingVendors(false);
      }
    }
    fetchVendors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Hasła nie są identyczne!');
      return;
    }

    if (formData.password.length < 8) {
      setError('Hasło musi mieć co najmniej 8 znaków!');
      return;
    }

    if (!formData.email || !formData.firstName || !formData.lastName || !formData.vendorId || !formData.companyPassword) {
      setError('Wypełnij wszystkie wymagane pola!');
      return;
    }

    setLoading(true);

    try {
      const data = await registerVendorUser({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        vendor_id: parseInt(formData.vendorId),
        company_password: formData.companyPassword
      });

      // Save tokens
      if (data.access) {
        localStorage.setItem('access', data.access);
      }
      if (data.refresh) {
        localStorage.setItem('refresh', data.refresh);
      }
      
      // Redirect to vendor dashboard
      router.push('/vendor/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Wystąpił błąd podczas rejestracji. Spróbuj ponownie.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold text-[#8CA9FF] hover:text-[#AAC4F5] transition-colors">
              Księgarnia
            </h1>
          </Link>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Rejestracja dostawcy
          </h2>
          <p className="text-gray-600">
            Dołącz do naszej platformy jako dostawca
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Account Info */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Dane osobowe</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Imię *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                      placeholder="Jan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nazwisko *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                      placeholder="Kowalski"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                    placeholder="jan@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Hasło *
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Potwierdź hasło *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Selection */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Firma dostawcy</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Wybierz firmę *
                  </label>
                  {loadingVendors ? (
                    <div className="w-full px-4 py-2.5 border border-gray-300 rounded-xl bg-gray-50 text-gray-500">
                      Ładowanie firm...
                    </div>
                  ) : (
                    <select
                      name="vendorId"
                      value={formData.vendorId}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                    >
                      <option value="">-- Wybierz firmę --</option>
                      {vendors.map((vendor) => (
                        <option key={vendor.id} value={vendor.id}>
                          {vendor.company_name}
                        </option>
                      ))}
                    </select>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Wybierz firmę, do której chcesz dołączyć jako dostawca
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hasło firmy *
                  </label>
                  <input
                    type="password"
                    name="companyPassword"
                    value={formData.companyPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Wprowadź hasło dostępu do wybranej firmy (otrzymane od administratora firmy)
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm text-blue-800 font-medium">Informacja</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Jeśli nie znasz hasła firmy, skontaktuj się z administratorem wybranej firmy aby otrzymać hasło dostępu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || loadingVendors}
              className="w-full bg-[#8CA9FF] hover:bg-[#AAC4F5] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Rejestracja...' : 'Zarejestruj się jako dostawca'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Masz już konto?{' '}
              <Link href="/login" className="text-[#8CA9FF] hover:text-[#AAC4F5] font-semibold">
                Zaloguj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
