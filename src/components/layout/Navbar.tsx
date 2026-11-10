'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { user, isAdmin } = useAuth();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCollectionsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    {
      label: 'Collections',
      href: '/shop',
      hasDropdown: true,
    },
    { label: 'Our Story', href: '/story' },
    { label: 'Contact', href: '/contact' },
  ];

  const openSearch = () => {
    window.dispatchEvent(new CustomEvent('open-search-modal'));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          isScrolled || !isHome
            ? 'bg-[#F8F5EF]/95 backdrop-blur-md shadow-sm border-b border-[#D9C7AA]/40 py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#34251F] hover:text-[#B4975A] transition-colors focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={openSearch}
                className="p-2 text-[#34251F] hover:text-[#B4975A] transition-colors focus:outline-none"
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href && !link.hasDropdown;
                if (link.hasDropdown) {
                  return (
                    <div
                      key={link.label}
                      className="relative group py-2"
                      onMouseEnter={() => setCollectionsOpen(true)}
                      onMouseLeave={() => setCollectionsOpen(false)}
                    >
                      <button
                        className={`text-xs uppercase tracking-[0.18em] font-medium flex items-center gap-1.5 transition-colors ${
                          pathname.startsWith('/shop') ? 'text-[#A85D42]' : 'text-[#34251F] hover:text-[#B4975A]'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 duration-200" />
                      </button>

                      {/* Collections Dropdown Mega Menu */}
                      <div
                        className={`absolute left-0 top-full pt-2 w-[480px] transition-all duration-200 origin-top-left ${
                          collectionsOpen
                            ? 'opacity-100 scale-100 pointer-events-auto'
                            : 'opacity-0 scale-95 pointer-events-none'
                        }`}
                      >
                        <div className="bg-[#FAF8F5] border border-[#D9C7AA]/50 shadow-xl p-6 rounded-none">
                          <div className="text-[10px] uppercase tracking-[0.25em] text-[#A85D42] font-semibold mb-4 border-b border-[#D9C7AA]/30 pb-2">
                            Curated Craft Portfolios
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {CATEGORIES.slice(0, 6).map((cat) => (
                              <Link
                                key={cat.id}
                                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                                className="group/item flex flex-col p-2 hover:bg-[#F8F5EF] transition-colors"
                              >
                                <span className="text-sm font-serif font-semibold text-[#34251F] group-hover/item:text-[#A85D42] transition-colors">
                                  {cat.name}
                                </span>
                                <span className="text-[11px] text-[#34251F]/60 line-clamp-1">
                                  {cat.tagline}
                                </span>
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-3 border-t border-[#D9C7AA]/30 flex justify-between items-center text-xs">
                            <span className="text-[#34251F]/60">100% Certified Provenance</span>
                            <Link
                              href="/shop"
                              className="text-[#B4975A] hover:text-[#8C4730] font-medium tracking-wide"
                            >
                              View All Categories →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors relative py-1 ${
                      isActive ? 'text-[#A85D42]' : 'text-[#34251F] hover:text-[#B4975A]'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#A85D42]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Central Brand Identity / Logo */}
            <div className="text-center">
              <Link href="/" className="inline-block group">
                <span className="block font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.2em] font-medium uppercase text-[#34251F] group-hover:text-[#A85D42] transition-colors duration-300">
                  SHREEJI
                </span>
                <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.45em] text-[#B4975A] font-sans font-medium -mt-1 group-hover:tracking-[0.55em] transition-all duration-300">
                  HANDICRAFT
                </span>
              </Link>
            </div>

            {/* Action Utilities (Search, Account, Wishlist, Bag) */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Desktop Search Trigger */}
              <button
                type="button"
                onClick={openSearch}
                className="hidden lg:flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#34251F] hover:text-[#B4975A] transition-colors p-1"
                aria-label="Search Collection"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px]">Search</span>
              </button>

              {/* Account / Admin Portal */}
              <Link
                href={isAdmin ? '/admin' : '/account'}
                className="text-[#34251F] hover:text-[#B4975A] transition-colors p-1 relative flex items-center"
                title={user ? (isAdmin ? 'Admin Console' : `Account: ${user.name}`) : 'Account / Login'}
              >
                <UserIcon className="w-4.5 h-4.5" />
                {isAdmin && (
                  <span className="absolute -top-1 -right-1 bg-[#A85D42] text-white text-[8px] font-bold px-1 rounded-full">
                    ADM
                  </span>
                )}
              </Link>

              {/* Wishlist Icon with Count */}
              <Link
                href="/account?tab=wishlist"
                className="text-[#34251F] hover:text-[#B4975A] transition-colors p-1 relative"
                aria-label="Saved Wishlist"
              >
                <Heart className="w-4.5 h-4.5" />
                {totalWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#B4975A] text-[#FAF8F5] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Trigger with Animated Pill */}
              <button
                type="button"
                onClick={openCart}
                className="flex items-center gap-2 bg-[#34251F] text-[#FAF8F5] hover:bg-[#1E1512] transition-colors px-3 py-1.5 rounded-none text-xs tracking-wider"
                aria-label={`Shopping Bag (${totalItems} items)`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="font-semibold text-xs">{totalItems}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF8F5] shadow-2xl flex flex-col z-50 border-r border-[#D9C7AA]">
            {/* Header */}
            <div className="p-5 flex items-center justify-between border-b border-[#D9C7AA]/40">
              <div>
                <span className="font-serif text-xl tracking-[0.15em] font-medium uppercase text-[#34251F]">
                  SHREEJI
                </span>
                <span className="block text-[8px] uppercase tracking-[0.35em] text-[#B4975A] font-sans">
                  HANDICRAFT
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-[#34251F] hover:text-[#A85D42] focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
              <Link
                href="/"
                className="block text-sm uppercase tracking-[0.16em] font-medium text-[#34251F] hover:text-[#A85D42]"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="block text-sm uppercase tracking-[0.16em] font-medium text-[#34251F] hover:text-[#A85D42]"
              >
                Explore All Creations
              </Link>

              {/* Mobile Collections Sublist */}
              <div className="pt-2 border-t border-[#D9C7AA]/30">
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#A85D42] font-semibold mb-3">
                  Collections
                </div>
                <div className="space-y-2.5 pl-2">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${encodeURIComponent(cat.name)}`}
                      className="block text-xs text-[#34251F]/80 hover:text-[#A85D42] py-0.5"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#D9C7AA]/30 space-y-3">
                <Link
                  href="/story"
                  className="block text-sm uppercase tracking-[0.16em] font-medium text-[#34251F] hover:text-[#A85D42]"
                >
                  Our Heritage & Story
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm uppercase tracking-[0.16em] font-medium text-[#34251F] hover:text-[#A85D42]"
                >
                  Contact & Concierge
                </Link>
                <Link
                  href="/account"
                  className="block text-sm uppercase tracking-[0.16em] font-medium text-[#34251F] hover:text-[#A85D42]"
                >
                  My Account / Orders
                </Link>
                <Link
                  href="/admin"
                  className="block text-xs uppercase tracking-[0.16em] font-semibold text-[#B4975A] hover:text-[#34251F] flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin Dashboard
                </Link>
              </div>
            </div>

            {/* Mobile Footer */}
            <div className="p-5 border-t border-[#D9C7AA]/40 bg-[#F8F5EF] text-center">
              <p className="text-[10px] tracking-widest uppercase text-[#34251F]/70">
                Where Tradition Meets Timeless Art
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

