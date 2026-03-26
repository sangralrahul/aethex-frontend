import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [searchParams] = useSearchParams();
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Check for payment return
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      setCheckingPayment(true);
      const poll = async (attempts = 0) => {
        try {
          const res = await axios.get(`${API}/checkout/status/${sessionId}`);
          if (res.data.payment_status === 'paid') {
            setPaymentSuccess(true);
            setCheckingPayment(false);
            toast.success('Payment successful!');
          } else if (res.data.status === 'expired' || attempts >= 5) {
            setCheckingPayment(false);
            toast.error('Payment not completed');
          } else {
            setTimeout(() => poll(attempts + 1), 2000);
          }
        } catch {
          setCheckingPayment(false);
        }
      };
      poll();
    }
  }, [searchParams]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const items = cart.map(item => ({ id: item.id, quantity: item.quantity }));
      const res = await axios.post(`${API}/checkout/session`, { origin_url: window.location.origin, items });
      if (res.data.url) window.location.href = res.data.url;
    } catch (err) {
      toast.error('Checkout failed. Please try again.');
    } finally { setCheckoutLoading(false); }
  };

  if (paymentSuccess) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center" data-testid="cart-page">
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-full bg-[#E9F2ED] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-[#1A362D]" />
          </div>
          <h2 className="text-2xl font-semibold text-[#1C1917] mb-3" style={{ fontFamily: 'Cabinet Grotesk' }}>Payment Successful!</h2>
          <p className="text-[#78716C] text-sm mb-6">Your order has been placed successfully.</p>
          <Link to="/shop" className="inline-flex items-center bg-[#1A362D] text-white px-6 py-3 rounded-lg text-sm font-semibold">Continue Shopping</Link>
        </div>
      </main>
    );
  }

  if (checkingPayment) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center" data-testid="cart-page">
        <div className="text-center"><Loader2 size={32} className="animate-spin text-[#1A362D] mx-auto mb-4" /><p className="text-[#78716C]">Verifying payment...</p></div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-16 flex items-center justify-center" data-testid="cart-page">
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-full bg-[#E9F2ED] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-[#1A362D]" />
          </div>
          <h2 className="text-2xl font-semibold text-[#1C1917] mb-3" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="empty-cart-title">
            Your Cart is Empty
          </h2>
          <p className="text-[#78716C] text-sm mb-6">Browse our collection and add items to your cart.</p>
          <Link to="/shop" className="inline-flex items-center bg-[#1A362D] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#2C4F44] transition-colors" data-testid="continue-shopping">
            Continue Shopping <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16" data-testid="cart-page">
      <div className="bg-white border-b border-[#E7E5E4] py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="cart-title">
            Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border border-[#E7E5E4] rounded-lg p-4 sm:p-6 flex gap-4 sm:gap-6" data-testid={`cart-item-${item.id}`}>
                <Link to={`/shop/${item.id}`} className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-[#F9F8F6] flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-[#78716C] uppercase tracking-wider">{item.brand}</p>
                      <Link to={`/shop/${item.id}`} className="text-sm font-semibold text-[#1C1917] hover:text-[#1A362D] line-clamp-1" style={{ fontFamily: 'Cabinet Grotesk' }}>
                        {item.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-[#A8A29E] hover:text-red-500 transition-colors flex-shrink-0"
                      data-testid={`remove-item-${item.id}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-[#E7E5E4] rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-[#F5F5F4] transition-colors" data-testid={`cart-minus-${item.id}`}>
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-medium min-w-[32px] text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-[#F5F5F4] transition-colors" data-testid={`cart-plus-${item.id}`}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-[#1C1917]" style={{ fontFamily: 'Cabinet Grotesk' }}>
                      &#8377;{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E7E5E4] rounded-lg p-6 sticky top-24" data-testid="order-summary">
              <h3 className="text-lg font-semibold text-[#1C1917] mb-6" style={{ fontFamily: 'Cabinet Grotesk' }}>Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#78716C]">Subtotal</span>
                  <span className="font-medium text-[#1C1917]">&#8377;{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#78716C]">Shipping</span>
                  <span className="font-medium text-[#059669]">{cartTotal >= 500 ? 'FREE' : '₹49'}</span>
                </div>
                <div className="border-t border-[#E7E5E4] pt-3 flex justify-between">
                  <span className="text-base font-semibold text-[#1C1917]">Total</span>
                  <span className="text-xl font-bold text-[#1C1917]" style={{ fontFamily: 'Cabinet Grotesk' }}>
                    &#8377;{(cartTotal + (cartTotal >= 500 ? 0 : 49)).toLocaleString()}
                  </span>
                </div>
              </div>
              <button onClick={handleCheckout} disabled={checkoutLoading} className="w-full btn-accent py-3.5 rounded-lg text-sm font-semibold mb-3 flex items-center justify-center gap-2 disabled:opacity-60" data-testid="checkout-button">
                {checkoutLoading ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : 'Proceed to Checkout'}
              </button>
              <Link to="/shop" className="block w-full text-center text-sm text-[#1A362D] font-medium hover:underline" data-testid="continue-shopping-link">
                Continue Shopping
              </Link>
              {cartTotal < 500 && (
                <p className="text-xs text-[#78716C] mt-4 text-center">
                  Add &#8377;{(500 - cartTotal).toLocaleString()} more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
