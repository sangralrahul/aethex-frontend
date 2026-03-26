import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { AethexLogo } from '../components/AethexLogo';
import { Input } from '../components/ui/input';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error('Please fill all fields'); return; }
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success('Account created! Welcome to Aethex.');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen pt-16 flex items-center justify-center bg-[#F9F8F6]" data-testid="register-page">
      <div className="w-full max-w-md px-4 py-16">
        <div className="text-center mb-8">
          <AethexLogo size="lg" className="justify-center mb-6" />
          <h1 className="text-2xl font-bold text-[#1C1917]" style={{ fontFamily: 'Cabinet Grotesk' }}>Create Account</h1>
          <p className="text-sm text-[#78716C] mt-1">Join India's medical marketplace</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white border border-[#E7E5E4] rounded-xl p-6 space-y-4" data-testid="register-form">
          <div>
            <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Full Name</label>
            <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Dr. Priya Mehta" className="h-11 rounded-lg" data-testid="register-name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="h-11 rounded-lg" data-testid="register-email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C1917] mb-1.5">Password</label>
            <div className="relative">
              <Input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" className="h-11 rounded-lg pr-10" data-testid="register-password" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A8A29E]">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#D95D39] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#C24F2C] transition-colors flex items-center justify-center gap-2 disabled:opacity-60" data-testid="register-submit">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <>Create Account <ArrowRight size={16} /></>}
          </button>
          <p className="text-center text-sm text-[#78716C]">
            Already have an account? <Link to="/login" className="text-[#1A362D] font-medium hover:underline" data-testid="login-link">Sign In</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
