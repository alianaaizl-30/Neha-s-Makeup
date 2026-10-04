import React from 'react';
import { CategoryType } from '../types/product';
import foundationImg from '../assets/images/product_foundation_royal_box_1790355941419.jpg';
import paletteImg from '../assets/images/product_palette_royal_box_1790355955091.jpg';
import lipstickImg from '../assets/images/product_lipstick_royal_box_1790355967036.jpg';
import brushSetImg from '../assets/images/product_brush_set_royal_box_1790355978933.jpg';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectCategory: (category: CategoryType | 'New' | 'Bestsellers') => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  const categoryCards: {
    title: string;
    description: string;
    categoryKey: CategoryType | 'New' | 'Bestsellers';
    image: string;
    itemCount: string;
  }[] = [
    {
      title: 'Face',
      description: 'Luminous bases, silk concealers & velvet contour powders',
      categoryKey: 'Face',
      image: foundationImg,
      itemCount: '10 Formulations',
    },
    {
      title: 'Eyes',
      description: 'The Royal Archive palettes, lift mascaras & precision felt liners',
      categoryKey: 'Eyes',
      image: paletteImg,
      itemCount: '6 Formulations',
    },
    {
      title: 'Lips',
      description: 'Cushion satin bullets, peptide high-gloss glazes & contour liners',
      categoryKey: 'Lips',
      image: lipstickImg,
      itemCount: '5 Formulations',
    },
    {
      title: 'Brushes & Sets',
      description: 'Handcrafted vegan silk bristles & weighted royal navy handles',
      categoryKey: 'Brushes',
      image: brushSetImg,
      itemCount: '5 Essentials',
    },
    {
      title: 'Precision Tools',
      description: 'Cloud blenders, gilded lash curlers & vanity accessories',
      categoryKey: 'Tools' as any,
      image: brushSetImg,
      itemCount: '4 Tools',
    },
    {
      title: 'Best Sellers',
      description: 'Our most-coveted award-winning formulations and staples',
      categoryKey: 'Bestsellers',
      image: foundationImg,
      itemCount: 'Top Rated',
    },
  ];

  return (
    <section id="categories-section" className="py-14 sm:py-20 bg-white border-y border-[#E8E4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#736858] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Explore The Range</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#121C33]">
              SHOP BY CATEGORY
            </h2>
            <p className="text-sm text-[#5B606B] mt-1.5 max-w-xl">
              Delve into expertly formulated makeup segments curated for seamless application and
              effortless daily wear.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((card) => (
            <div
              key={card.title}
              onClick={() => onSelectCategory(card.categoryKey)}
              className="group relative rounded-xl overflow-hidden bg-[#FAF9F5] border border-[#E8E4DC] hover:border-[#121C33]/40 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-lg flex flex-col justify-between"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-[#ECE8DF]">
                <img
                  src={card.image}
                  alt={`${card.title} makeup collection in dark royal packaging`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121C33]/85 via-[#121C33]/20 to-transparent" />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[10px] font-semibold tracking-wider uppercase text-[#121C33]">
                  {card.itemCount}
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {card.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between bg-white">
                <p className="text-xs text-[#525763] line-clamp-1 pr-3">
                  {card.description}
                </p>
                <div className="w-8 h-8 rounded-full bg-[#FAF9F5] border border-[#E2DED5] flex items-center justify-center text-[#121C33] group-hover:bg-[#121C33] group-hover:text-white group-hover:border-[#121C33] transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
