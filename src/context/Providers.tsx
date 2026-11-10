'use client';

import React from 'react';
import { CartProvider } from './CartContext';
import { WishlistProvider } from './WishlistContext';
import { QuickViewProvider } from './QuickViewContext';
import { AuthProvider } from './AuthContext';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <QuickViewProvider>{children}</QuickViewProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
};

