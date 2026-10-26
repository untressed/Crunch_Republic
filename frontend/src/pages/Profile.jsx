import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CrunchLogo from '../components/CrunchLogo';
import { useAuth } from '../context/AuthContext';
import { 
  Save, 
  Store, 
  MapPin, 
  Phone, 
  Clock, 
  Plus, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Building,
  CreditCard,
  Key,
  Percent,
  Layers,
  HelpCircle
} from 'lucide-react';

const Profile = () => {
  const { token, restaurant, updateLocalRestaurant } = useAuth();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [logo, setLogo] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cashfreeAppId, setCashfreeAppId] = useState('');
  const [cashfreeSecretKey, setCashfreeSecretKey] = useState('');
  const [cashfreeEnvironment, setCashfreeEnvironment] = useState('sandbox');
  const [cashfreeEnabled, setCashfreeEnabled] = useState(true);
  const [developerSplitVendorId, setDeveloperSplitVendorId] = useState('');
  const [developerSplitPercentage, setDeveloperSplitPercentage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Load details
  useEffect(() => {
    if (restaurant) {
      setName(restaurant.name || '');
      setAddress(restaurant.address || '');
      setContactNumber(restaurant.contactNumber || '');
      setOpeningHours(restaurant.openingHours || '');
      setLogo(restaurant.logo || '');
      setUpiId(restaurant.upiId || 'crunchrepublic@okaxis');
      setCashfreeAppId(restaurant.cashfreeAppId || '');
      setCashfreeSecretKey(restaurant.cashfreeSecretKey || '');
      setCashfreeEnvironment(restaurant.cashfreeEnvironment || 'sandbox');
      setCashfreeEnabled(restaurant.cashfreeEnabled ?? true);
      setDeveloperSplitVendorId(restaurant.developerSplitVendorId || '');
      setDeveloperSplitPercentage(restaurant.developerSplitPercentage !== undefined ? restaurant.developerSplitPercentage : 5);
    }
  }, [restaurant]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setLogo(reader.result);
    };
  };

  // Submit profile details
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !address || !contactNumber) {
      setStatusMsg({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      const response = await fetch('/api/restaurant/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          address,
          contactNumber,
          openingHours,
          logo,
          tables: restaurant?.tables || [],
          upiId,
          cashfreeAppId,
          cashfreeSecretKey,
          cashfreeEnvironment,
          cashfreeEnabled,
          developerSplitVendorId,
          developerSplitPercentage,
        }),
      });

      const data = await response.json();
      if (data.success) {
        updateLocalRestaurant(data.data);
        setStatusMsg({ type: 'success', text: 'Cafe settings and payment configurations updated successfully!' });
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Failed to update settings.' });
      }
    } catch (error) {
      console.error(error);
      setStatusMsg({ type: 'error', text: 'Server error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar title="Cafe Settings & Branding" />

        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Toast notifications */}
          {statusMsg.text && (
            <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold animate-slide-up ${
              statusMsg.type === 'success' 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                : 'bg-rose-50 border-rose-100 text-rose-700'
            }`}>
              <div className="flex items-center gap-2.5">
                {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-rose-500" />}
                <span>{statusMsg.text}</span>
              </div>
              <button 
                onClick={() => setStatusMsg({ type: '', text: '' })} 
                className="text-[10px] uppercase font-bold text-slate-400 hover:text-slate-600"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Intro Card */}
          <div className="surface-card p-6 bg-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold uppercase tracking-wider border border-brand-100">
                  Store Profile
                </span>
                <span className="text-xs text-slate-400 font-medium">Crunch Republic Single Outlet</span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-900">Cafe Information & Receipt Branding</h2>
              <p className="text-xs text-slate-500 max-w-xl">
                These details appear on your printed POS invoices, billing receipts, and the customer QR digital menu header.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Brand Logo (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="surface-card p-6 flex flex-col items-center text-center gap-4">
                  <div className="flex items-center gap-2 w-full border-b border-slate-100 pb-3">
                    <Store className="w-4.5 h-4.5 text-brand-600" />
                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">Cafe Logo</h3>
                  </div>

                  <div className="w-36 h-36 rounded-2xl border-2 border-dashed border-slate-200 hover:border-brand-500/50 flex flex-col items-center justify-center relative overflow-hidden transition-colors bg-white group shadow-sm">
                    {logo && (logo.startsWith('data:image') || logo.startsWith('http')) ? (
                      <>
                        <img 
                          src={logo} 
                          alt="Logo" 
                          onError={() => setLogo('')} 
                          className="w-full h-full object-contain p-2" 
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[11px] font-bold text-white transition-opacity cursor-pointer">
                          Change Logo
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-3 text-center cursor-pointer select-none">
                        <CrunchLogo variant="mark" color="#dc2626" className="w-14 h-14 group-hover:scale-105 transition-transform drop-shadow-sm mb-1.5" />
                        <span className="text-[10px] font-black text-brand-700 uppercase tracking-tight">Official Brand Mark</span>
                        <span className="text-[9px] text-slate-400 font-semibold mt-0.5">Click to customize</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Recommended: Square PNG/JPEG (at least 200x200px) with transparent or white background.
                  </p>
                </div>
              </div>

              {/* Right Column: Cafe Info (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div className="surface-card p-6 space-y-5">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building className="w-4.5 h-4.5 text-brand-600" />
                    <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-tight">Store Details</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cafe Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Crunch Republic"
                        className="w-full px-4 py-2.5 surface-input font-medium"
                      />
                    </div>

                    {/* Contact Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact Phone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={contactNumber}
                          onChange={(e) => setContactNumber(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-4 py-2.5 surface-input font-medium"
                        />
                      </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Operating Hours</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          value={openingHours}
                          onChange={(e) => setOpeningHours(e.target.value)}
                          placeholder="e.g. 10:00 AM - 11:00 PM"
                          className="w-full pl-9 pr-4 py-2.5 surface-input font-medium"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Physical Address *</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <textarea
                          rows="3"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Full street address, landmark, city and pincode..."
                          className="w-full pl-9 pr-4 py-2.5 surface-input font-medium resize-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {/* ============================================================== */}
                  {/* PAYMENT GATEWAY & DEVELOPER SPLIT CONFIGURATION               */}
                  {/* ============================================================== */}
                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-brand-600" />
                        <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">Payment Gateway & Split Settlements</h4>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Cashfree Payments
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Direct UPI VPA */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Restaurant UPI VPA (Direct Bank)</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. crunchrepublic@okaxis"
                          className="w-full px-4 py-2.5 surface-input font-medium"
                        />
                        <span className="text-[9px] text-slate-400">Used for direct 0% commission QR payments</span>
                      </div>

                      {/* Cashfree Environment */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cashfree Environment</label>
                        <select
                          value={cashfreeEnvironment}
                          onChange={(e) => setCashfreeEnvironment(e.target.value)}
                          className="w-full px-4 py-2.5 surface-input font-medium bg-white"
                        >
                          <option value="sandbox">Sandbox (Testing / Development)</option>
                          <option value="production">Production (Real Money)</option>
                        </select>
                        <span className="text-[9px] text-slate-400">Use Sandbox while testing to avoid live debit</span>
                      </div>

                      {/* Cashfree App ID */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cashfree App ID / Client ID</label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            value={cashfreeAppId}
                            onChange={(e) => setCashfreeAppId(e.target.value)}
                            placeholder="e.g. CF_TEST_APP_ID..."
                            className="w-full pl-9 pr-4 py-2.5 surface-input font-medium font-mono text-xs"
                          />
                        </div>
                      </div>

                      {/* Cashfree Secret Key */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cashfree Secret Key</label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="password"
                            value={cashfreeSecretKey}
                            onChange={(e) => setCashfreeSecretKey(e.target.value)}
                            placeholder="e.g. cfsk_ma_test_..."
                            className="w-full pl-9 pr-4 py-2.5 surface-input font-medium font-mono text-xs"
                          />
                        </div>
                      </div>

                      {/* Developer Split Vendor ID */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Developer / Agency Vendor ID (Easy Split)
                        </label>
                        <input
                          type="text"
                          value={developerSplitVendorId}
                          onChange={(e) => setDeveloperSplitVendorId(e.target.value)}
                          placeholder="e.g. dev_vendor_01"
                          className="w-full px-4 py-2.5 surface-input font-medium font-mono text-xs"
                        />
                        <span className="text-[9px] text-slate-400">Vendor ID created in Cashfree Dashboard for split payouts</span>
                      </div>

                      {/* Developer Split Percentage */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Developer Maintenance Cut (%)
                        </label>
                        <div className="relative">
                          <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="number"
                            min="0"
                            max="50"
                            step="0.5"
                            value={developerSplitPercentage}
                            onChange={(e) => setDeveloperSplitPercentage(Number(e.target.value))}
                            placeholder="5"
                            className="w-full pl-9 pr-4 py-2.5 surface-input font-medium font-mono text-xs"
                          />
                        </div>
                        <span className="text-[9px] text-slate-400">Default: 5% automatically routed to developer on every online order</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                      <div className="font-bold text-slate-800 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-brand-600" />
                        How Split Settlements Work:
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-500">
                        When a diner pays ₹1,000 online via Cashfree, {developerSplitPercentage}% (₹{(1000 * (developerSplitPercentage / 100)).toFixed(0)}) automatically routes to your developer account, and the remaining {(100 - developerSplitPercentage)}% (₹{(1000 * ((100 - developerSplitPercentage) / 100)).toFixed(0)}) settles directly to the restaurant bank account via Cashfree Easy Split.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md shadow-brand-500/20 transition-all disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>{loading ? 'Saving...' : 'Save Settings & Payment Config'}</span>
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </form>

        </main>
      </div>
    </div>
  );
};

export default Profile;
