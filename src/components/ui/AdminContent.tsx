"use client";

import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, LayoutDashboard, Settings, ShoppingBag, Users } from 'lucide-react';
import { motion } from 'motion/react';
import usePublicProducts from '@/src/hooks/usePublicProducts';

export default function Admin() {
  const { products: apiProducts, loading, error } = usePublicProducts();
  const [products, setProducts] = useState(apiProducts);
  const [activeTab, setActiveTab] = useState('inventory');

  useEffect(() => {
    setProducts(apiProducts);
  }, [apiProducts]);

  return (
    <main className="pt-20 min-h-screen bg-surface-container-low transition-colors">
      <div className="max-w-[1440px] mx-auto flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-surface border-r border-primary/10 p-8 flex flex-col gap-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold">A</div>
            <div>
              <p className="font-mono text-[10px] opacity-50 uppercase">ADMIN PANEL</p>
              <p className="text-sm font-bold truncate">Amaechina Ikechukwu</p>
            </div>
          </div>

          <nav className="flex flex-col gap-4">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-4 px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all ${activeTab === 'dashboard' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high'}`}
            >
              <LayoutDashboard size={16} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('inventory')}
              className={`flex items-center gap-4 px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all ${activeTab === 'inventory' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high'}`}
            >
              <ShoppingBag size={16} /> Inventory
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-4 px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all ${activeTab === 'orders' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high'}`}
            >
              <Users size={16} /> Customers
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-4 px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all ${activeTab === 'settings' ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high'}`}
            >
              <Settings size={16} /> Settings
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-12">
          {activeTab === 'inventory' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h1 className="text-4xl uppercase mb-2">Inventory Management</h1>
                  <p className="text-on-surface-variant text-sm">Update products, prices, and inventory details.</p>
                </div>
                <button className="bg-secondary text-white px-8 py-4 font-mono text-[10px] tracking-widest uppercase flex items-center gap-3 hover:opacity-90 transition-opacity">
                  <Plus size={16} /> Add New Entry
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-8 mb-12">
                <div className="bg-surface p-8 border border-primary/5">
                  <p className="font-mono text-[10px] opacity-40 uppercase mb-2">Total Value</p>
                  <p className="text-3xl font-display">₦14,250,000</p>
                </div>
                <div className="bg-surface p-8 border border-primary/5">
                  <p className="font-mono text-[10px] opacity-40 uppercase mb-2">Active SKUs</p>
                  <p className="text-3xl font-display">{products.length}</p>
                </div>
                <div className="bg-surface p-8 border border-primary/5">
                  <p className="font-mono text-[10px] opacity-40 uppercase mb-2">Out of Stock</p>
                  <p className="text-3xl font-display">02</p>
                </div>
              </div>

              {/* Product Table */}
              <div className="bg-surface border border-primary/5">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-primary/10 font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                      <th className="p-6">Product</th>
                      <th className="p-6">Category</th>
                      <th className="p-6">Price</th>
                      <th className="p-6">Stock</th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={5} className="p-6 text-on-surface-variant font-medium">
                          Loading products...
                        </td>
                      </tr>
                    )}
                    {!loading && error && (
                      <tr>
                        <td colSpan={5} className="p-6 text-on-surface-variant font-medium">
                          {error}
                        </td>
                      </tr>
                    )}
                    {!loading && !error && products.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-6 text-on-surface-variant font-medium">
                          No products available.
                        </td>
                      </tr>
                    )}
                    {!loading && !error && products.map((p) => (
                      <tr key={p.id} className="border-b border-primary/5 hover:bg-surface-container-low transition-colors">
                        <td className="p-6 flex items-center gap-4">
                          <img src={p.image} className="w-12 h-12 object-cover border border-primary/5" alt={p.name} />
                          <span className="font-bold text-sm uppercase">{p.name}</span>
                        </td>
                        <td className="p-6">
                          <span className="font-mono text-[10px] px-2 py-1 bg-surface-container-high rounded-sm uppercase tracking-tighter">{p.category}</span>
                        </td>
                        <td className="p-6 font-mono text-sm">
                          ₦{p.price.toLocaleString()}
                        </td>
                        <td className="p-6">
                          <div className="w-24 h-2 bg-surface-container-high rounded-full overflow-hidden">
                            <div className="h-full bg-secondary" style={{ width: p.quantityAvailable ? `${Math.min(p.quantityAvailable * 10, 100)}%` : '0%' }}></div>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-4 text-on-surface-variant">
                            <button className="hover:text-primary transition-colors"><Edit size={16} /></button>
                            <button className="hover:text-secondary transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center">
              <div className="max-w-md">
                <h1 className="text-4xl uppercase mb-6">Analytics Dashboard</h1>
                <p className="text-on-surface-variant mb-12">"Tracking your maritime success through data and tradition."</p>
                <div className="aspect-[16/9] w-full bg-surface-container border border-primary/5 flex items-center justify-center mb-8">
                  <p className="font-mono text-[10px] opacity-30 uppercase">Interactive Chart Loading...</p>
                </div>
                <p className="text-xs text-on-surface-variant opacity-60">Revenue up 14% this harvest season.</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
