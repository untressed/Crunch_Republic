import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import CustomDropdown from '../components/CustomDropdown';
import { useAuth } from '../context/AuthContext';
import {
  Ticket,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Check,
  Power,
  Sparkles,
  TrendingUp,
  Tag,
  Building2,
  UtensilsCrossed,
  Layers,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Clock,
  ArrowRight,
  UserCheck,
  Users,
  Smartphone
} from 'lucide-react';

const Offers = () => {
  const { token } = useAuth();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterChannel, setFilterChannel] = useState('all'); // 'all' | 'dine_in' | 'company_delivery'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'active' | 'inactive'
  const [filterAudience, setFilterAudience] = useState('all'); // 'all' | 'first_order' | 'repeat_customers'
  const [searchQuery, setSearchQuery] = useState('');

  // Notification Toast
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [copiedCode, setCopiedCode] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [discountType, setDiscountType] = useState('percentage');
  const [discountValue, setDiscountValue] = useState(20);
  const [minOrderValue, setMinOrderValue] = useState(199);
  const [maxDiscount, setMaxDiscount] = useState(100);
  const [applicableFor, setApplicableFor] = useState('all');
  const [targetAudience, setTargetAudience] = useState('all'); // 'all' | 'first_order' | 'repeat_customers'
  const [usageLimitPerUser, setUsageLimitPerUser] = useState(1);
  const [badgeText, setBadgeText] = useState('SPECIAL DEAL');
  const [bannerColor, setBannerColor] = useState('rose');
  const [endDate, setEndDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  // Fetch all offers
  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/offers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOffers(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching offers:', err);
      setStatusMsg({ type: 'error', text: 'Failed to load offers from server.' });
    } finally {
      setLoading(false);
    }
  };

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setEditingOffer(null);
    setTitle('');
    setCode('');
    setDescription('');
    setDiscountType('percentage');
    setDiscountValue(20);
    setMinOrderValue(199);
    setMaxDiscount(100);
    setApplicableFor('all');
    setTargetAudience('all');
    setUsageLimitPerUser(1);
    setBadgeText('SPECIAL DEAL');
    setBannerColor('rose');
    setEndDate('');
    setIsActive(true);
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (off) => {
    setEditingOffer(off);
    setTitle(off.title || '');
    setCode(off.code || '');
    setDescription(off.description || '');
    setDiscountType(off.discountType || 'percentage');
    setDiscountValue(off.discountValue || 0);
    setMinOrderValue(off.minOrderValue || 0);
    setMaxDiscount(off.maxDiscount || '');
    setApplicableFor(off.applicableFor || 'all');
    setTargetAudience(off.targetAudience || 'all');
    setUsageLimitPerUser(off.usageLimitPerUser || 1);
    setBadgeText(off.badgeText || 'SPECIAL DEAL');
    setBannerColor(off.bannerColor || 'rose');
    setEndDate(off.endDate ? new Date(off.endDate).toISOString().split('T')[0] : '');
    setIsActive(off.isActive);
    setShowModal(true);
  };

  // Generate random promo code suggestion
  const generateRandomCode = () => {
    const prefixes = ['CRUNCH', 'FEAST', 'YUM', 'BITE', 'TASTY', 'SUPER'];
    const p = prefixes[Math.floor(Math.random() * prefixes.length)];
    const val = discountType === 'percentage' ? discountValue : 'DEAL';
    setCode(`${p}${val}`.toUpperCase());
  };

  // Save / Update Offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim() || !discountValue) {
      setStatusMsg({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setSubmitting(true);
    const payload = {
      title: title.trim(),
      code: code.trim().toUpperCase(),
      description: description.trim(),
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue) || 0,
      maxDiscount: discountType === 'percentage' && maxDiscount ? Number(maxDiscount) : null,
      applicableFor,
      targetAudience,
      usageLimitPerUser: Number(usageLimitPerUser) || 1,
      badgeText: badgeText.trim() || 'SPECIAL DEAL',
      bannerColor,
      endDate: endDate ? new Date(endDate) : null,
      isActive,
    };

    try {
      const url = editingOffer ? `/api/offers/${editingOffer._id}` : '/api/offers';
      const method = editingOffer ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setShowModal(false);
        setStatusMsg({
          type: 'success',
          text: editingOffer
            ? `Offer "${data.data.code}" updated successfully!`
            : `New promo deal "${data.data.code}" launched!`,
        });
        fetchOffers();
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Failed to save offer.' });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Server error saving offer.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Active/Paused Status
  const handleToggleStatus = async (offerId) => {
    try {
      const res = await fetch(`/api/offers/${offerId}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOffers(offers.map((o) => (o._id === offerId ? data.data : o)));
        setStatusMsg({ type: 'success', text: data.message });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Offer
  const handleDelete = async (offerId, offerCode) => {
    if (!window.confirm(`Are you sure you want to delete promo code "${offerCode}"?`)) return;

    try {
      const res = await fetch(`/api/offers/${offerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOffers(offers.filter((o) => o._id !== offerId));
        setStatusMsg({ type: 'success', text: `Offer "${offerCode}" removed.` });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Copy code to clipboard
  const handleCopyCode = (promoCode) => {
    navigator.clipboard.writeText(promoCode);
    setCopiedCode(promoCode);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  // Filtered offers
  const filteredOffers = offers.filter((o) => {
    const matchChannel = filterChannel === 'all' || o.applicableFor === 'all' || o.applicableFor === filterChannel;
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' ? o.isActive : !o.isActive);
    const matchAudience = filterAudience === 'all' || (o.targetAudience || 'all') === filterAudience;
    const matchSearch =
      !searchQuery.trim() ||
      o.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchChannel && matchStatus && matchAudience && matchSearch;
  });

  // KPI Metrics
  const activeCount = offers.filter((o) => o.isActive).length;
  const totalRedemptions = offers.reduce((acc, curr) => acc + (curr.usageCount || 0), 0);
  const corporateDealsCount = offers.filter(
    (o) => o.applicableFor === 'company_delivery' || o.applicableFor === 'all'
  ).length;

  // Banner color theme map
  const colorStyles = {
    rose: {
      gradient: 'from-rose-500 to-rose-600',
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
      codeBorder: 'border-rose-300 bg-rose-50/60 text-rose-900',
      accentText: 'text-rose-600',
    },
    indigo: {
      gradient: 'from-indigo-500 to-indigo-600',
      badge: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      codeBorder: 'border-indigo-300 bg-indigo-50/60 text-indigo-900',
      accentText: 'text-indigo-600',
    },
    amber: {
      gradient: 'from-amber-500 to-amber-600',
      badge: 'bg-amber-100 text-amber-900 border-amber-200',
      codeBorder: 'border-amber-300 bg-amber-50/60 text-amber-900',
      accentText: 'text-amber-600',
    },
    emerald: {
      gradient: 'from-emerald-500 to-emerald-600',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      codeBorder: 'border-emerald-300 bg-emerald-50/60 text-emerald-900',
      accentText: 'text-emerald-600',
    },
    purple: {
      gradient: 'from-purple-500 to-purple-600',
      badge: 'bg-purple-100 text-purple-800 border-purple-200',
      codeBorder: 'border-purple-300 bg-purple-50/60 text-purple-900',
      accentText: 'text-purple-600',
    },
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar title="Offers & Promotional Deals" />

        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Notification Toast */}
          {statusMsg.text && (
            <div
              className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs font-semibold animate-slide-up ${
                statusMsg.type === 'success'
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
                  : 'bg-rose-50 border-rose-100 text-rose-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {statusMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                )}
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

          {/* Top KPI Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="surface-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Offers</span>
                <h4 className="text-2xl font-black text-slate-900 leading-tight">{offers.length}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Created coupons & deals</p>
              </div>
            </div>

            <div className="surface-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Deals</span>
                <h4 className="text-2xl font-black text-slate-900 leading-tight">{activeCount}</h4>
                <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Visible on customer QR menu</p>
              </div>
            </div>

            <div className="surface-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Customer Redemptions</span>
                <h4 className="text-2xl font-black text-slate-900 leading-tight">{totalRedemptions}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Orders placed with coupon</p>
              </div>
            </div>

            <div className="surface-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Corporate Deals</span>
                <h4 className="text-2xl font-black text-slate-900 leading-tight">{corporateDealsCount}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Office delivery promotions</p>
              </div>
            </div>
          </div>

          {/* Action Bar & Filters */}
          <div className="surface-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Channel Filter */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                <button
                  onClick={() => setFilterChannel('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    filterChannel === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'
                  }`}
                >
                  All Channels
                </button>
                <button
                  onClick={() => setFilterChannel('dine_in')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    filterChannel === 'dine_in' ? 'bg-white text-brand-600 shadow-sm' : 'hover:text-slate-900'
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5" />
                  <span>Dine-In</span>
                </button>
                <button
                  onClick={() => setFilterChannel('company_delivery')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    filterChannel === 'company_delivery' ? 'bg-white text-indigo-600 shadow-sm' : 'hover:text-slate-900'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Corporate Delivery</span>
                </button>
              </div>

              {/* Status Filter */}
              <CustomDropdown
                options={[
                  { value: 'all', label: 'Status: All' },
                  { value: 'active', label: 'Active Only' },
                  { value: 'inactive', label: 'Paused Only' },
                ]}
                value={filterStatus}
                onChange={(val) => setFilterStatus(val)}
                fullWidth={false}
                className="w-32"
                size="sm"
                variant="filter"
              />

              {/* Customer Audience Filter */}
              <CustomDropdown
                options={[
                  { value: 'all', label: 'Audience: All Customers' },
                  { value: 'first_order', label: '🎉 1st-Time Customers Only' },
                  { value: 'repeat_customers', label: '⭐ Regulars (1+ Orders)' },
                ]}
                value={filterAudience}
                onChange={(val) => setFilterAudience(val)}
                fullWidth={false}
                className="w-56"
                size="sm"
                variant="filter"
              />

              {/* Search input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search offer or coupon..."
                className="px-3 py-1.5 surface-input text-xs w-48"
              />
            </div>

            {/* Launch New Offer Button */}
            <button
              onClick={handleOpenCreateModal}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-brand-500/20 transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Launch New Offer</span>
            </button>
          </div>

          {/* Offers Display Grid */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
              <span className="text-xs font-bold uppercase tracking-wider">Loading Crunch Republic Offers...</span>
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="surface-card p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Ticket className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-slate-800">No Offers Found</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                No promotions match your current filters. Click below to launch a new promo deal or coupon code!
              </p>
              <button
                onClick={handleOpenCreateModal}
                className="mt-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create Offer Now</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((off) => {
                const theme = colorStyles[off.bannerColor] || colorStyles.rose;
                const isCopied = copiedCode === off.code;

                return (
                  <div
                    key={off._id}
                    className={`surface-card overflow-hidden flex flex-col justify-between transition-all duration-200 border relative group hover:shadow-lg ${
                      off.isActive ? 'border-slate-200/90' : 'opacity-70 border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    {/* Voucher Top Header */}
                    <div className={`p-4 bg-gradient-to-r ${theme.gradient} text-white flex items-center justify-between`}>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-sm border border-white/30 text-white">
                          {off.badgeText || 'SPECIAL DEAL'}
                        </span>
                        {off.applicableFor === 'company_delivery' && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/20 text-white flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            Office
                          </span>
                        )}
                        {off.applicableFor === 'dine_in' && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-black/20 text-white flex items-center gap-1">
                            <UtensilsCrossed className="w-3 h-3" />
                            Dine-In
                          </span>
                        )}
                        {off.targetAudience === 'first_order' && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-900 flex items-center gap-1 shadow-xs">
                            <Sparkles className="w-3 h-3 text-amber-900" />
                            1st Order
                          </span>
                        )}
                        {off.targetAudience === 'repeat_customers' && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-200 text-indigo-950 flex items-center gap-1 shadow-xs">
                            <UserCheck className="w-3 h-3 text-indigo-900" />
                            Regulars
                          </span>
                        )}
                      </div>

                      {/* Active Toggle Switch */}
                      <button
                        onClick={() => handleToggleStatus(off._id)}
                        title={off.isActive ? 'Pause offer' : 'Activate offer'}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase transition-all shrink-0 ${
                          off.isActive
                            ? 'bg-emerald-500 text-white shadow-sm'
                            : 'bg-black/40 text-slate-200 hover:bg-black/60'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${off.isActive ? 'bg-white' : 'bg-rose-400'}`}></span>
                        <span>{off.isActive ? 'Live' : 'Paused'}</span>
                      </button>
                    </div>

                    {/* Voucher Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-slate-900 tracking-tight">
                            {off.discountType === 'percentage' ? `${off.discountValue}%` : `₹${off.discountValue}`}
                          </span>
                          <span className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">OFF</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-800 mt-1 leading-snug">{off.title}</h4>
                        {off.description && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {off.description}
                          </p>
                        )}
                      </div>

                      {/* Coupon Code Strip */}
                      <div className="pt-2">
                        <div className={`p-2.5 rounded-xl border border-dashed flex items-center justify-between ${theme.codeBorder}`}>
                          <div className="flex flex-col min-w-0">
                            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Promo Code</span>
                            <span className="text-sm font-black font-mono tracking-wider text-slate-900 truncate">
                              {off.code}
                            </span>
                          </div>

                          <button
                            onClick={() => handleCopyCode(off.code)}
                            className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px] font-bold"
                            title="Copy promo code"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Eligibility Rules */}
                      <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Tag className="w-3.5 h-3.5 text-slate-400" />
                            <span>
                              {off.minOrderValue > 0 ? `Min Order: ₹${off.minOrderValue}` : 'No minimum order'}
                            </span>
                          </div>
                          {off.discountType === 'percentage' && off.maxDiscount && (
                            <span className="text-slate-400 text-[10px]">
                              Max cap: ₹{off.maxDiscount}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-[10px] pt-1 border-t border-slate-50">
                          <div className="flex items-center gap-1">
                            <Smartphone className="w-3.5 h-3.5 text-brand-500" />
                            <span className="font-semibold text-slate-700">
                              {off.targetAudience === 'first_order'
                                ? '🎉 1st Order / Phone'
                                : off.targetAudience === 'repeat_customers'
                                ? '⭐ Regulars Only'
                                : '👥 All Customers'}
                              {' · '}
                              {off.usageLimitPerUser ? `Max ${off.usageLimitPerUser}x / mobile` : 'Max 1x / mobile'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 text-slate-400">
                            <TrendingUp className="w-3 h-3 text-emerald-500" />
                            <span>{off.usageCount || 0} claims</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Voucher Footer Action Buttons */}
                    <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                        {off.endDate ? (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Valid till {new Date(off.endDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-emerald-600 font-bold">
                            <Sparkles className="w-3 h-3" />
                            Ongoing Offer
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditModal(off)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-white rounded-lg transition-all"
                          title="Edit offer details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(off._id, off.code)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete offer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* ===================== MODAL: CREATE / EDIT OFFER ===================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scale-up border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-brand-600" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                  {editingOffer ? `Edit Offer: ${editingOffer.code}` : 'Launch New Promotional Offer'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Offer Title */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Offer Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Welcome Cruncher: 20% OFF or Desk Lunch Deal"
                  className="w-full px-3.5 py-2 surface-input text-xs"
                />
              </div>

              {/* Promo Code with Quick Generator */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Coupon Code *</label>
                  <button
                    type="button"
                    onClick={generateRandomCode}
                    className="text-[10px] font-extrabold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Generate Code</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. CRUNCH20 or OFFICE50"
                  className="w-full px-3.5 py-2 surface-input text-xs uppercase font-mono font-bold tracking-wider"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Description / Terms</label>
                <textarea
                  rows="2"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Valid across all fresh salad bowls and cold brews. Applicable once per customer."
                  className="w-full px-3.5 py-2 surface-input text-xs resize-none"
                />
              </div>

              {/* Discount Type & Value */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Discount Type</label>
                  <CustomDropdown
                    options={[
                      { value: 'percentage', label: 'Percentage Discount (%)' },
                      { value: 'flat', label: 'Flat Cash Discount (₹)' },
                    ]}
                    value={discountType}
                    onChange={(val) => setDiscountType(val)}
                    size="md"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {discountType === 'percentage' ? 'Discount Percentage (%) *' : 'Flat Discount Amount (₹) *'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={discountType === 'percentage' ? '100' : '10000'}
                    required
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    className="w-full h-9 px-3 py-1.5 surface-input text-xs font-bold"
                  />
                </div>
              </div>

              {/* Minimum Order Value & Max Discount Cap */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Min Order Value (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={minOrderValue}
                    onChange={(e) => setMinOrderValue(e.target.value)}
                    placeholder="0 for no minimum"
                    className="w-full h-9 px-3 py-1.5 surface-input text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Max Discount Cap (₹)
                  </label>
                  <input
                    type="number"
                    min="1"
                    disabled={discountType === 'flat'}
                    value={maxDiscount}
                    onChange={(e) => setMaxDiscount(e.target.value)}
                    placeholder={discountType === 'flat' ? 'N/A for flat' : 'e.g. 100'}
                    className="w-full h-9 px-3 py-1.5 surface-input text-xs disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Applicable Channel & Badge */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Applicable Channel</label>
                  <CustomDropdown
                    options={[
                      { value: 'all', label: 'All Channels (Dine-in & Office)' },
                      { value: 'dine_in', label: 'Dine-In Tables Only' },
                      { value: 'company_delivery', label: 'Corporate Delivery Only' },
                    ]}
                    value={applicableFor}
                    onChange={(val) => setApplicableFor(val)}
                    size="md"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Badge Tag</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value.toUpperCase())}
                    placeholder="e.g. HOT DEAL, LIMITED"
                    className="w-full h-9 px-3 py-1.5 surface-input text-xs font-bold uppercase"
                  />
                </div>
              </div>

              {/* Customer Eligibility & Usage Limit Per Phone */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                  <UserCheck className="w-4 h-4 text-brand-600" />
                  <span>Customer Mobile Verification & Eligibility</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Target Audience *
                    </label>
                    <CustomDropdown
                      options={[
                        { value: 'all', label: '👥 All Customers (New & Repeat)' },
                        { value: 'first_order', label: '🎉 First-Time Order Only (0 prior orders)' },
                        { value: 'repeat_customers', label: '⭐ Regulars Only (1+ prior orders)' },
                      ]}
                      value={targetAudience}
                      onChange={(val) => setTargetAudience(val)}
                      size="md"
                    />
                    <span className="text-[10px] text-slate-400">
                      Verified via customer mobile number at QR checkout.
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Per-Phone Claim Limit *
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      required
                      value={usageLimitPerUser}
                      onChange={(e) => setUsageLimitPerUser(e.target.value)}
                      className="w-full h-9 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                    />
                    <span className="text-[10px] text-slate-400">
                      Prevents customers from reusing deal on same mobile.
                    </span>
                  </div>
                </div>
              </div>

              {/* Color Theme & Expiry Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Banner Theme</label>
                  <CustomDropdown
                    options={[
                      { value: 'rose', label: 'Crunch Rose (Default)' },
                      { value: 'indigo', label: 'Corporate Indigo' },
                      { value: 'amber', label: 'Warm Amber' },
                      { value: 'emerald', label: 'Fresh Emerald' },
                      { value: 'purple', label: 'Royal Purple' },
                    ]}
                    value={bannerColor}
                    onChange={(val) => setBannerColor(val)}
                    size="md"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Expiration Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 surface-input text-xs"
                  />
                </div>
              </div>

              {/* Live Active Status Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-brand-600 focus:ring-brand-500 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="isActiveToggle" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                  Make this offer active immediately on the Customer Menu
                </label>
              </div>

              {/* Modal Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingOffer ? 'Save Changes' : 'Launch Offer'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offers;
