'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import VendorLayout from '@/app/components/VendorLayout';
import { getVendorProduct, updateVendorProduct, uploadProductImage } from '@/services/api';

interface Product {
  id: number;
  title: string;
  author: string;
  price: number;
  format: string;
  genre?: string;
  description?: string;
  pages?: number;
  publication_year?: number;
  image?: string;
  cover?: string;
  image_url?: string;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Editable fields
  const [description, setDescription] = useState('');
  const [pages, setPages] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const token = localStorage.getItem('access');
        if (!token) throw new Error('No token');

        const data = await getVendorProduct(resolvedParams.id, token);
        setProduct(data);
        setDescription(data.description || '');
        setPages(data.pages?.toString() || '');
        setPublicationYear(data.publication_year?.toString() || '');
        setImagePreview(data.image_url || data.image || data.cover || '');
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Nie udało się pobrać produktu');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [resolvedParams.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setSaving(true);

    try {
      const token = localStorage.getItem('access');
      if (!token) throw new Error('No token');

      let imageUrl = product?.image_url || product?.image || product?.cover;

      // Upload image if changed
      if (imageFile) {
        setUploadingImage(true);
        try {
          const uploadResult = await uploadProductImage(imageFile, token);
          imageUrl = uploadResult.image_url || uploadResult.url;
        } catch (err) {
          console.error('Failed to upload image:', err);
          setError('Nie udało się przesłać zdjęcia. Kontynuowanie bez zmiany zdjęcia...');
        } finally {
          setUploadingImage(false);
        }
      }

      // Update product
      const updateData: {
        description?: string;
        pages?: number;
        publication_year?: number;
        image?: string;
      } = {};

      if (description !== product?.description) {
        updateData.description = description;
      }
      if (pages && parseInt(pages) !== product?.pages) {
        updateData.pages = parseInt(pages);
      }
      if (publicationYear && parseInt(publicationYear) !== product?.publication_year) {
        updateData.publication_year = parseInt(publicationYear);
      }
      if (imageUrl && imageUrl !== (product?.image_url || product?.image || product?.cover)) {
        updateData.image = imageUrl;
      }

      await updateVendorProduct(resolvedParams.id, updateData, token);
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/vendor/products');
      }, 2000);
    } catch (err) {
      console.error('Failed to update product:', err);
      setError('Nie udało się zaktualizować produktu');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <VendorLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#8CA9FF] mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie produktu...</p>
        </div>
      </VendorLayout>
    );
  }

  if (!product) {
    return (
      <VendorLayout>
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
          Nie znaleziono produktu
        </div>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/vendor/products"
            className="inline-flex items-center gap-2 text-[#8CA9FF] hover:text-[#AAC4F5] font-medium mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Powrót do listy produktów
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Edycja produktu ✏️
          </h1>
          <p className="text-gray-600">
            Zaktualizuj informacje o produkcie
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl">
            ✓ Produkt został pomyślnie zaktualizowany! Przekierowywanie...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Non-editable Information */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Informacje podstawowe (zablokowane)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tytuł
                </label>
                <input
                  type="text"
                  value={product.title}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Autor
                </label>
                <input
                  type="text"
                  value={product.author}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cena
                </label>
                <input
                  type="text"
                  value={`${product.price} zł`}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format
                </label>
                <input
                  type="text"
                  value={product.format === 'ebook' ? 'E-book' : product.format === 'both' ? 'Oba formaty' : 'Książka'}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Edytowalne informacje
            </h2>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opis produktu
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                placeholder="Dodaj szczegółowy opis produktu..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent resize-none"
              />
              <p className="mt-1 text-xs text-gray-500">
                Opisz najważniejsze cechy i zalety produktu
              </p>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Okładka produktu
              </label>
              
              {imagePreview && (
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Aktualna okładka:</p>
                  <div className="relative w-40 h-56 bg-gray-100 rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Product cover"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#8CA9FF] hover:bg-[#F0F4FF] transition-colors">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">
                      {imageFile ? imageFile.name : 'Wybierz nowe zdjęcie'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Wspierane formaty: JPG, PNG, WEBP (maks. 5MB)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Liczba stron
                </label>
                <input
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  min="1"
                  placeholder="np. 350"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                />
              </div>

              {/* Publication Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rok wydania
                </label>
                <input
                  type="number"
                  value={publicationYear}
                  onChange={(e) => setPublicationYear(e.target.value)}
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="np. 2023"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8CA9FF] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={saving || uploadingImage}
              className={`flex-1 font-bold py-4 px-8 rounded-full text-white transition-all duration-200 shadow-md ${
                saving || uploadingImage
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#8CA9FF] hover:bg-[#AAC4F5] hover:scale-105'
              }`}
            >
              {uploadingImage 
                ? '📤 Przesyłanie zdjęcia...' 
                : saving 
                ? '💾 Zapisywanie...' 
                : '✓ Zapisz zmiany'}
            </button>

            <Link
              href="/vendor/products"
              className="flex-1 font-bold py-4 px-8 rounded-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-200 shadow-md"
            >
              Anuluj
            </Link>
          </div>
        </form>
      </div>
    </VendorLayout>
  );
}
