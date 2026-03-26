import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { AethexLogo } from '../components/AethexLogo';
import { Input } from '../components/ui/input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen pt-16 flex items-center justify-center bg-[#0B0F1A]" data-testid="login-page">
      <div className="w-full max-w-md px-4 py-16">
        <div className="text-center mb-8">
          <AethexLogo size="lg" className="justify-center mb-6" />
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Cabinet Grotesk' }}>Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your aethex account</p>
        </div>
        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4" data-testid="login-form">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="h-11 rounded-lg bg-[#141025] border-[#2A2540] text-white focus:border-[#9F67FF] focus:ring-[#9F67FF]" data-testid="login-email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className="h-11 rounded-lg pr-10 bg-[#141025] border-[#2A2540] text-white focus:border-[#9F67FF] focus:ring-[#9F67FF]" data-testid="login-password" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-[#9F67FF] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#B28AFF] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shadow-[0_0_15px_rgba(159,103,255,0.3)]" data-testid="login-submit">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <>Sign In <ArrowRight size={16} /></>}
          </button>
          <p className="text-center text-sm text-slate-500">
            Don't have an account? <Link to="/register" className="text-[#B28AFF] font-medium hover:underline" data-testid="register-link">Sign Up</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
