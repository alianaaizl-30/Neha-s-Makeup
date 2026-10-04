import React, { useState } from 'react';
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';
import { Sparkles, Palette, Check } from 'lucide-react';

interface ShadeDiscoverySectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ShadeDiscoverySection: React.FC<ShadeDiscoverySectionProps> = ({
  products,
  onSelectProduct,
}) => {
  const [selectedTone, setSelectedTone] = useState<'Fair' | 'Light' | 'Medium' | 'Tan' | 'Deep'>('Medium');
  const [selectedUndertone, setSelectedUndertone] = useState<'Neutral' | 'Warm' | 'Cool'>('Warm');

  const skinTones: { tone: 'Fair' | 'Light' | 'Medium' | 'Tan' | 'Deep'; hex: string; desc: string }[] = [
    { tone: 'Fair', hex: '#F7E7CE', desc: 'Porcelain to ivory tones' },
    { tone: 'Light', hex: '#EED6B3', desc: 'Light sand & peach hues' },
    { tone: 'Medium', hex: '#D2AC7F', desc: 'Golden & honey olive' },
    { tone: 'Tan', hex: '#A87A4F', desc: 'Rich amber & warm caramel' },
    { tone: 'Deep', hex: '#673D26', desc: 'Espresso & cacao tones' },
  ];

  // Matched product recommendations based on shade selection
  const matchedProducts = products.filter((p) => {
    if (p.category === 'Face' && p.shades.some((s) => s.name.includes(selectedTone))) {
      return true;
    }
    if (p.category === 'Lips' && p.featured) {
      return true;
    }
    return false;
  }).slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-[#FAF9F5] border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#736858] mb-2">
            <Palette className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span>Interactive Shade Match</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#121C33] mb-3">
            Find Your Signature Match
          </h2>
          <p className="text-sm text-[#5B606B]">
            Select your complexion depth to preview our synchronized formulas across foundation, concealer, blush, and complementary lip hues.
          </p>
        </div>

        {/* Tone Picker Controls */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DC] shadow-xs mb-10">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#121C33] block mb-3">
              1. Select Skin Tone Depth:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {skinTones.map((item) => (
                <button
                  key={item.tone}
                  onClick={() => setSelectedTone(item.tone)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center sm:items-start gap-2 ${
                    selectedTone === item.tone
                      ? 'border-[#121C33] bg-[#FAF9F5] ring-2 ring-[#121C33]/20 shadow-xs'
                      : 'border-[#EAE7E1] hover:border-slate-400 bg-white'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full border shadow-2xs ${
                      selectedTone === item.tone ? 'ring-2 ring-[#121C33] scale-110' : 'border-black/10'
                    }`}
                    style={{ backgroundColor: item.hex }}
                  />
                  <div>
                    <span className="font-serif font-bold text-xs text-[#121C33] block">
                      {item.tone}
                    </span>
                    <span className="text-[10px] text-[#7A808C] hidden sm:block">
                      {item.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#121C33] block mb-3">
              2. Select Undertone:
            </span>
            <div className="flex items-center gap-2">
              {(['Neutral', 'Warm', 'Cool'] as const).map((under) => (
                <button
                  key={under}
                  onClick={() => setSelectedUndertone(under)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                    selectedUndertone === under
                      ? 'bg-[#121C33] text-white shadow-xs'
                      : 'bg-[#FAF9F5] text-slate-700 border border-[#E2DED5] hover:bg-[#F2EEE4]'
                  }`}
                >
                  {under} Undertone
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Formulations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {matchedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
