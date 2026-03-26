import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, Truck, ShieldCheck, RotateCcw, Check, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/products/${id}`)
      .then(res => {
        setProduct(res.data);
        return axios.get(`${API}/products?category=${res.data.category}`);
      })
      .then(res => {
        setRelatedProducts(res.data.filter(p => p.id !== id).slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast.success(`${quantity}x ${product.name} added to cart`);
  };

  if (loading) return (
    <main className="min-h-screen pt-24 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-[#1A362D] border-t-transparent rounded-full" />
    </main>
  );

  if (!product) return (
    <main className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#1C1917] mb-4" style={{ fontFamily: 'Cabinet Grotesk' }}>Product Not Found</h2>
        <Link to="/shop" className="text-[#1A362D] font-medium text-sm hover:underline">Back to Shop</Link>
      </div>
    </main>
  );

  const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);

  return (
    <main className="min-h-screen pt-16" data-testid="product-detail-page">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-[#78716C]" data-testid="breadcrumb">
            <Link to="/" className="hover:text-[#1C1917]">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-[#1C1917]">Shop</Link>
            <span>/</span>
            <span className="text-[#1C1917] font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="bg-white border border-[#E7E5E4] rounded-lg overflow-hidden" data-testid="product-image-container">
              <div className="aspect-square">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Info */}
            <div>
              <p className="text-xs text-[#78716C] uppercase tracking-wider mb-2">{product.brand}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight mb-3" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="product-name">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.floor(product.rating) ? 'star-filled fill-current' : 'star-empty'} />
                  ))}
                </div>
                <span className="text-sm text-[#78716C]">{product.rating} ({product.reviews_count?.toLocaleString()} reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#E7E5E4]">
                <span className="text-4xl font-bold text-[#1C1917]" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="product-price">
                  &#8377;{product.price?.toLocaleString()}
                </span>
                {product.original_price > product.price && (
                  <>
                    <span className="text-lg text-[#A8A29E] line-through">&#8377;{product.original_price?.toLocaleString()}</span>
                    <span className="badge-discount text-sm">{discount}% OFF</span>
                  </>
                )}
              </div>

              <p className="text-[#57534E] leading-relaxed mb-6" data-testid="product-description">
                {product.description}
              </p>

              {product.features?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[#1C1917] mb-3" style={{ fontFamily: 'Cabinet Grotesk' }}>Key Features</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#57534E]">
                        <Check size={14} className="text-[#059669] flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity + Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-[#E7E5E4] rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-[#F5F5F4] transition-colors" data-testid="quantity-minus">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 text-sm font-semibold min-w-[40px] text-center" data-testid="quantity-value">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-[#F5F5F4] transition-colors" data-testid="quantity-plus">
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-accent py-3.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
                  data-testid="add-to-cart-button"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E7E5E4]">
                {[
                  { icon: Truck, label: 'Free Shipping', sub: 'Orders above ₹500' },
                  { icon: ShieldCheck, label: 'Genuine Product', sub: '100% authentic' },
                  { icon: RotateCcw, label: 'Easy Returns', sub: '7-day return policy' },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <item.icon size={20} className="text-[#1A362D] mx-auto mb-1.5" />
                    <p className="text-xs font-semibold text-[#1C1917]">{item.label}</p>
                    <p className="text-[10px] text-[#78716C]">{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 bg-white" data-testid="related-products">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h2 className="text-xl font-semibold text-[#1C1917] tracking-tight mb-8" style={{ fontFamily: 'Cabinet Grotesk' }}>
              Related Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ScrollReveal key={p.id}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
