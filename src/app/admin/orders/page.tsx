'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Order } from '@/types';
import {
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders } = useAuth();
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [search, setSearch] = useState('');

  const handleUpdateStatus = (
    orderId: string,
    newStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
  ) => {
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleUpdateTracking = (orderId: string, trackingNumber: string) => {
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, trackingNumber } : o))
    );
  };

  const filtered = orderList.filter((o) => {
    if (filterStatus !== 'All' && o.status !== filterStatus) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.shippingAddress.fullName.toLowerCase().includes(q) ||
        o.shippingAddress.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="p-6 sm:p-10 space-y-6">
      {/* Title */}
      <div className="border-b border-[#34251F] pb-6">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#B4975A] font-mono block">
          Dispatch & Fulfillment
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
          Client Orders Ledger
        </h1>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-[#2A1E1A] p-4 border border-[#34251F]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#D9C7AA]/50 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, patron, city..."
            className="w-full bg-[#1E1512] border border-[#34251F] pl-9 pr-3 py-2 text-xs text-[#FAF8F5] placeholder:text-[#EDE5D9]/40 focus:outline-none focus:border-[#B4975A]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 transition-colors uppercase ${
                filterStatus === st
                  ? 'bg-[#B4975A] text-[#1E1512] font-bold'
                  : 'bg-[#1E1512] text-[#D9C7AA] hover:bg-[#34251F]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filtered.map((order) => (
          <div
            key={order.id}
            className="bg-[#2A1E1A] border border-[#34251F] p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#34251F] pb-4">
              <div>
                <span className="font-mono font-bold text-sm text-[#FAF8F5]">
                  Order #{order.orderNumber}
                </span>
                <p className="text-xs text-[#D9C7AA]/60 mt-0.5">
                  Placed on {new Date(order.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#D9C7AA]/70 uppercase tracking-wider">
                  Update Status:
                </span>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleUpdateStatus(
                      order.id,
                      e.target.value as 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
                    )
                  }
                  className="bg-[#1E1512] border border-[#B4975A] text-xs px-3 py-1.5 text-[#FAF8F5] focus:outline-none"
                >
                  <option value="Pending">Pending Review</option>
                  <option value="Processing">Processing & Crating</option>
                  <option value="Shipped">Shipped in Transit</option>
                  <option value="Delivered">Delivered Successfully</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Order Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#EDE5D9]/80">
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#B4975A] font-semibold block">
                  Items Purchased
                </span>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span>
                      {item.quantity}x {item.productName}{' '}
                      {item.selectedVariant && `(${item.selectedVariant})`}
                    </span>
                    <span className="font-mono font-semibold text-[#FAF8F5]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#34251F] pt-2 flex justify-between font-bold text-sm text-[#FAF8F5]">
                  <span>Total Amount Paid:</span>
                  <span className="font-mono text-[#B4975A]">
                    ₹{order.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Shipping & Courier Info */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#B4975A] font-semibold block">
                  Shipping & Courier Dossier
                </span>
                <p className="leading-relaxed">
                  <strong>{order.shippingAddress.fullName}</strong> ({order.shippingAddress.phone})
                  <br />
                  {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                  {order.shippingAddress.state} — {order.shippingAddress.pincode}
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[11px] text-[#D9C7AA]/70">Tracking:</span>
                  <input
                    type="text"
                    defaultValue={order.trackingNumber || ''}
                    onBlur={(e) => handleUpdateTracking(order.id, e.target.value)}
                    placeholder="Enter Delhivery / BlueDart ID"
                    className="bg-[#1E1512] border border-[#34251F] px-2 py-1 text-xs text-[#FAF8F5] font-mono focus:border-[#B4975A] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

