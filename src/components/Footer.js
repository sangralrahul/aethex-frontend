import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight } from 'lucide-react';
import { AethexLogoWhite } from './AethexLogo';

export default function Footer() {
  return (
    <footer className="bg-[#080B14] border-t border-[#2A2540]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="mb-4"><AethexLogoWhite size="sm" /></div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
              The last search for doctors and medical students. Compare NEET PG courses, buy medical supplies — all in one place.
            </p>
            <a href="mailto:aethex.ai@gmail.com" className="inline-flex items-center gap-2 text-[#B28AFF] hover:text-[#9F67FF] text-sm transition-colors" data-testid="footer-email">
              <Mail size={14} /> aethex.ai@gmail.com
            </a>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4" style={{ fontFamily: 'Cabinet Grotesk' }}>Quick Links</h4>
            <ul className="space-y-3">
              {[{ to: '/courses', label: 'NEET PG Courses' }, { to: '/shop', label: 'Medical Shop' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map((link) => (
                <li key={link.to}><Link to={link.to} className="text-slate-500 hover:text-[#B28AFF] text-sm transition-colors inline-flex items-center gap-1">{link.label} <ArrowUpRight size={12} /></Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4" style={{ fontFamily: 'Cabinet Grotesk' }}>Categories</h4>
            <ul className="space-y-3">
              {['Stethoscopes', 'Scrubs & Uniforms', 'Lab Coats', 'Medical Equipment', 'Study Material'].map((cat) => (
                <li key={cat}><Link to="/shop" className="text-slate-500 hover:text-[#B28AFF] text-sm transition-colors">{cat}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[#2A2540] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">&copy; {new Date().getFullYear()} aethex. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Made for Indian Healthcare Professionals</p>
        </div>
      </div>
    </footer>
  );
}
