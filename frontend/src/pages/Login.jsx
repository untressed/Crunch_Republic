import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CrunchLogo from '../components/CrunchLogo';
import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  Eye,
  EyeOff,
  UtensilsCrossed,
  Building2,
  Receipt,
  ArrowRight,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message || 'Failed to authenticate.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col lg:flex-row antialiased selection:bg-brand-500 selection:text-white">
      {/* ========================================================================= */}
      {/* LEFT SIDE: LUXURY INTERACTIVE BRAND CANVAS (Desktop ~58% width)            */}
      {/* ========================================================================= */}
      <div
        onMouseMove={handleMouseMove}
        className="relative lg:w-[58%] bg-[#0b0c10] overflow-hidden flex flex-col justify-between p-8 sm:p-12 lg:p-16 text-white border-b lg:border-b-0 lg:border-r border-slate-800/80"
      >
        {/* Dynamic interactive spotlight following cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-80"
          style={{
            background: `radial-gradient(circle 600px at ${mousePos.x}% ${mousePos.y}%, rgba(220, 38, 38, 0.18), rgba(255, 183, 3, 0.08) 40%, transparent 80%)`,
          }}
        />

        {/* Ambient atmospheric glow orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />

        {/* Subtle geometric grid backdrop */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top Header: Brand Crest */}
        <div className="relative z-10 flex items-center justify-between">
          <CrunchLogo 
            variant="full" 
            isDark={true} 
            size="md" 
            color="#dc2626"
            markClassName="w-12 h-12 shrink-0 drop-shadow-md" 
          />
        </div>

        {/* Center: Hero Tagline & Description */}
        <div className="relative z-10 my-10 lg:my-auto space-y-6 max-w-xl">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Build Your Own.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-300 to-amber-400 filter drop-shadow-sm">
                Top It. Love It.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-normal pt-1 max-w-lg">
              All-in-one dining and delivery management. Digital table QR menus, corporate deliveries, instant kitchen dispatch, and seamless UPI payments.
            </p>
          </div>

          {/* Core Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
            <div className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 backdrop-blur-md transition-all duration-300 group">
              <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-white">Dine-In QR Dining</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Contactless QR table ordering with instant kitchen dispatch.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 backdrop-blur-md transition-all duration-300 group">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-white">Corporate Delivery</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Direct desk & pantry delivery for business campuses.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 backdrop-blur-md transition-all duration-300 group">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                <Receipt className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-black text-white">Instant Settlement</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                Dynamic UPI payment QR with auto-generated tax bills.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Professional Copyright */}
        <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>&copy; {new Date().getFullYear()} Crunch Republic. All rights reserved.</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: SLEEK AUTHENTICATION PORTAL (Desktop ~42% width)              */}
      {/* ========================================================================= */}
      <div className="flex-1 bg-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative overflow-y-auto">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top mini action */}
        <div className="flex justify-end items-center mb-6">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <span>Customer Menu</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>

        {/* Center: Auth Box */}
        <div className="w-full max-w-sm mx-auto my-auto space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 mb-2">
              <CrunchLogo variant="mark" color="#dc2626" className="w-9 h-9 shrink-0" />
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-50 border border-brand-200 text-brand-700 text-[10px] font-black uppercase tracking-wider">
                <span>Staff & Admin Console</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sign In
            </h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Enter your credentials to access the management portal.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800 animate-slide-up">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 font-semibold leading-relaxed">{error}</div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@crunchrepublic.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
                />
              </div>
            </div>

            {/* Password Field with Show/Hide */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                  Password
                </label>
                <span className="text-[10px] font-bold text-slate-400">
                  Secured
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-600 via-rose-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 disabled:opacity-60 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg shadow-brand-600/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Station...</span>
                </>
              ) : (
                <>
                  <span>Sign In to POS Console</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick link to customer menu */}
          <div className="pt-2 text-center">
            <Link
              to="/menu"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline transition-colors"
            >
              ← Open Customer QR Menu View
            </Link>
          </div>
        </div>

        {/* Security watermark footer */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Role-Based Access Control</span>
          </div>
          <span>Crunch Republic © 2026</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
