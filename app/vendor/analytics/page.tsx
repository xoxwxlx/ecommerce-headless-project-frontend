'use client';

import { useEffect, useState } from 'react';
import VendorLayout from '@/app/components/VendorLayout';
import { getVendorAnalytics } from '@/services/api';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const token = localStorage.getItem('access');
        if (!token) throw new Error('No token');

        const data = await getVendorAnalytics(token);
        setAnalytics(data);
      } catch (err) {
        console.error('Failed to fetch analytics:', err);
        setError('Nie udało się pobrać danych analitycznych');
        
        // Set demo data for testing charts
        setAnalytics({
          total_sales: 150,
          total_revenue: 4500.00,
          total_orders: 45,
          top_products: [
            { id: 1, title: 'Harry Potter i Kamień Filozoficzny', sales_count: 25, revenue: 750.00 },
            { id: 2, title: 'Władca Pierścieni', sales_count: 20, revenue: 600.00 },
            { id: 3, title: '1984', sales_count: 18, revenue: 540.00 },
            { id: 4, title: 'Hobbit', sales_count: 15, revenue: 450.00 },
            { id: 5, title: 'Zbrodnia i kara', sales_count: 12, revenue: 360.00 }
          ],
          sales_by_month: [
            { month: 'Sty', sales: 20, revenue: 600.00 },
            { month: 'Lut', sales: 25, revenue: 750.00 },
            { month: 'Mar', sales: 30, revenue: 900.00 },
            { month: 'Kwi', sales: 22, revenue: 660.00 },
            { month: 'Maj', sales: 28, revenue: 840.00 },
            { month: 'Cze', sales: 25, revenue: 750.00 }
          ],
          sales_by_format: {
            physical: 60,
            ebook: 50,
            both: 40
          }
        });
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
          <p className="text-gray-600">Ładowanie analityki...</p>
        </div>
      </VendorLayout>
    );
  }

  if (error && !analytics) {
    return (
      <VendorLayout>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-8 rounded-xl text-center">
          <div className="mb-4 flex justify-center">
            <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Brak danych analitycznych</h2>
          <p className="mb-4">
            Nie udało się pobrać danych analitycznych.
          </p>
          <p className="text-sm">
            System automatycznie rozpocznie zbieranie danych po pierwszym zamówieniu.
          </p>
        </div>
      </VendorLayout>
    );
  }

  if (!analytics) {
    return (
      <VendorLayout>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-8 rounded-xl text-center">
          <div className="mb-4 flex justify-center">
            <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Ładowanie danych...</h2>
          <p className="text-sm">
            Proszę czekać.
          </p>
        </div>
      </VendorLayout>
    );
  }

  return (
    <VendorLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <svg className="w-10 h-10 text-[#8CA9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analityka
          </h1>
          <p className="text-gray-600">
            Analizuj sprzedaż i wydajność swoich produktów
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#8CA9FF]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Całkowita sprzedaż</p>
                <p className="text-4xl font-bold text-gray-800">{analytics.total_sales || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Sprzedanych produktów</p>
              </div>
              <div className="w-16 h-16 bg-[#8CA9FF]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#8CA9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Przychód</p>
                <p className="text-4xl font-bold text-gray-800">
                  {(analytics.total_revenue || 0).toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Złotych</p>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#AAC4F5]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Zamówienia</p>
                <p className="text-4xl font-bold text-gray-800">{analytics.total_orders || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Całkowita liczba</p>
              </div>
              <div className="w-16 h-16 bg-[#AAC4F5]/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-[#AAC4F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Sales by Month Chart */}
        {mounted && analytics.sales_by_month && analytics.sales_by_month.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Sprzedaż w czasie</h2>
            
            {/* Combined Line Chart */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Trend sprzedaży i przychodów</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.sales_by_month}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    yAxisId="left"
                    stroke="#8CA9FF"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Liczba sprzedaży', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
                  />
                  <YAxis 
                    yAxisId="right"
                    orientation="right"
                    stroke="#10b981"
                    style={{ fontSize: '12px' }}
                    label={{ value: 'Przychód (zł)', angle: 90, position: 'insideRight', style: { fontSize: '12px' } }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#8CA9FF" 
                    strokeWidth={3}
                    name="Sprzedaż (szt.)"
                    dot={{ fill: '#8CA9FF', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    name="Przychód (zł)"
                    dot={{ fill: '#10b981', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart for Sales */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Liczba sprzedanych produktów</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.sales_by_month}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value) => [`${value} szt.`, 'Sprzedaż']}
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="#8CA9FF"
                    radius={[8, 8, 0, 0]}
                    name="Sprzedaż"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart for Revenue */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Przychód (zł)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.sales_by_month}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value: number) => [`${value.toFixed(2)} zł`, 'Przychód']}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                    name="Przychód"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          {analytics.top_products && analytics.top_products.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#8CA9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Najpopularniejsze produkty
              </h2>
              
              {/* Bar Chart for Top Products */}
              <ResponsiveContainer width="100%" height={300}>
                <BarChart 
                  data={analytics.top_products.slice(0, 5)} 
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis 
                    dataKey="title" 
                    type="category" 
                    width={150}
                    stroke="#6b7280"
                    style={{ fontSize: '11px' }}
                    tickFormatter={(value) => value.length > 20 ? value.substring(0, 20) + '...' : value}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(value, name) => {
                      if (name === 'Sprzedaż') return [`${value} szt.`, name];
                      return [`${Number(value).toFixed(2)} zł`, name];
                    }}
                  />
                  <Bar dataKey="sales_count" fill="#8CA9FF" name="Sprzedaż" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>

              {/* Product List */}
              <div className="mt-6 space-y-3">
                {analytics.top_products.slice(0, 5).map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#8CA9FF] transition-colors"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-[#8CA9FF] to-[#AAC4F5] text-white font-bold">
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
                        {product.revenue.toFixed(2)} zł
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
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-[#8CA9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                Sprzedaż według formatu
              </h2>
              
              {/* Pie Chart */}
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Książki fizyczne', value: analytics.sales_by_format.physical || 0, color: '#8CA9FF' },
                      { name: 'E-booki', value: analytics.sales_by_format.ebook || 0, color: '#AAC4F5' },
                      { name: 'Oba formaty', value: analytics.sales_by_format.both || 0, color: '#10b981' }
                    ].filter(item => item.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'Książki fizyczne', value: analytics.sales_by_format.physical || 0, color: '#8CA9FF' },
                      { name: 'E-booki', value: analytics.sales_by_format.ebook || 0, color: '#AAC4F5' },
                      { name: 'Oba formaty', value: analytics.sales_by_format.both || 0, color: '#10b981' }
                    ].filter(item => item.value > 0).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Legend with values */}
              <div className="mt-6 space-y-3">
                {analytics.sales_by_format.physical !== undefined && analytics.sales_by_format.physical > 0 && (
                  <div className="flex items-center justify-between p-3 bg-[#8CA9FF]/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#8CA9FF]"></div>
                      <svg className="w-5 h-5 text-[#8CA9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span className="font-medium text-gray-700">Książki fizyczne</span>
                    </div>
                    <span className="font-bold text-[#8CA9FF]">{analytics.sales_by_format.physical}</span>
                  </div>
                )}

                {analytics.sales_by_format.ebook !== undefined && analytics.sales_by_format.ebook > 0 && (
                  <div className="flex items-center justify-between p-3 bg-[#AAC4F5]/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-[#AAC4F5]"></div>
                      <svg className="w-5 h-5 text-[#AAC4F5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium text-gray-700">E-booki</span>
                    </div>
                    <span className="font-bold text-[#AAC4F5]">{analytics.sales_by_format.ebook}</span>
                  </div>
                )}

                {analytics.sales_by_format.both !== undefined && analytics.sales_by_format.both > 0 && (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span className="font-medium text-gray-700">Oba formaty</span>
                    </div>
                    <span className="font-bold text-green-600">{analytics.sales_by_format.both}</span>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-[#F0F4FF] rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Średnia wartość zamówienia:</strong>{' '}
                  {analytics.total_orders > 0
                    ? (analytics.total_revenue / analytics.total_orders).toFixed(2)
                    : '0.00'}{' '}
                  zł
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </VendorLayout>
  );
}
