import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const discount = Math.round(((product.original_price - product.price) / product.original_price) * 100);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/shop/${product.id}`} className="product-card bg-[#141025] border border-[#2A2540] rounded-lg overflow-hidden block" data-testid={`product-card-${product.id}`}>
      <div className="relative aspect-square bg-[#0B0F1A] overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
        {discount > 0 && <span className="absolute top-3 left-3 badge-discount">{discount}% OFF</span>}
      </div>
      <div className="p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{product.brand}</p>
        <h3 className="text-sm font-medium text-white leading-snug mb-2 line-clamp-2" style={{ fontFamily: 'Cabinet Grotesk' }}>{product.name}</h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className={i < Math.floor(product.rating) ? 'star-filled fill-current' : 'star-empty'} />
          ))}
          <span className="text-xs text-slate-500">({product.reviews_count})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white" style={{ fontFamily: 'Cabinet Grotesk' }}>&#8377;{product.price.toLocaleString()}</span>
            {product.original_price > product.price && <span className="text-xs text-slate-600 line-through">&#8377;{product.original_price.toLocaleString()}</span>}
          </div>
          <button onClick={handleAddToCart} className="p-2 rounded-lg bg-[#9F67FF] text-white hover:bg-[#B28AFF] transition-colors flex-shrink-0" data-testid={`add-to-cart-${product.id}`}>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}
