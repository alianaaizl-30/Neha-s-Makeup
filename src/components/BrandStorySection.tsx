import React from 'react';
import paletteImg from '../assets/images/product_palette_royal_box_1790355955091.jpg';
import { Sparkles, Heart, Shield, Award } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] border-b border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-[#E0DCD2] bg-[#EAE6DE]">
              <img
                src={paletteImg}
                alt="NEHA'S MAKEUP dark royal packaging craftsmanship"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121C33]/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white p-3 bg-[#121C33]/80 backdrop-blur-xs rounded-xl border border-[#23345B]">
                <p className="font-serif text-sm font-bold text-[#F7E7CE]">
                  The Signature Dark Royal Architecture
                </p>
                <p className="text-[11px] text-slate-300">
                  Every formulation is encased in our bespoke soft-touch dark royal blue casing with embossed gold typography.
                </p>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#736858] mb-3">
              <span className="w-6 h-[1.5px] bg-[#C9A96E]" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#121C33] leading-tight mb-5">
              Modern Elegance. Everyday Simplicity.
            </h2>

            <div className="space-y-4 text-sm text-[#525763] leading-relaxed mb-8">
              <p>
                <strong>NEHA'S MAKEUP</strong> was founded on a singular principle: luxury beauty should never be complicated. We engineer versatile, skin-first formulas that enhance natural features with effortless ease.
              </p>
              <p>
                From the velvety texture of our serum foundations to the seamless blend of our eyeshadows, each product is crafted without harmful additives, 100% cruelty-free, and packaged in our signature dark royal blue aesthetic.
              </p>
              <p>
                Built to serve everyday beauty enthusiasts across the United States and the United Kingdom, our collection celebrates self-expression with quiet confidence.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#EAE6DE]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#121C33] text-[#C9A96E] flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#121C33]">Clean Formulas</h4>
                  <p className="text-[11px] text-[#6C727F]">No parabens, phthalates, or harsh toxins.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#121C33] text-[#C9A96E] flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-[#121C33]">100% Cruelty-Free</h4>
                  <p className="text-[11px] text-[#6C727F]">Vegan formulations never tested on animals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
