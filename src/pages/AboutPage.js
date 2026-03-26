import { Link } from 'react-router-dom';
import { ScrollReveal } from '../components/ScrollReveal';
import { Target, Rocket, Users, ArrowRight, Heart, ShieldCheck } from 'lucide-react';

const DOCTOR_IMG = 'https://images.pexels.com/photos/5738735/pexels-photo-5738735.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
const STUDENTS_IMG = 'https://images.pexels.com/photos/3985154/pexels-photo-3985154.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16" data-testid="about-page">
      {/* Hero */}
      <section className="bg-[#1A362D] py-20 sm:py-28" data-testid="about-hero">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="text-sm text-white/60 uppercase tracking-widest font-medium mb-4 block">About Aethex</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="about-title">
                The Last Search for <span className="text-[#D95D39]">Indian Doctors</span>
              </h1>
              <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-2xl">
                We're building India's most comprehensive platform for healthcare professionals — from NEET PG course comparison to medical supplies, everything you need in one place.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-24" data-testid="mission-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <span className="text-sm text-[#78716C] uppercase tracking-widest font-medium mb-4 block">Our Mission</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1C1917] tracking-tight mb-6" style={{ fontFamily: 'Cabinet Grotesk' }}>
                  Making Quality Accessible to Every Doctor
                </h2>
                <p className="text-[#57534E] leading-relaxed mb-6">
                  India has over 1.3 million registered doctors and 80,000+ NEET PG aspirants every year. Yet, finding the right preparation materials and quality medical supplies remains fragmented and confusing.
                </p>
                <p className="text-[#57534E] leading-relaxed">
                  Aethex brings together unbiased course comparisons, verified medical products, and a community of healthcare professionals — all under one roof. No bias. No confusion. Just clarity.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <img src={DOCTOR_IMG} alt="Indian doctor" className="rounded-2xl w-full object-cover max-h-[400px]" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-white" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight mb-4" style={{ fontFamily: 'Cabinet Grotesk' }}>What We Stand For</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'Unbiased Comparison', desc: 'We don\'t take sides. Every course and product is evaluated transparently so you can make the best decision.' },
              { icon: ShieldCheck, title: 'Trust & Quality', desc: 'Every product on our platform is verified. Every course review is genuine. Your trust is our foundation.' },
              { icon: Heart, title: 'Built for India', desc: 'Prices in INR, Indian drug databases, vernacular support — everything tailored for the Indian healthcare ecosystem.' },
            ].map((item, i) => (
              <ScrollReveal key={i}>
                <div className="bg-white border border-[#E7E5E4] rounded-lg p-8 text-center product-card" data-testid={`value-card-${i}`}>
                  <div className="w-14 h-14 rounded-xl bg-[#E9F2ED] flex items-center justify-center mx-auto mb-6">
                    <item.icon size={24} className="text-[#1A362D]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1C1917] mb-3" style={{ fontFamily: 'Cabinet Grotesk' }}>{item.title}</h3>
                  <p className="text-sm text-[#78716C] leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-24" data-testid="team-section">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <img src={STUDENTS_IMG} alt="Medical team" className="rounded-2xl w-full object-cover max-h-[400px]" />
            </ScrollReveal>
            <ScrollReveal>
              <div>
                <span className="text-sm text-[#78716C] uppercase tracking-widest font-medium mb-4 block">The Team</span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight mb-6" style={{ fontFamily: 'Cabinet Grotesk' }}>
                  Founded with Purpose
                </h2>
                <p className="text-[#57534E] leading-relaxed mb-6">
                  Aethex was founded by a team passionate about healthcare and technology. We combine deep domain knowledge in medical education, e-commerce, and product design to build the platform Indian doctors deserve.
                </p>
                <div className="inline-flex items-center gap-3 bg-[#E9F2ED] px-5 py-3 rounded-lg">
                  <Rocket size={18} className="text-[#1A362D]" />
                  <div>
                    <span className="text-sm font-semibold text-[#1A362D]">Seed Stage</span>
                    <span className="text-sm text-[#57534E] ml-2">Actively Building</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-white" data-testid="about-cta">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1C1917] tracking-tight mb-4" style={{ fontFamily: 'Cabinet Grotesk' }}>
              Join the Aethex Community
            </h2>
            <p className="text-[#57534E] max-w-lg mx-auto mb-8">
              Be part of India's growing community of healthcare professionals who trust Aethex.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center bg-[#1A362D] text-white px-8 py-3.5 rounded-lg text-sm font-semibold hover:bg-[#2C4F44] transition-colors" data-testid="about-cta-contact">
                Get in Touch <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link to="/shop" className="inline-flex items-center btn-accent px-8 py-3.5 rounded-lg text-sm font-semibold" data-testid="about-cta-shop">
                Explore Shop
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
