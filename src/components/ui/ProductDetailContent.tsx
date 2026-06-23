"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import {
  Truck,
  Utensils,
  Globe,
  Clock3,
  ShoppingBag,
  Check,
} from "lucide-react";
import { motion } from "motion/react";
import usePublicProducts from "@/src/hooks/usePublicProducts";
import { useCart } from "@/src/contexts/CartContext";
import { useToast } from "@/src/contexts/ToastContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useRouter();
  const { products, loading, error } = usePublicProducts();
  const { addToCart } = useCart();
  const { notify } = useToast();
  const product = products.find((p) => p.id === id);

  // EXACT SIZE OPTIONS FROM YOUR IMAGE
  const SIZE_OPTIONS = [
    "Small Only",
    "Medium Only",
    "Large Only",
    "Extra Large Only",
  ];

  // PRICE MAP FOR EACH SIZE
  const SIZE_PRICE_MAP = {
    "Small Only": 2500,
    "Medium Only": 3800,
    "Large Only": 5500,
    "Extra Large Only": 7200,
  };

  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  // Update price whenever size or quantity changes
  useEffect(() => {
    if (!product) return;

    // Get price from SIZE_PRICE_MAP or fallback to product.price
    const basePrice = SIZE_PRICE_MAP[selectedSize] || product.price || 0;
    setCurrentPrice(basePrice * quantity);
  }, [selectedSize, quantity, product]);

  // Hook to handle redirecting when not found, declared unconditionally
  useEffect(() => {
    if (!loading && !error && !product) {
      navigate.push('/market');
    }
  }, [product, loading, error, navigate]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, selectedSize, quantity);
    setAddedToCart(true);
    notify(
      `${quantity} x ${product.name} (${selectedSize}) added to cart`,
      "success",
    );
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handlePurchase = () => {
    if (!product) return;
    addToCart(product, selectedSize, quantity);
    navigate.push("/checkout"); // Redirect to checkout page
  };


  const handleQuantityChange = (delta) => {
    if (quantity + delta < 1) return;
    setQuantity((prev) => prev + delta);
  };

  if (loading) {
    return (
      <main className="max-w-[1440px] mx-auto px-6 md:px-16 py-24">
        <p className="text-on-surface-variant font-medium">
          Loading product...
        </p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-[1440px] mx-auto px-6 md:px-16 py-24">
        <p className="text-on-surface-variant font-medium">{error}</p>
      </main>
    );
  }

  if (!product) return null;

  return (
    <main>
      {/* Product Detail Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Product Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-surface-container overflow-hidden group border border-primary/5 rounded-2xl shadow-sm self-start md:sticky md:top-28"
          >
            <img
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={product.image}
              alt={product.name}
            />
          </motion.div>

          {/* Right: Product Info, Size, Price, Add to Cart */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <span className="text-[10px] px-3 py-1 bg-secondary text-on-secondary uppercase tracking-widest font-black rounded-full">
                {product.tag}
              </span>
            </motion.div>

            <div>
              <h1 className="text-3xl md:text-4xl text-primary leading-tight uppercase font-extrabold tracking-tighter">
                {product.name}
              </h1>
              <p className="text-base text-on-surface-variant mt-3 leading-relaxed font-sans">
                {product.details || product.description}
              </p>
            </div>

            {/* Action Controls Row (Size + Quantity) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Size Selection Dropdown */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-on-surface-variant mb-1 font-medium">
                  Choose Size
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-3 border border-outline/20 rounded-lg bg-surface font-medium text-on-surface focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                >
                  {SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity Stepper */}
              <div className="flex flex-col gap-1">
                <label className="text-sm text-on-surface-variant mb-1 font-medium">
                  Quantity
                </label>
                <div className="flex items-center border border-outline/20 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-surface-container-hover transition-colors text-xl font-bold text-on-surface-variant"
                  >
                    &minus;
                  </button>
                  <div className="flex-1 h-12 flex items-center justify-center border-x border-outline/20 font-medium text-on-surface">
                    {quantity}
                  </div>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-surface-container-hover transition-colors text-xl font-bold text-on-surface-variant"
                  >
                    &#43;
                  </button>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div>
              <span className="text-4xl text-primary font-black">
                ₦{currentPrice.toLocaleString()}
              </span>
              {SIZE_PRICE_MAP[selectedSize] && (
                <span className="ml-3 text-sm text-on-surface-variant opacity-60">
                  (₦{SIZE_PRICE_MAP[selectedSize].toLocaleString()} per unit)
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 font-bold text-sm tracking-widest shadow-lg transition-all active:scale-[0.98] cursor-pointer uppercase rounded-xl flex items-center justify-center gap-2 border border-outline/20 ${
                  addedToCart
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-white text-secondary hover:bg-surface-container"
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check size={18} /> Added
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handlePurchase}
                className="w-full py-4 font-bold text-sm tracking-widest shadow-lg transition-all active:scale-[0.98] cursor-pointer uppercase rounded-xl flex items-center justify-center bg-secondary text-on-secondary hover:bg-secondary/90"
              >
                Purchase
              </button>
            </div>

            {/* Shipping */}
            <div className="flex items-center gap-3 text-on-surface-variant">
              <Truck size={20} className="text-secondary" />
              <span className="text-sm font-semibold">
                Standard shipping available across Nigeria
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-tertiary/5 py-24 relative overflow-hidden transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
          <div className="md:col-span-1">
            <h2 className="text-4xl text-primary mb-8 uppercase">
              Hygienic Processing
            </h2>
            <p className="text-base text-on-surface-variant leading-relaxed opacity-80">
              Our process is built on quality and hygiene. We utilize
              traditional fires and modern processing techniques, ensuring every
              product is preserved perfectly while maintaining its natural
              nutritional value.
            </p>
          </div>
          <div className="md:col-span-2 relative h-[500px]">
            <img
              className="w-full h-full object-cover grayscale brightness-75"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbOtpXuBAgA-BBXQjOe3zxBf1aOCy7ANR3ObQWPA-j_400KyZh7R5Gx4VsUxe_OG8ujzTeREvUuQO4JfBBmKomaRmGjS4bL4S72JSSsyzrB8LTAxfIv55T4lZ0An2oB4fkKdt5coXbYajDyXLMURBwOnBWMEj4_E0qvBp4WdGCdNyN29hPZezQb-F5DDLyKT1POxxQxkAxxJ8dCnjce8wwuBDjvQcIHCNYIMfOgmMFKR_29OTScnO-5cosimUEZVE3O6HMyP4vXXA"
              alt="Process"
            />
            <div className="absolute inset-0 bg-secondary/10 smoke-gradient pointer-events-none"></div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute bottom-8 left-8 right-8 md:right-auto md:w-3/5 bg-surface p-8 border border-primary/10 shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] text-secondary uppercase tracking-widest font-bold">
                  STRICT QUALITY CONTROL
                </span>
                <h4 className="text-2xl text-primary uppercase">
                  Modern Processing
                </h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Our advanced processing standards allow the deep smoky notes
                  to bond with the natural oils of the fish, creating a profile
                  that is both robust and healthy.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 bg-surface-container p-12 flex flex-col justify-between min-h-[300px]">
            <Utensils size={48} className="text-primary mb-12 opacity-20" />
            <div>
              <h3 className="text-3xl text-primary mb-4 uppercase">
                Culinary Profile
              </h3>
              <p className="text-base text-on-surface-variant leading-relaxed">
                Intense umami with notes of sweet salt, toasted nuts, and deep
                smoke. Best served rehydrated in light broths or thinly shaved
                over warm sourdough.
              </p>
            </div>
          </div>
          <div className="bg-surface border border-primary/5 p-12 flex flex-col justify-between">
            <Globe size={24} className="text-secondary mb-8" />
            <div>
              <h3 className="font-mono text-[10px] text-primary mb-4 uppercase tracking-widest opacity-40">
                ORIGIN
              </h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">
                {product.origin || "Nigerian Coastal Regions"}
              </p>
            </div>
          </div>
          <div className="bg-tertiary text-on-tertiary p-12 flex flex-col justify-between">
            <Clock3 size={24} className="text-on-tertiary opacity-40 mb-8" />
            <div>
              <h3 className="font-mono text-[10px] text-on-tertiary mb-4 uppercase tracking-widest opacity-40">
                SHELF LIFE
              </h3>
              <p className="text-sm opacity-80 leading-relaxed font-medium">
                {product.shelfLife || "24 Months"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
