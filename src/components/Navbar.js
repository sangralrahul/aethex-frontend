import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AethexLogo } from './AethexLogo';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'NEET PG Courses' },
    { to: '/shop', label: 'Medical Shop' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearch = async (q) => {
    setSearchQuery(q);
    if (q.length >= 2) {
      try {
        const res = await axios.get(`${API}/search?q=${encodeURIComponent(q)}`);
        setSearchResults(res.data);
      } catch { setSearchResults(null); }
    } else { setSearchResults(null); }
  };

  const goToResult = (path) => { setSearchOpen(false); setSearchQuery(''); setSearchResults(null); navigate(path); };

  return (
    <header className="glass-nav fixed top-0 left-0 right-0 z-50" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-8">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" data-testid="navbar-logo">
            <AethexLogo size="sm" />
          </Link>

          {/* Desktop Nav - all items inline next to logo */}
          <nav className="hidden lg:flex items-center gap-5 flex-1" data-testid="desktop-nav">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm whitespace-nowrap transition-colors ${
                  isActive(link.to)
                    ? 'text-[#B28AFF] font-semibold'
                    : 'text-slate-400 hover:text-white font-medium'
                }`}
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white" data-testid="search-toggle">
              <Search size={18} />
            </button>
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white" data-testid="cart-link">
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#9F67FF] text-white text-xs rounded-full flex items-center justify-center font-bold" data-testid="cart-count">{cartCount}</span>}
            </Link>
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-medium text-slate-400 max-w-[80px] truncate">{user.name}</span>
                <button onClick={logout} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors" data-testid="logout-button">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#9F67FF] text-white text-xs font-semibold hover:bg-[#B28AFF] transition-colors shadow-[0_0_15px_rgba(159,103,255,0.3)]" data-testid="login-nav-button">
                <User size={14} /> Sign In
              </Link>
            )}
            <button className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400" onClick={() => setMobileOpen(!mobileOpen)} data-testid="mobile-menu-toggle">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search */}
        {searchOpen && (
          <div className="pb-3 relative" data-testid="search-bar">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder="Search courses, stethoscopes, scrubs..." className="w-full h-10 pl-10 pr-4 rounded-lg border border-[#2A2540] bg-[#141025] text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#9F67FF] focus:border-[#9F67FF] placeholder:text-slate-600" autoFocus data-testid="search-input" />
            </div>
            {searchResults && (searchResults.products?.length > 0 || searchResults.courses?.length > 0) && (
              <div className="absolute left-0 right-0 mt-1 bg-[#141025] border border-[#2A2540] rounded-lg shadow-xl max-h-64 overflow-y-auto z-50" data-testid="search-results">
                {searchResults.courses?.length > 0 && (
                  <div className="p-2">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 px-2 mb-1 font-semibold">Courses</p>
                    {searchResults.courses.map(c => (
                      <button key={c.id} onClick={() => goToResult('/courses')} className="w-full text-left px-3 py-2 rounded hover:bg-[#9F67FF]/10 text-sm text-white flex items-center justify-between">
                        {c.name} <span className="text-xs text-[#B28AFF]">&#8377;{c.price?.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                )}
                {searchResults.products?.length > 0 && (
                  <div className="p-2 border-t border-[#2A2540]">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 px-2 mb-1 font-semibold">Products</p>
                    {searchResults.products.slice(0, 5).map(p => (
                      <button key={p.id} onClick={() => goToResult(`/shop/${p.id}`)} className="w-full text-left px-3 py-2 rounded hover:bg-[#9F67FF]/10 text-sm text-white flex items-center justify-between">
                        {p.name} <span className="text-xs text-[#B28AFF]">&#8377;{p.price?.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-[#2A2540] pt-3 space-y-1" data-testid="mobile-nav">
            {links.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive(link.to) ? 'text-[#B28AFF] font-semibold bg-[#9F67FF]/10' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10">Sign Out</button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-[#B28AFF] bg-[#9F67FF]/10">Sign In</Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
