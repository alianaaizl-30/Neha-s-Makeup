import React, { useState, useMemo } from 'react';
import { Product, CategoryType, FinishType, ColorFamily } from '../types/product';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Sparkles, Search } from 'lucide-react';

interface AllProductsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  selectedCategoryFilter?: CategoryType | 'All';
  onCategoryFilterChange?: (cat: CategoryType | 'All') => void;
}

export const AllProductsSection: React.FC<AllProductsSectionProps> = ({
  products,
  onSelectProduct,
  selectedCategoryFilter = 'All',
  onCategoryFilterChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'All'>(selectedCategoryFilter);
  const [activeFinish, setActiveFinish] = useState<FinishType | 'All'>('All');
  const [activeColorFamily, setActiveColorFamily] = useState<ColorFamily | 'All'>('All');
  const [priceSort, setPriceSort] = useState<string>('featured');
  const [searchFilter, setSearchFilter] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Sync category state when parent changes
  React.useEffect(() => {
    setActiveCategory(selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  const handleCategorySelect = (cat: CategoryType | 'All') => {
    setActiveCategory(cat);
    if (onCategoryFilterChange) {
      onCategoryFilterChange(cat);
    }
  };

  const clearAllFilters = () => {
    setActiveCategory('All');
    setActiveFinish('All');
    setActiveColorFamily('All');
    setPriceSort('featured');
    setSearchFilter('');
    if (onCategoryFilterChange) {
      onCategoryFilterChange('All');
    }
  };

  const hasActiveFilters =
    activeCategory !== 'All' ||
    activeFinish !== 'All' ||
    activeColorFamily !== 'All' ||
    searchFilter.trim().length > 0;

  // Filter and sort product collection
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (activeCategory !== 'All' && p.category !== activeCategory) {
          return false;
        }
        // Finish filter
        if (activeFinish !== 'All' && p.finish !== activeFinish) {
          return false;
        }
        // Color family filter
        if (activeColorFamily !== 'All' && p.colorFamily !== activeColorFamily) {
          return false;
        }
        // Search filter
        if (searchFilter.trim()) {
          const q = searchFilter.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchSub = p.subcategory.toLowerCase().includes(q);
          const matchShades = p.shades.some((s) => s.name.toLowerCase().includes(q));
          if (!matchName && !matchCat && !matchSub && !matchShades) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (priceSort === 'price-asc') return a.salePrice - b.salePrice;
        if (priceSort === 'price-desc') return b.salePrice - a.salePrice;
        if (priceSort === 'rating-desc') return b.rating - a.rating;
        if (priceSort === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
        // Default 'featured'
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, activeCategory, activeFinish, activeColorFamily, searchFilter, priceSort]);

  const categories: (CategoryType | 'All')[] = ['All', 'Face', 'Eyes', 'Lips', 'Brushes', 'Tools'];
  const finishes: (FinishType | 'All')[] = ['All', 'Matte', 'Satin', 'Glossy', 'Natural', 'Shimmer'];

  return (
    <section id="shop-all-section" className="py-12 sm:py-16 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Bold, Non-Negotiable ALL PRODUCTS Placement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E8E4DC] mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#736858] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Full Store Collection</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#121C33] font-bold">20% Off Every Item</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-[#121C33]">
              SHOP ALL PRODUCTS
            </h2>
            <p className="text-sm text-[#5B606B] mt-1.5 max-w-xl">
              Browse our complete makeup catalog across Face, Eyes, Lips, Brushes, and Tools—all
              eligible for 20% discount with signature dark royal packaging.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#7A808C] font-mono tabular-nums">
              Showing <strong className="text-[#121C33]">{filteredProducts.length}</strong> of {products.length} products
            </span>
          </div>
        </div>

        {/* Filter Bar: Segmented controls for clean interactive filtering */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#121C33] text-white shadow-xs font-semibold'
                    : 'bg-white text-[#525763] border border-[#E2DED5] hover:bg-[#F2EEE4] hover:text-[#121C33]'
                }`}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            ))}
          </div>

          {/* Controls: Search, Sort & Clear */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* Quick in-grid search */}
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter items..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#E2DED5] rounded-md text-xs text-[#1E2024] placeholder:text-slate-400 focus:outline-none focus:border-[#121C33]"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-[#E2DED5] rounded-md px-2.5 py-1.5 text-xs text-[#1E2024]">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="bg-transparent focus:outline-none text-xs font-medium cursor-pointer"
                aria-label="Sort products by"
              >
                <option value="featured">Featured Picks</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden p-1.5 bg-white border border-[#E2DED5] rounded-md text-xs text-[#1E2024] flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Clear Filters (if active) */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-2.5 py-1.5 text-xs text-[#B8405E] hover:underline font-medium flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Filter Row: Finishes */}
        <div className={`mb-6 flex flex-wrap items-center gap-2 text-xs text-[#6C727F] ${showMobileFilters ? 'block' : 'hidden sm:flex'}`}>
          <span className="font-medium text-[#1E2024] mr-1">Finish:</span>
          {finishes.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFinish(f)}
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                activeFinish === f
                  ? 'bg-[#1E2D50] text-white font-medium'
                  : 'bg-[#EFECE4] text-[#555A64] hover:bg-[#E5E1D7]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Product Grid: 4 columns desktop / 2 columns mobile */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          /* Polished Empty State */
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E4DC] p-8 max-w-lg mx-auto">
            <h3 className="font-serif text-lg font-bold text-[#121C33] mb-2">No products match your filters</h3>
            <p className="text-xs text-[#6C727F] mb-6">
              Try clearing your active filters or searching with a different term.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-[#121C33] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#1C2C50] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
