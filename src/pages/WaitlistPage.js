import { useState } from 'react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Input } from '../components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function WaitlistPage() {
  const [formData, setFormData] = useState({ name: '', email: '', profession: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.profession) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/waitlist`, formData);
      setSubmitted(true);
      toast.success('Thank you! We\'ll be in touch soon.');
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-16 flex items-center" data-testid="waitlist-page">
        <div className="max-w-2xl mx-auto px-4 md:px-8 text-center py-32">
          <div className="bg-white border border-[#E7E5E4] rounded-lg p-12">
            <div className="w-16 h-16 rounded-full bg-[#E9F2ED] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-[#1A362D]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] mb-3" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="waitlist-success-title">
              Message Sent!
            </h2>
            <p className="text-[#57534E] mb-1">Thank you, <span className="font-semibold text-[#1C1917]">{formData.name}</span>.</p>
            <p className="text-sm text-[#78716C]">We'll reach out to {formData.email} shortly.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-16" data-testid="waitlist-page">
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <ScrollReveal>
              <div>
                <span className="text-sm text-[#78716C] uppercase tracking-widest font-medium mb-4 block">Contact Us</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1917] leading-[1.1] mb-6" style={{ fontFamily: 'Cabinet Grotesk' }} data-testid="contact-title">
                  Get in <span className="text-[#D95D39]">Touch</span>
                </h1>
                <p className="text-[#57534E] leading-relaxed mb-10">
                  Have questions? Want to partner with us? Or just want to say hello? Fill out the form and our team will get back to you within 24 hours.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E9F2ED] flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-[#1A362D]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1917] mb-1">Email</p>
                      <a href="mailto:aethex.ai@gmail.com" className="text-sm text-[#D95D39] hover:underline" data-testid="contact-email">aethex.ai@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E9F2ED] flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-[#1A362D]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1917] mb-1">Phone</p>
                      <p className="text-sm text-[#78716C]">Coming soon</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#E9F2ED] flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-[#1A362D]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1C1917] mb-1">Location</p>
                      <p className="text-sm text-[#78716C]">India</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right - Form */}
            <ScrollReveal>
              <div className="bg-white border border-[#E7E5E4] rounded-lg p-8">
                <h3 className="text-lg font-semibold text-[#1C1917] mb-1" style={{ fontFamily: 'Cabinet Grotesk' }}>Send us a message</h3>
                <p className="text-sm text-[#78716C] mb-6">Fields marked with * are required.</p>
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
                  <div>
                    <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Full Name *</label>
                    <Input
                      type="text"
                      placeholder="Dr. Priya Mehta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-11 rounded-lg border-[#E7E5E4] focus:border-[#1A362D] focus:ring-1 focus:ring-[#1A362D]"
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Email Address *</label>
                    <Input
                      type="email"
                      placeholder="priya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-11 rounded-lg border-[#E7E5E4] focus:border-[#1A362D] focus:ring-1 focus:ring-[#1A362D]"
                      data-testid="contact-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Profession *</label>
                    <Select value={formData.profession} onValueChange={(val) => setFormData({ ...formData, profession: val })}>
                      <SelectTrigger className="h-11 rounded-lg border-[#E7E5E4] focus:border-[#1A362D] focus:ring-1 focus:ring-[#1A362D]" data-testid="contact-profession-select">
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#E7E5E4]">
                        <SelectItem value="doctor" data-testid="profession-doctor">Doctor</SelectItem>
                        <SelectItem value="student" data-testid="profession-student">Medical Student</SelectItem>
                        <SelectItem value="clinic" data-testid="profession-clinic">Clinic / Hospital</SelectItem>
                        <SelectItem value="other" data-testid="profession-other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Phone Number</label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-11 rounded-lg border-[#E7E5E4] focus:border-[#1A362D] focus:ring-1 focus:ring-[#1A362D]"
                      data-testid="contact-phone-input"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1A362D] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#2C4F44] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    data-testid="contact-form-submit"
                  >
                    {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send Message <ArrowRight size={16} /></>}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
