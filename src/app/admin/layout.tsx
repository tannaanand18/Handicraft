'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Sliders,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  LogOut,
  AlertCircle,
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAdmin, loginAsDemoAdmin } = useAuth();

  // If user is not admin, provide 1-click admin login prompt
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#1E1512] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#34251F] border border-[#B4975A] p-8 text-center text-[#FAF8F5] shadow-2xl">
          <div className="w-14 h-14 rounded-full bg-[#B4975A]/20 flex items-center justify-center mx-auto text-[#B4975A] mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#D9C7AA] font-mono block mb-1">
            Protected Atelier Route
          </span>
          <h2 className="font-serif text-2xl text-[#FAF8F5]">
            Curator & Admin Portal
          </h2>
          <p className="text-xs text-[#EDE5D9]/70 mt-2 leading-relaxed">
            This dashboard manages real-time products, orders, inventory, pricing, coupons, and content for Shreeji Handicraft.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={loginAsDemoAdmin}
              className="w-full bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors shadow-lg"
            >
              Sign In as Store Curator (1-Click Demo)
            </button>
            <Link
              href="/"
              className="block text-xs text-[#D9C7AA]/70 hover:text-[#FAF8F5] pt-2"
            >
              ← Return to Public Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview Analytics', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Inventory', href: '/admin/products', icon: Package },
    { label: 'Orders & Fulfillment', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Promotional Coupons', href: '/admin/coupons', icon: Tag },
    { label: 'Banners & Content', href: '/admin/banners', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-[#1E1512] text-[#FAF8F5] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#2A1E1A] border-r border-[#34251F] flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-[#34251F]">
            <Link href="/admin" className="block">
              <span className="font-serif text-lg tracking-[0.18em] uppercase text-[#FAF8F5] block font-semibold">
                SHREEJI CURATOR
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#B4975A] font-mono">
                ADMIN CONSOLE
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors ${
                    isActive
                      ? 'bg-[#B4975A] text-[#1E1512] font-semibold shadow'
                      : 'text-[#EDE5D9]/70 hover:text-[#FAF8F5] hover:bg-[#34251F]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#34251F] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-[#D9C7AA] hover:text-[#FAF8F5] p-2 hover:bg-[#34251F] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Store</span>
            </span>
            <span className="text-[10px] uppercase font-mono text-[#B4975A]">ONLINE</span>
          </Link>

          <div className="p-2.5 bg-[#1E1512] border border-[#34251F] text-[11px] text-[#EDE5D9]/70 flex items-center justify-between">
            <div>
              <span className="block font-medium text-[#FAF8F5]">{user?.name}</span>
              <span className="text-[9px] text-[#B4975A]">Super Curator</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#1E1512] min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

