'use client';

import { useEffect, useState } from 'react';
import VendorLayout from '@/app/components/VendorLayout';
import { getVendorAnalytics } from '@/services/api';

interface AnalyticsData {
  total_sales: number;
  total_revenue: number;
  total_orders: number;
  top_products: Array<{
    id: number;
    title: string;
    sales_count: number;
    revenue: number;
  }>;
  sales_by_month: Array<{
    month: string;
    sales: number;
    revenue: number;
  }>;
  sales_by_format: {
    physical?: number;
    ebook?: number;
    both?: number;
  };
}

export default function VendorAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const token = localStorage.getItem('access');
        if (!token) throw new Error('No token');

        const data = await getVendorAnalytics(token);
        setAnalytics(data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        setError('Nie uda�o si� pobra� danych analitycznych');
      } finally {
        setLoading(false);
      }
    }

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <VendorLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#8CA9FF] mx-auto mb-4"></div>
          <p className="text-gray-600">�adowanie analityki...</p>
        </div>
      </VendorLayout>
    );
  }

  if (error || !analytics) {
    return (
      <VendorLayout>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-8 rounded-xl text-center">
          <div className="text-6xl mb-4">??</div>
          <h2 className="text-2xl font-bold mb-2">Brak danych analitycznych</h2>
          <p className="mb-4">
            {error || 'Dane analityczne b�d� dost�pne po pierwszych sprzeda�ach.'}
          </p>
          <p className="text-sm">
            System automatycznie rozpocznie zbieranie danych po pierwszym zam�wieniu.
          </p>
        </div>
      </VendorLayout>
    );
  }

  const maxSales = Math.max(...(analytics.sales_by_month?.map(m => m.sales) || [1]));
  const maxRevenue = Math.max(...(analytics.sales_by_month?.map(m => m.revenue) || [1]));

  return (
    <VendorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Analityka ??
          </h1>
          <p className="text-gray-600">
            Analizuj sprzeda� i wydajno�� swoich produkt�w
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#8CA9FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Ca�kowita sprzeda�</p>
                <p className="text-4xl font-bold text-gray-800">{analytics.total_sales || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Sprzedanych produkt�w</p>
              </div>
              <div className="w-16 h-16 bg-[#8CA9FF]/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">??</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Przych�d</p>
                <p className="text-4xl font-bold text-gray-800">
                  {(analytics.total_revenue || 0).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Z�otych</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">??</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#AAC4F5]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Zam�wienia</p>
                <p className="text-4xl font-bold text-gray-800">{analytics.total_orders || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Ca�kowita liczba</p>
              </div>
              <div className="w-16 h-16 bg-[#AAC4F5]/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">??</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sales by Month Chart */}
        {analytics.sales_by_month && analytics.sales_by_month.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sprzeda� w czasie</h2>
            
            {/* Sales Chart */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Liczba sprzedanych produkt�w</h3>
              <div className="space-y-3">
                {analytics.sales_by_month.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-gray-600 font-medium">
                      {item.month}
                    </div>
                    <div className="flex-1">
                      <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-linear-to-r from-[#8CA9FF] to-[#AAC4F5] flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${(item.sales / maxSales) * 100}%` }}
                        >
                          <span className="text-white font-semibold text-sm">
                            {item.sales}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Przych�d (z�)</h3>
              <div className="space-y-3">
                {analytics.sales_by_month.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-24 text-sm text-gray-600 font-medium">
                      {item.month}
                    </div>
                    <div className="flex-1">
                      <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-linear-to-r from-green-400 to-green-600 flex items-center justify-end pr-3 transition-all duration-500"
                          style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                        >
                          <span className="text-white font-semibold text-sm">
                            {item.revenue.toFixed(2)} z�
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          {analytics.top_products && analytics.top_products.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Najpopularniejsze produkty ??
              </h2>
              <div className="space-y-3">
                {analytics.top_products.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#8CA9FF] transition-colors"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-brrom-[#8CA9FF] to-[#AAC4F5] text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">
                        {product.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {product.sales_count} sprzedanych
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {product.revenue.toFixed(2)} z�
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sales by Format */}
          {analytics.sales_by_format && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sprzeda� wed�ug formatu ??
              </h2>
              <div className="space-y-4">
                {analytics.sales_by_format.physical !== undefined && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium flex items-center gap-2">
                        <span>??</span> Ksi��ki fizyczne
                      </span>
                      <span className="font-bold text-[#8CA9FF]">
                        {analytics.sales_by_format.physical}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#8CA9FF] rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (analytics.sales_by_format.physical /
                              ((analytics.sales_by_format.physical || 0) +
                                (analytics.sales_by_format.ebook || 0) +
                                (analytics.sales_by_format.both || 0))) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {analytics.sales_by_format.ebook !== undefined && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium flex items-center gap-2">
                        <span>??</span> E-booki
                      </span>
                      <span className="font-bold text-[#AAC4F5]">
                        {analytics.sales_by_format.ebook}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#AAC4F5] rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (analytics.sales_by_format.ebook /
                              ((analytics.sales_by_format.physical || 0) +
                                (analytics.sales_by_format.ebook || 0) +
                                (analytics.sales_by_format.both || 0))) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {analytics.sales_by_format.both !== undefined && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium flex items-center gap-2">
                        <span>?</span> Oba formaty
                      </span>
                      <span className="font-bold text-green-600">
                        {analytics.sales_by_format.both}
                      </span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (analytics.sales_by_format.both /
                              ((analytics.sales_by_format.physical || 0) +
                                (analytics.sales_by_format.ebook || 0) +
                                (analytics.sales_by_format.both || 0))) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-[#F0F4FF] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>�rednia warto�� zam�wienia:</strong>{' '}
                  {analytics.total_orders > 0
                    ? (analytics.total_revenue / analytics.total_orders).toFixed(2)
                    : '0.00'}{' '}
                  z�
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </VendorLayout>
  );
}
