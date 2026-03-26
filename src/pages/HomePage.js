import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import ProductCard from '../components/ProductCard';
import { AethexLogo } from '../components/AethexLogo';
import { Search, ArrowRight, Stethoscope, ShirtIcon, FlaskConical, BookOpen, GraduationCap, Heart, ShieldCheck, Truck, Star, Sparkles } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const HERO_IMG = 'https://static.prod-images.emergentagent.com/jobs/cdd922df-f3cc-4124-84ae-ffbff30e9880/images/9b6b827ed021fc9e868109ddb577455cf9407eceb2ae7b9e6ba93fa1c082a3e7.png';
const DOCTOR_IMG = 'https://images.pexels.com/photos/5888168/pexels-photo-5888168.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
const STUDENTS_IMG = 'https://images.pexels.com/photos/3985149/pexels-photo-3985149.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

const categories = [
  { name: 'Stethoscopes', icon: Stethoscope, slug: 'stethoscopes', color: 'bg-[#9F67FF]/10', textColor: 'text-[#B28AFF]' },
  { name: 'Scrubs', icon: ShirtIcon, slug: 'scrubs', color: 'bg-purple-500/10', textColor: 'text-purple-400' },
  { name: 'Lab Coats', icon: FlaskConical, slug: 'aprons', color: 'bg-indigo-500/10', textColor: 'text-indigo-400' },
  { name: 'Equipment', icon: Heart, slug: 'equipment', color: 'bg-pink-500/10', textColor: 'text-pink-400' },
  { name: 'Study Material', icon: BookOpen, slug: 'books', color: 'bg-cyan-500/10', textColor: 'text-cyan-400' },
  { name: 'NEET PG', icon: GraduationCap, slug: 'courses', color: 'bg-amber-500/10', textColor: 'text-amber-400' },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${API}/products`).then(res => setProducts(res.data)).catch(() => {});
    axios.get(`${API}/courses`).then(res => setCourses(res.data.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <main className="min-h-screen pt-16" data-testid="home-page">
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden" data-testid="hero-section">
        <div className="absolute inset-0 opacity-20">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A] via-[#0B0F1A]/90 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 sm:py-28 relative z-10">
          <div className="max-w-2xl">
            <AethexLogo size="lg" className="mb-8" />
            <div className="inline-flex items-center gap-2 rounded-full border border-[#9F67FF]/30 bg-[#9F67FF]/10 px-4 py-1.5 text-xs font-semibold text-[#B28AFF] tracking-wide uppercase mb-6">
              <Sparkles size={12} /> India's Medical Marketplace
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="hero-title">
              The Last Search for <span className="text-[#B28AFF]">Doctors & Students</span>
            </h1>
            <p className="text-base lg:text-lg text-slate-400 leading-relaxed max-w-lg mb-8">
              Compare NEET PG courses from PrepLadder, Marrow, PW Med & more. Shop stethoscopes, scrubs, medical equipment — everything in one place.
            </p>
            <div className="relative max-w-lg">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder="Search courses, stethoscopes, scrubs..." className="w-full h-13 pl-12 pr-32 py-3.5 rounded-xl border border-[#2A2540] bg-[#141025]/80 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#9F67FF] placeholder:text-slate-600" data-testid="hero-search-input" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#9F67FF] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#B28AFF] transition-colors" data-testid="hero-search-button">Search</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20" data-testid="categories-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight" style={{ fontFamily: 'Cabinet Grotesk' }}>Browse Categories</h2>
              <Link to="/shop" className="text-sm font-medium text-[#B28AFF] hover:text-[#9F67FF] flex items-center gap-1">View all <ArrowRight size={16} /></Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <ScrollReveal key={i}>
                <Link to={cat.slug === 'courses' ? '/courses' : `/shop?category=${cat.slug}`} className={`category-card ${cat.color} rounded-lg p-6 text-center block border border-transparent hover:border-[#9F67FF]/20`} data-testid={`category-${cat.slug}`}>
                  <cat.icon size={26} className={`${cat.textColor} mx-auto mb-3`} />
                  <p className={`text-sm font-semibold ${cat.textColor}`} style={{ fontFamily: 'Cabinet Grotesk' }}>{cat.name}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Top Courses */}
      <section className="py-16 sm:py-20 bg-[#141025]/30" data-testid="top-courses-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-2" style={{ fontFamily: 'Cabinet Grotesk' }}>Compare NEET PG Courses</h2>
                <p className="text-sm text-slate-500">Find the perfect preparation platform</p>
              </div>
              <Link to="/courses" className="text-sm font-medium text-[#B28AFF] hover:text-[#9F67FF] flex items-center gap-1 flex-shrink-0">Compare all <ArrowRight size={16} /></Link>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <ScrollReveal key={i}>
                <div className="glass-card p-6 product-card" data-testid={`course-card-${course.id}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: course.color, fontFamily: 'Cabinet Grotesk' }}>{course.name.charAt(0)}</div>
                    <div>
                      <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'Cabinet Grotesk' }}>{course.name}</h3>
                      <p className="text-xs text-slate-500">{course.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (<Star key={si} size={14} className={si < Math.floor(course.rating) ? 'star-filled fill-current' : 'star-empty'} />))}
                    <span className="text-xs text-slate-500 ml-1">{course.rating}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Cabinet Grotesk' }}>&#8377;{course.price?.toLocaleString()}</span>
                    <span className="text-sm text-slate-600 line-through">&#8377;{course.original_price?.toLocaleString()}</span>
                    <span className="badge-discount">{Math.round(((course.original_price - course.price) / course.original_price) * 100)}% OFF</span>
                  </div>
                  <Link to="/courses" className="block w-full text-center bg-[#9F67FF] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#B28AFF] transition-colors" data-testid={`course-compare-${course.id}`}>Compare & Buy</Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-20" data-testid="featured-products-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-2" style={{ fontFamily: 'Cabinet Grotesk' }}>Popular Medical Supplies</h2>
                <p className="text-sm text-slate-500">Top-rated products trusted by Indian doctors</p>
              </div>
              <Link to="/shop" className="text-sm font-medium text-[#B28AFF] hover:text-[#9F67FF] flex items-center gap-1 flex-shrink-0">Shop all <ArrowRight size={16} /></Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, i) => (<ScrollReveal key={i}><ProductCard product={product} /></ScrollReveal>))}
          </div>
        </div>
      </section>

      {/* Why aethex */}
      <section className="py-16 sm:py-20 bg-[#141025]/30" data-testid="why-aethex-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <span className="text-sm text-slate-500 uppercase tracking-widest font-medium mb-4 block">Why aethex</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-tight mb-6" style={{ fontFamily: 'Cabinet Grotesk' }}>
                  Built by Doctors, <span className="text-[#B28AFF]">for Doctors</span>
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">We understand the Indian medical ecosystem. From NEET PG preparation to daily clinical needs, aethex is your one-stop platform.</p>
                <div className="space-y-5">
                  {[{ icon: ShieldCheck, title: 'Verified Sellers', desc: 'All products from authorized distributors' }, { icon: Truck, title: 'Pan-India Delivery', desc: 'Fast shipping to every pin code' }, { icon: GraduationCap, title: 'Course Comparison', desc: 'Unbiased comparison of all NEET PG platforms' }].map((item, i) => (
                    <div key={i} className="flex items-start gap-4" data-testid={`why-feature-${i}`}>
                      <div className="w-10 h-10 rounded-lg bg-[#9F67FF]/10 flex items-center justify-center flex-shrink-0"><item.icon size={18} className="text-[#B28AFF]" /></div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1" style={{ fontFamily: 'Cabinet Grotesk' }}>{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="relative">
                <img src={DOCTOR_IMG} alt="Indian doctor" className="rounded-2xl w-full object-cover max-h-[480px] opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 glass-card p-4">
                  <div className="flex items-center gap-3">
                    <img src={STUDENTS_IMG} alt="Students" className="w-12 h-12 rounded-full object-cover border-2 border-[#9F67FF]/30" />
                    <div>
                      <p className="text-sm font-semibold text-white">Trusted by 50,000+ doctors</p>
                      <p className="text-xs text-slate-500">& medical students across India</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20" data-testid="bottom-cta-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="glass-card p-12 sm:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#9F67FF]/5 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'Cabinet Grotesk' }}>Ready to Start?</h2>
                <p className="text-slate-400 max-w-xl mx-auto mb-8">Join thousands of Indian healthcare professionals who trust aethex.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/courses" className="bg-[#9F67FF] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#B28AFF] transition-colors shadow-[0_0_20px_rgba(159,103,255,0.3)]" data-testid="cta-compare-courses">Compare Courses</Link>
                  <Link to="/shop" className="bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors" data-testid="cta-shop-now">Shop Medical Supplies</Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
