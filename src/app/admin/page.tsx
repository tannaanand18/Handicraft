'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { PRODUCTS } from '@/data/products';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { orders } = useAuth();

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const totalProductsCount = PRODUCTS.length;
  const lowStockProducts = PRODUCTS.filter((p) => p.stock <= 5);

  return (
    <div className="p-6 sm:p-10 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#34251F] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B4975A] font-mono block">
            Executive Ledger
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
            Atelier Performance & Analytics
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            + Add New Heirloom
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#2A1E1A] border border-[#34251F] shadow">
          <div className="flex justify-between items-start text-[#B4975A] mb-3">
            <span className="text-[10px] uppercase tracking-wider font-mono">Gross Sales</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#FAF8F5]">
            ₹{totalSales.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-green-400 mt-2 block">
            +18.4% compared to last cycle
          </span>
        </div>

        <div className="p-6 bg-[#2A1E1A] border border-[#34251F] shadow">
          <div className="flex justify-between items-start text-[#B4975A] mb-3">
            <span className="text-[10px] uppercase tracking-wider font-mono">Total Orders</span>
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#FAF8F5]">
            {totalOrdersCount}
          </div>
          <span className="text-[11px] text-[#D9C7AA]/70 mt-2 block">
            100% dispatched with insured crating
          </span>
        </div>

        <div className="p-6 bg-[#2A1E1A] border border-[#34251F] shadow">
          <div className="flex justify-between items-start text-[#B4975A] mb-3">
            <span className="text-[10px] uppercase tracking-wider font-mono">Active Products</span>
            <Package className="w-5 h-5" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#FAF8F5]">
            {totalProductsCount}
          </div>
          <span className="text-[11px] text-[#D9C7AA]/70 mt-2 block">
            Across 8 curated craft mediums
          </span>
        </div>

        <div className="p-6 bg-[#2A1E1A] border border-[#34251F] shadow">
          <div className="flex justify-between items-start text-[#A85D42] mb-3">
            <span className="text-[10px] uppercase tracking-wider font-mono">Low Stock Warning</span>
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#FAF8F5]">
            {lowStockProducts.length} Pieces
          </div>
          <span className="text-[11px] text-amber-400 mt-2 block">
            Limited artisanal batches remaining
          </span>
        </div>
      </div>

      {/* Revenue Analytics Chart Mock */}
      <div className="p-6 bg-[#2A1E1A] border border-[#34251F] space-y-4">
        <div className="flex justify-between items-center border-b border-[#34251F] pb-3">
          <h3 className="font-serif text-lg font-semibold text-[#FAF8F5]">
            Quarterly Revenue Trajectory (₹ INR)
          </h3>
          <span className="text-xs font-mono text-[#B4975A]">Q4 2026 Fiscal Year</span>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
          {[
            { month: 'Jul', val: 45, rev: '₹4.5L' },
            { month: 'Aug', val: 58, rev: '₹5.8L' },
            { month: 'Sep', val: 72, rev: '₹7.2L' },
            { month: 'Oct', val: 92, rev: '₹9.2L' },
            { month: 'Nov', val: 86, rev: '₹8.6L' },
            { month: 'Dec', val: 100, rev: '₹10.5L' },
          ].map((bar) => (
            <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-mono text-[#D9C7AA]/80 opacity-0 group-hover:opacity-100 transition-opacity">
                {bar.rev}
              </span>
              <div className="w-full bg-[#34251F] h-36 relative flex items-end">
                <div
                  className="w-full bg-gradient-to-t from-[#A85D42] to-[#B4975A] transition-all duration-500 group-hover:brightness-110"
                  style={{ height: `${bar.val}%` }}
                />
              </div>
              <span className="text-[11px] font-mono text-[#D9C7AA]/70">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="p-6 bg-[#2A1E1A] border border-[#34251F] space-y-4">
        <div className="flex justify-between items-center border-b border-[#34251F] pb-3">
          <h3 className="font-serif text-lg font-semibold text-[#FAF8F5]">
            Recent Client Orders
          </h3>
          <Link
            href="/admin/orders"
            className="text-xs font-mono text-[#B4975A] hover:underline"
          >
            Manage All Orders →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#EDE5D9]/80">
            <thead className="bg-[#1E1512] text-[#D9C7AA] uppercase tracking-wider text-[10px] border-b border-[#34251F]">
              <tr>
                <th className="py-3 px-4">Order Ref</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Dest. City</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Fulfillment Status</th>
                <th className="py-3 px-4">Tracking Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#34251F]">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-[#34251F]/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#FAF8F5]">
                    #{order.orderNumber}
                  </td>
                  <td className="py-3 px-4">{order.shippingAddress.fullName}</td>
                  <td className="py-3 px-4">{order.shippingAddress.city}</td>
                  <td className="py-3 px-4 font-mono font-semibold text-[#FAF8F5]">
                    ₹{order.total.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 text-[10px] bg-[#34251F] text-[#D9C7AA] border border-[#4A372E]">
                      {order.paymentMethod} ({order.paymentStatus})
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-green-900/60 text-green-300'
                          : order.status === 'Shipped'
                          ? 'bg-blue-900/60 text-blue-300'
                          : 'bg-amber-900/60 text-amber-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#D9C7AA]">
                    {order.trackingNumber || 'Pending Label'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

