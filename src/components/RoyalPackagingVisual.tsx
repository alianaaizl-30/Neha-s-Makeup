import React from 'react';
import { Product, Shade } from '../types/product';

interface RoyalPackagingVisualProps {
  product: Product;
  selectedShade?: Shade;
  className?: string;
  showLabel?: boolean;
}

export const RoyalPackagingVisual: React.FC<RoyalPackagingVisualProps> = ({
  product,
  selectedShade,
  className = '',
  showLabel = true,
}) => {
  // If product has a custom high-res photography asset, use it with fallback
  if (product.packagingImage) {
    return (
      <div className={`relative overflow-hidden rounded-lg bg-[#FAF9F5] ${className}`}>
        <img
          src={product.packagingImage}
          alt={`${product.name} with branded NEHA'S MAKEUP dark royal packaging`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {/* Signature Packaging Badge */}
        {showLabel && (
          <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 bg-[#121C33]/90 backdrop-blur-xs text-white rounded text-[10px] font-medium flex items-center justify-between border border-[#23345B]">
            <span className="font-serif tracking-[0.16em] uppercase text-[#F7E7CE] truncate">
              NEHA'S MAKEUP
            </span>
            <span className="text-[#C9A96E] font-sans text-[9px] uppercase tracking-wider shrink-0 ml-1">
              Royal Packaging
            </span>
          </div>
        )}
      </div>
    );
  }

  // Refined luxury dark royal packaging mockup box fallback
  return (
    <div
      className={`relative w-full h-full min-h-[220px] rounded-lg bg-gradient-to-br from-[#121C33] via-[#16223D] to-[#0E1629] p-4 flex flex-col justify-between text-white border border-[#23345B] shadow-inner group-hover:border-[#C9A96E]/50 transition-all ${className}`}
    >
      {/* Top Foil Seal */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A96E] font-medium">
          Maison de Beauté
        </span>
        <div className="w-2 h-2 rounded-full bg-[#C9A96E]/80 shadow-[0_0_8px_rgba(201,169,110,0.6)]" />
      </div>

      {/* Center Brand Identity: NEHA'S MAKEUP */}
      <div className="my-auto text-center px-2 py-4">
        <div className="inline-block border-y border-[#C9A96E]/30 py-2 px-3 mb-2">
          <h4 className="font-serif text-lg sm:text-xl font-bold tracking-[0.22em] uppercase text-[#F9F6EE] drop-shadow-sm">
            NEHA'S MAKEUP
          </h4>
        </div>
        <p className="text-[11px] uppercase tracking-wider text-slate-300 font-light max-w-[200px] mx-auto truncate">
          {product.subcategory}
        </p>
        {selectedShade && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#0A101E] border border-[#23345B] text-[10px] text-slate-200">
            <span
              className="w-2.5 h-2.5 rounded-full border border-white/40 shrink-0"
              style={{ backgroundColor: selectedShade.hex }}
            />
            <span className="truncate max-w-[120px]">{selectedShade.name}</span>
          </div>
        )}
      </div>

      {/* Bottom Packaging Details */}
      <div className="pt-2 border-t border-[#23345B]/60 flex items-center justify-between text-[10px] text-slate-400">
        <span className="tracking-widest uppercase">Dark Royal Edition</span>
        <span className="text-[#C9A96E] font-mono">{product.volumeOrWeight || 'Luxury Formula'}</span>
      </div>
    </div>
  );
};
