import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { Truck, Utensils, Globe, Clock3 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedWeight, setSelectedWeight] = useState(product?.weightOptions?.[0] || '1KG');

  if (!product) return <Navigate to="/market" />;

  return (
    <main>
      
      {/* Product Detail Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left: Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-surface-container overflow-hidden group border border-primary/5 rounded-2xl shadow-sm"
            >
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={product.image} 
                alt={product.name}
              />
            </motion.div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="aspect-square bg-surface-container overflow-hidden border border-primary/5 rounded-lg">
                  <img 
                    className="w-full h-full object-cover hover:opacity-80 transition-all cursor-pointer duration-500 rounded-lg" 
                    src={product.image} 
                    alt={`Preview ${i}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-start">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-4"
            >
              <span className="text-[10px] px-3 py-1 bg-secondary text-on-secondary uppercase tracking-widest font-black rounded-full">
                {product.tag}
              </span>
            </motion.div>
            <h1 className="text-3xl md:text-5xl text-primary mb-4 leading-tight uppercase font-extrabold tracking-tighter">
              {product.name}
            </h1>
            <div className="mb-6">
              <span className="text-3xl text-primary font-black">
                ₦{product.price.toLocaleString()}
              </span>
            </div>
            <p className="text-base md:text-lg text-on-surface-variant mb-10 max-w-prose leading-relaxed font-sans">
              {product.details || product.description}
            </p>

            {/* Weight Selection */}
            {product.weightOptions && (
              <div className="mb-10 p-6 bg-surface-container/30 rounded-xl border border-primary/5">
                <h3 className="text-[10px] text-primary mb-4 uppercase tracking-widest font-black">Select Product Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.weightOptions.map(weight => (
                    <button 
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={`px-6 py-3 border-2 font-bold text-xs tracking-tight transition-all active:scale-95 uppercase rounded-lg ${
                        selectedWeight === weight 
                        ? 'border-primary bg-primary text-on-primary shadow-md' 
                        : 'border-outline/20 text-on-surface-variant hover:border-primary'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="space-y-6">
              <button className="w-full bg-secondary py-5 text-on-secondary font-bold text-sm tracking-widest hover:bg-secondary/90 shadow-lg hover:shadow-secondary/20 transition-all active:scale-[0.98] cursor-pointer uppercase rounded-xl">
                ADD TO CART
              </button>
              <div className="flex items-center gap-3 text-on-surface-variant">
                <Truck size={20} className="text-secondary" />
                <span className="text-sm font-semibold">Standard shipping available across Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smoke Process Section */}
      <section className="bg-tertiary/5 py-24 relative overflow-hidden transition-colors">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
          <div className="md:col-span-1">
            <h2 className="text-4xl text-primary mb-8 uppercase">Hygienic Processing</h2>
            <p className="text-base text-on-surface-variant leading-relaxed opacity-80">
              Our process is built on quality and hygiene. We utilize traditional fires and modern processing techniques, ensuring every product is preserved perfectly while maintaining its natural nutritional value.
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
                <span className="font-mono text-[10px] text-secondary uppercase tracking-widest font-bold">STRICT QUALITY CONTROL</span>
                <h4 className="text-2xl text-primary uppercase">Modern Processing</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Our advanced processing standards allow the deep smoky notes to bond with the natural oils of the fish, creating a profile that is both robust and healthy.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Specs Bento Grid */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-16 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 bg-surface-container p-12 flex flex-col justify-between min-h-[300px]">
            <Utensils size={48} className="text-primary mb-12 opacity-20" />
            <div>
              <h3 className="text-3xl text-primary mb-4 uppercase">Culinary Profile</h3>
              <p className="text-base text-on-surface-variant leading-relaxed">Intense umami with notes of sweet salt, toasted nuts, and deep smoke. Best served rehydrated in light broths or thinly shaved over warm sourdough.</p>
            </div>
          </div>
          <div className="bg-surface border border-primary/5 p-12 flex flex-col justify-between">
            <Globe size={24} className="text-secondary mb-8" />
            <div>
              <h3 className="font-mono text-[10px] text-primary mb-4 uppercase tracking-widest opacity-40">ORIGIN</h3>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed">{product.origin || 'Nigerian Coastal Regions'}</p>
            </div>
          </div>
          <div className="bg-tertiary text-on-tertiary p-12 flex flex-col justify-between">
            <Clock3 size={24} className="text-on-tertiary opacity-40 mb-8" />
            <div>
              <h3 className="font-mono text-[10px] text-on-tertiary mb-4 uppercase tracking-widest opacity-40">SHELF LIFE</h3>
              <p className="text-sm opacity-80 leading-relaxed font-medium">{product.shelfLife || '24 Months'}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
