'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import VendorSidebar from '@/app/components/VendorSidebar';
import { getUserProfile } from '@/services/api';

interface VendorLayoutProps {
  children: ReactNode;
}

export default function VendorLayout({ children }: VendorLayoutProps) {
  const router = useRouter();
  const [isVendor, setIsVendor] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkVendorAccess() {
      try {
        const token = localStorage.getItem('access');
        
        if (!token) {
          router.push('/login?redirect=/vendor/dashboard');
          return;
        }

        const userData = await getUserProfile(token);
        
        if (userData.is_vendor) {
          setIsVendor(true);
        } else {
          // Not a vendor - redirect
          router.push('/?error=vendor-access-denied');
        }
      } catch (error) {
        console.error('Vendor access check failed:', error);
        router.push('/login?redirect=/vendor/dashboard');
      } finally {
        setLoading(false);
      }
    }

    checkVendorAccess();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#8ca9FF] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Sprawdzanie uprawnień...</p>
        </div>
      </div>
    );
  }

  if (!isVendor) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#F0F4FF] via-white to-[#FFF8DE]">
      <div className="flex">
        <VendorSidebar />
        <main className="flex-1 lg:ml-0">
          <div className="container mx-auto px-4 py-8 lg:py-12 mt-16 lg:mt-0">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
