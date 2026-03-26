import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, Stethoscope, ShirtIcon, FlaskConical, Heart, BookOpen, LayoutGrid } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const categories = [
  { name: 'All Products', slug: 'all', icon: LayoutGrid },
  { name: 'Stethoscopes', slug: 'stethoscopes', icon: Stethoscope },
  { name: 'Scrubs & Uniforms', slug: 'scrubs', icon: ShirtIcon },
  { name: 'Lab Coats & Aprons', slug: 'aprons', icon: FlaskConical },
  { name: 'Medical Equipment', slug: 'equipment', icon: Heart },
  { name: 'Study Material', slug: 'books', icon: BookOpen },
];

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const activeCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    setLoading(true);
    const params = activeCategory !== 'all' ? `?category=${activeCategory}` : '';
    axios.get(`${API}/products${params}`)
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviews_count - a.reviews_count;
  });

  const handleCategoryChange = (slug) => {
    if (slug === 'all') { setSearchParams({}); }
    else { setSearchParams({ category: slug }); }
  };

  return (
    <main className="min-h-screen pt-16" data-testid="shop-page">
      {/* Header */}
      <section className="bg-[#141025]/50 border-b border-[#2A2540] py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="shop-title">
            Medical Shop
          </h1>
          <p className="text-sm text-slate-500">Premium medical supplies for doctors, students & clinics</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0" data-testid="shop-sidebar">
            <div className="lg:sticky lg:top-24">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2" style={{ fontFamily: 'Cabinet Grotesk' }}>
                <SlidersHorizontal size={14} /> Categories
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <button
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                        activeCategory === cat.slug
                          ? 'bg-[#9F67FF]/10 text-[#B28AFF] font-semibold'
                          : 'text-slate-400 hover:bg-white/5'
                      }`}
                      data-testid={`filter-${cat.slug}`}
                    >
                      <cat.icon size={16} />
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500" data-testid="product-count">
                {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-[#2A2540] rounded-lg px-3 py-2 bg-[#141025] text-white focus:outline-none focus:ring-1 focus:ring-[#9F67FF]"
                data-testid="sort-select"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="animate-spin w-8 h-8 border-2 border-[#1A362D] border-t-transparent rounded-full" />
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-[#78716C]">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6" data-testid="product-grid">
                {sortedProducts.map((product, i) => (
                  <ScrollReveal key={product.id}>
                    <ProductCard product={product} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
