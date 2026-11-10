'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { Product } from '@/types';
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  X,
  Search,
  Check,
  Sparkles,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    description: '',
    story: '',
    price: 4500,
    originalPrice: 5500,
    category: CATEGORIES[0].name,
    artisanProvenance: 'Rajasthan, India',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=800&auto=format&fit=crop',
  });

  const filtered = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm('Are you certain you wish to retire this heirloom from the catalogue?')) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      subtitle: '',
      description: '',
      story: '',
      price: 4500,
      originalPrice: 5500,
      category: CATEGORIES[0].name,
      artisanProvenance: 'Rajasthan, India',
      stock: 8,
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=800&auto=format&fit=crop',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      subtitle: p.subtitle,
      description: p.description,
      story: p.story,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      category: p.category,
      artisanProvenance: p.artisanProvenance,
      stock: p.stock,
      image: p.images[0],
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProductList((prev) =>
        prev.map((item) =>
          item.id === editingProduct.id
            ? {
                ...item,
                name: formData.name,
                subtitle: formData.subtitle,
                description: formData.description,
                story: formData.story,
                price: Number(formData.price),
                originalPrice: Number(formData.originalPrice),
                category: formData.category,
                artisanProvenance: formData.artisanProvenance,
                stock: Number(formData.stock),
                images: [formData.image, ...item.images.slice(1)],
              }
            : item
        )
      );
    } else {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const newProduct: Product = {
        id: `sh-custom-${Date.now()}`,
        slug,
        name: formData.name,
        subtitle: formData.subtitle,
        description: formData.description,
        story: formData.story,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        category: formData.category,
        categoryId: formData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tags: ['New Masterwork'],
        images: [formData.image],
        dimensions: 'Custom Specifications',
        weight: '2.0 kg',
        material: 'Handcrafted Heritage Material',
        artisanProvenance: formData.artisanProvenance,
        stock: Number(formData.stock),
        rating: 5.0,
        reviewCount: 1,
        isFeatured: true,
        specifications: [
          { label: 'Craft Origin', value: formData.artisanProvenance },
          { label: 'Technique', value: 'Traditional Handcraft' },
        ],
      };
      setProductList((prev) => [newProduct, ...prev]);
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="p-6 sm:p-10 space-y-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#34251F] pb-6">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B4975A] font-mono block">
            Catalogue Ledger
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
            Product & Inventory Management
          </h1>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] text-xs uppercase tracking-wider font-semibold transition-colors shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Commission New Heirloom</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="flex items-center gap-4 bg-[#2A1E1A] p-4 border border-[#34251F]">
        <Search className="w-4 h-4 text-[#D9C7AA]/60" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by title, category, or medium..."
          className="bg-transparent text-xs text-[#FAF8F5] placeholder:text-[#EDE5D9]/40 focus:outline-none w-full"
        />
        <span className="text-xs text-[#D9C7AA]/60 font-mono shrink-0">
          {filtered.length} products
        </span>
      </div>

      {/* Products Table */}
      <div className="bg-[#2A1E1A] border border-[#34251F] overflow-x-auto">
        <table className="w-full text-left text-xs text-[#EDE5D9]/80">
          <thead className="bg-[#1E1512] text-[#D9C7AA] uppercase tracking-wider text-[10px] border-b border-[#34251F]">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Title & Provenance</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price / MRP</th>
              <th className="py-3 px-4">Inventory</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#34251F]">
            {filtered.map((prod) => (
              <tr key={prod.id} className="hover:bg-[#34251F]/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="w-12 h-14 bg-[#1E1512] border border-[#34251F] overflow-hidden">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-serif font-semibold text-sm text-[#FAF8F5] block">
                    {prod.name}
                  </span>
                  <span className="text-[11px] text-[#B4975A] font-mono">
                    {prod.artisanProvenance}
                  </span>
                </td>
                <td className="py-3 px-4">{prod.category}</td>
                <td className="py-3 px-4 font-mono font-semibold text-[#FAF8F5]">
                  ₹{prod.price.toLocaleString('en-IN')}
                  {prod.originalPrice && (
                    <span className="text-[11px] text-[#EDE5D9]/40 line-through ml-2 font-normal">
                      ₹{prod.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-semibold ${
                      prod.stock <= 4 ? 'bg-red-900/60 text-red-200' : 'bg-[#34251F] text-[#FAF8F5]'
                    }`}
                  >
                    {prod.stock} units
                  </span>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="p-1.5 bg-[#34251F] text-[#D9C7AA] hover:text-[#FAF8F5] hover:bg-[#B4975A] hover:text-[#1E1512] transition-colors"
                    title="Edit Product"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(prod.id)}
                    className="p-1.5 bg-[#34251F] text-red-400 hover:bg-red-700 hover:text-white transition-colors"
                    title="Retire Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative w-full max-w-2xl bg-[#2A1E1A] border border-[#B4975A] p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#34251F] pb-4 mb-6">
              <h3 className="font-serif text-xl font-semibold text-[#FAF8F5]">
                {editingProduct ? 'Edit Masterwork Details' : 'Add New Handcrafted Heirloom'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#D9C7AA] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                  Subtitle / Brief Tagline
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                    Artisan Provenance Region *
                  </label>
                  <input
                    type="text"
                    value={formData.artisanProvenance}
                    onChange={(e) =>
                      setFormData({ ...formData, artisanProvenance: e.target.value })
                    }
                    className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                    Price (₹ INR) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] font-mono focus:border-[#B4975A] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                    Original Price (MRP)
                  </label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, originalPrice: Number(e.target.value) })
                    }
                    className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] font-mono focus:border-[#B4975A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                    Inventory Units *
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] font-mono focus:border-[#B4975A] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                  Primary Image URL
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] font-mono focus:border-[#B4975A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider text-[#D9C7AA] mb-1 font-semibold">
                  Heritage Story & Craft Process
                </label>
                <textarea
                  rows={3}
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  className="w-full bg-[#1E1512] border border-[#34251F] px-3 py-2 text-[#FAF8F5] focus:border-[#B4975A] focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#34251F]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#34251F] text-[#D9C7AA] hover:bg-[#34251F]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B4975A] hover:bg-[#A85D42] text-[#FAF8F5] uppercase font-semibold tracking-wider"
                >
                  Save Masterwork
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

