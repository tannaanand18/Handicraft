'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Order, ShippingAddress } from '@/types';

interface AuthContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, role?: 'customer' | 'admin') => void;
  loginAsDemoCustomer: () => void;
  loginAsDemoAdmin: () => void;
  logout: () => void;
  addOrder: (order: Order) => void;
  updateUserAddress: (address: ShippingAddress) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_CUSTOMER: User = {
  id: 'usr-roy-01',
  name: 'Devendra Singhania',
  email: 'patron@heritagecrafts.in',
  phone: '+91 98200 12345',
  role: 'customer',
  createdAt: '2026-01-15',
  addresses: [
    {
      fullName: 'Devendra Singhania',
      email: 'patron@heritagecrafts.in',
      phone: '+91 98200 12345',
      street: '42, Altamount Road, Malabar Hill',
      apartment: 'Penthouse 14B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400026',
      country: 'India',
    },
  ],
};

const DEMO_ADMIN: User = {
  id: 'usr-admin-01',
  name: 'Shreeji Curator Admin',
  email: 'curator@shreejihandicraft.com',
  phone: '+91 98111 22334',
  role: 'admin',
  createdAt: '2025-11-01',
};

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-88392',
    orderNumber: 'SH-88392',
    createdAt: '2026-11-08T14:32:00Z',
    status: 'Shipped',
    paymentStatus: 'Paid',
    paymentMethod: 'Razorpay',
    subtotal: 6850,
    discount: 685,
    shippingFee: 0,
    total: 6165,
    couponCode: 'HERITAGE10',
    trackingNumber: 'DELHIVERY-99283741',
    courierName: 'Delhivery Luxury Express',
    estimatedDelivery: 'November 14, 2026',
    shippingAddress: {
      fullName: 'Devendra Singhania',
      email: 'patron@heritagecrafts.in',
      phone: '+91 98200 12345',
      street: '42, Altamount Road, Malabar Hill',
      apartment: 'Penthouse 14B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400026',
      country: 'India',
    },
    items: [
      {
        productId: 'sh-001',
        productName: 'Mayur Royal Brass Urli with Bell Accents',
        productImage: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=600&auto=format&fit=crop',
        price: 6850,
        quantity: 1,
        selectedVariant: 'Antique Vintage Brass',
      },
    ],
  },
  {
    id: 'ord-88210',
    orderNumber: 'SH-88210',
    createdAt: '2026-10-24T10:15:00Z',
    status: 'Delivered',
    paymentStatus: 'Paid',
    paymentMethod: 'Razorpay',
    subtotal: 4950,
    discount: 0,
    shippingFee: 0,
    total: 4950,
    trackingNumber: 'BLUEDART-8812903',
    courierName: 'Blue Dart Surface',
    estimatedDelivery: 'October 28, 2026',
    shippingAddress: {
      fullName: 'Devendra Singhania',
      email: 'patron@heritagecrafts.in',
      phone: '+91 98200 12345',
      street: '42, Altamount Road, Malabar Hill',
      apartment: 'Penthouse 14B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400026',
      country: 'India',
    },
    items: [
      {
        productId: 'sh-006',
        productName: 'Agra Pietra Dura Marble Inlay Keepsake Box',
        productImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
        price: 4950,
        quantity: 1,
        selectedVariant: 'Octagonal Imperial',
      },
    ],
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(INITIAL_DEMO_ORDERS);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedUser = localStorage.getItem('shreeji_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedOrders = localStorage.getItem('shreeji_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      if (user) {
        localStorage.setItem('shreeji_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('shreeji_user');
      }
    } catch {
      // ignore
    }
  }, [user, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem('shreeji_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders, isMounted]);

  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
  };

  const loginAsDemoCustomer = () => {
    setUser(DEMO_CUSTOMER);
  };

  const loginAsDemoAdmin = () => {
    setUser(DEMO_ADMIN);
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateUserAddress = (address: ShippingAddress) => {
    if (!user) return;
    const existing = user.addresses || [];
    setUser({
      ...user,
      addresses: [address, ...existing.filter((a) => a.street !== address.street)],
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        login,
        loginAsDemoCustomer,
        loginAsDemoAdmin,
        logout,
        addOrder,
        updateUserAddress,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

