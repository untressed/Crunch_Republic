import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  QrCode, 
  MapPin, 
  Clock, 
  Phone, 
  Sparkles, 
  ChevronRight, 
  Star, 
  Flame, 
  ShieldCheck, 
  ArrowRight,
  Coffee,
  CheckCircle2,
  Building2,
  UtensilsCrossed
} from 'lucide-react';
import CrunchLogo from '../components/CrunchLogo';
import { getMenuUrl, getAdminUrl } from '../utils/domainHelper';

const SmartAction = ({ href, className, children, title }) => {
  if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
    return (
      <a href={href} className={className} title={title}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className} title={title}>
      {children}
    </Link>
  );
};

const featuredDishes = [
  {
    name: 'Crunch Republic Special Burger (Veg)',
    category: 'Burgers',
    price: 139,
    tag: 'Bestseller',
    image: '/assets/dishes/burger_veg.webp',
    desc: 'Double-crisp golden patty topped with house signature sauce, melted cheese & garden crunch.'
  },
  {
    name: 'The Crunch Republic Special (Animal Fries)',
    category: 'Fries',
    price: 189,
    tag: 'Chef Choice',
    image: '/assets/dishes/fries_animal.webp',
    desc: 'Hot golden potato fries blanketed in rich melted cheddar, caramelized onions & secret dip.'
  },
  {
    name: 'Wai Wai Corn Dog',
    category: 'Corn Dogs',
    price: 129,
    tag: 'Trending',
    image: '/assets/dishes/corndog_ramen.webp',
    desc: 'Crispy ramen-crusted cheese corn dog served on a skewer with spicy mayo drizzle.'
  },
  {
    name: 'Crunch Republic Special Wrap (Non-Veg)',
    category: 'Wraps',
    price: 149,
    tag: 'Popular',
    image: '/assets/dishes/wrap_chicken.webp',
    desc: 'Juicy spiced chicken fillets rolled in a warm toasted tortilla with creamy garlic emulsion.'
  },
  {
    name: 'Hazelnut Hot Coffee',
    category: 'Coffee',
    price: 99,
    tag: 'Comfort',
    image: '/assets/dishes/coffee_hazelnut_hot.webp',
    desc: 'Freshly pulled aromatic espresso with velvety micro-foam and roasted hazelnut syrup.'
  },
  {
    name: 'Virgin Mojito Mocktail',
    category: 'Mocktails',
    price: 119,
    tag: 'Chilled',
    image: '/assets/dishes/mocktail_mojito.webp',
    desc: 'Muddled fresh mint leaves, zesty lime wedges & sparkling soda served over crushed ice.'
  }
];

const perks = [
  {
    icon: Flame,
    title: 'Cooked Fresh on Order',
    desc: 'No frozen reheated items. Every burger, fry and corn dog is cooked to order.'
  },
  {
    icon: QrCode,
    title: 'Scan & Order at Your Table',
    desc: 'Zero waiting for a waiter. Point your camera at the table QR code to browse & pay.'
  },
  {
    icon: Building2,
    title: 'Corporate Desk Delivery',
    desc: 'Dedicated office hubs for Amazon, Barclays, UKG, Infosys & more.'
  },
  {
    icon: ShieldCheck,
    title: 'Instant Cashfree UPI Checkout',
    desc: 'Pay in 2 seconds via GPay, PhonePe, Paytm, or Credit/Debit Card.'
  }
];

const LandingPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* 1. TOP NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-stone-950/85 border-b border-stone-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <CrunchLogo 
              variant="full" 
              isDark={true} 
              size="sm" 
              color="#DC2626"
              markClassName="w-10 h-10 shrink-0 drop-shadow-md group-hover:scale-105 transition-transform" 
            />
          </Link>

          <div className="flex items-center gap-3">
            <SmartAction
              href={getMenuUrl('type=takeaway')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-500 active:scale-95 text-white text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg shadow-brand-600/30 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Online</span>
            </SmartAction>

            <SmartAction
              href={getAdminUrl()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-white text-xs font-bold tracking-wide transition-colors"
              title="Cafe Staff & Admin Login"
            >
              <span>Staff Login</span>
            </SmartAction>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Brand Headline */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-950/80 border border-brand-800/60 text-brand-400 text-xs font-black uppercase tracking-widest shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Modern Digital Cafe Experience</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.06]">
                BUILD YOUR OWN.{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-300 to-amber-400 filter drop-shadow-sm">
                  TOP IT. LOVE IT.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-stone-300 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Welcome to <strong className="text-white">Crunch Republic</strong> — home of artisanal burgers, crispy ramen corn dogs, loaded animal fries, slow-simmered pastas, and specialty handcrafted shakes.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <SmartAction
                  href={getMenuUrl('type=takeaway')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-rose-600 hover:from-brand-500 hover:to-rose-500 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-brand-600/30 hover:shadow-brand-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Order Takeaway & Pickup</span>
                </SmartAction>

                <a
                  href="#dining-modes"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-stone-900/90 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-stone-200 font-bold text-sm tracking-wide transition-all"
                >
                  <QrCode className="w-5 h-5 text-amber-400" />
                  <span>How to Dine-In</span>
                </a>
              </div>

              {/* Quick Perks Strip */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-stone-800/80 text-left">
                <div>
                  <div className="text-2xl font-black text-white">52+</div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Dishes & Drinks</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-400">0 min</div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Waiter Waiting</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400">100%</div>
                  <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Live Tracking</div>
                </div>
              </div>
            </div>

            {/* Right Column: Signature Hero Dish Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Glowing Backing Frame */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-600 to-amber-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                
                <div className="relative bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-4">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-800">
                    <img 
                      src="/assets/dishes/burger_veg.webp" 
                      alt="Crunch Republic Burger" 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-brand-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                      Signature Bite
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white">Crunch Republic Special</h3>
                      <p className="text-xs text-stone-400">Burgers • Fries • Corn Dogs • Shakes</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-amber-400">₹139</span>
                    </div>
                  </div>

                  <SmartAction
                    href={getMenuUrl('type=takeaway')}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 border border-stone-700 text-stone-200 text-xs font-bold transition-all group"
                  >
                    <span>Browse complete digital menu</span>
                    <ArrowRight className="w-4 h-4 text-brand-400 group-hover:translate-x-1 transition-transform" />
                  </SmartAction>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SIGNATURE DISHES SHOWCASE */}
      <section className="py-20 bg-stone-900/50 border-y border-stone-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-black uppercase tracking-widest">
              Fan Favorites
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Crafted With Fresh Passion
            </h2>
            <p className="text-sm text-stone-400 font-medium">
              Made fresh using premium ingredients, signature blends, and toasted buns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDishes.map((dish, idx) => (
              <div 
                key={idx}
                className="group bg-stone-900 rounded-3xl border border-stone-800/80 hover:border-brand-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-brand-950/50"
              >
                <div>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-950 mb-4 border border-stone-800">
                    <img 
                      src={dish.image} 
                      alt={dish.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-amber-300 border border-stone-700 text-[10px] font-black uppercase tracking-wider">
                      {dish.tag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-500">
                      {dish.category}
                    </span>
                    <h3 className="text-base font-black text-white leading-snug group-hover:text-amber-300 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                      {dish.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-lg font-black text-white">₹{dish.price}</span>
                  <SmartAction
                    href={getMenuUrl('type=takeaway')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <span>Order</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </SmartAction>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <SmartAction
              href={getMenuUrl('type=takeaway')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white text-xs font-black uppercase tracking-wider transition-all"
            >
              <span>View All 52 Dishes & Drinks</span>
              <ArrowRight className="w-4 h-4 text-brand-400" />
            </SmartAction>
          </div>
        </div>
      </section>

      {/* 4. DINING & ORDERING MODES */}
      <section id="dining-modes" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[11px] font-black uppercase tracking-widest">
              Seamless Ordering
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Three Flexible Ways to Order
            </h2>
            <p className="text-sm text-stone-400 font-medium">
              Whether you are seated at our table, working at your corporate desk, or picking up on the go.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mode 1: Table Dine-In */}
            <div className="bg-stone-900 rounded-3xl p-8 border border-stone-800 flex flex-col justify-between hover:border-brand-500/40 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-950 border border-brand-800 text-brand-400 flex items-center justify-center">
                  <QrCode className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">1. Cafe Dine-In (Table QR)</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Have a seat at any table in our cafe. Point your smartphone camera at the custom acrylic tent QR card on your table. Your table number is instantly authenticated.
                </p>
                <div className="pt-2 space-y-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Live kitchen preparation updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Pay at table via Cashfree UPI</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800">
                <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block">
                  Scan QR code on your table
                </span>
              </div>
            </div>

            {/* Mode 2: Direct Takeaway */}
            <div className="bg-gradient-to-b from-stone-900 to-stone-950 rounded-3xl p-8 border-2 border-brand-600/60 flex flex-col justify-between shadow-xl shadow-brand-950/50 relative">
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-brand-600 text-white text-[10px] font-black uppercase tracking-wider">
                Instant Online
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">2. Direct Takeaway & Pickup</h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Ordering from home, office, or walk-in counter? Open our digital menu, customize your order, enter your mobile number, and pay online. We'll have it hot and packed for you.
                </p>
                <div className="pt-2 space-y-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>No wait in billing lines</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Apply exclusive promo coupons</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800/80">
                <SmartAction
                  href={getMenuUrl('type=takeaway')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-black text-xs uppercase tracking-wider transition-all"
                >
                  <span>Order Now</span>
                  <ArrowRight className="w-4 h-4" />
                </SmartAction>
              </div>
            </div>

            {/* Mode 3: Corporate Desk Delivery */}
            <div className="bg-stone-900 rounded-3xl p-8 border border-stone-800 flex flex-col justify-between hover:border-brand-500/40 transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-white">3. Corporate Desk Delivery</h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Exclusive perk for employees at our partner office hubs: Amazon, Barclays, UKG, Savista, LTM, ION, Pinelabs, and more.
                </p>
                <div className="pt-2 space-y-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Delivered direct to your office floor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Special corporate coupon discounts</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800">
                <span className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-wider block">
                  Scan official office pantry QR
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRAND PROMISES & QUALITY */}
      <section className="py-16 bg-stone-900/60 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 text-brand-400 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-white">{p.title}</h4>
                    <p className="text-xs text-stone-400 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. VISIT US & CONTACT FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-800/80 pt-16 pb-12 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
            
            {/* Col 1: Brand Lockup */}
            <div className="md:col-span-5 space-y-4">
              <CrunchLogo 
                variant="full" 
                isDark={true} 
                size="sm" 
                color="#DC2626"
                markClassName="w-10 h-10 shrink-0" 
              />
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                Crunch Republic is a contemporary fast-casual dining experience combining gourmet street comfort foods with frictionless digital ordering.
              </p>
              <div className="pt-2 flex items-center gap-4 text-stone-300">
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <MapPin className="w-4 h-4 text-brand-500" />
                  <span>Sector Cyber Hub / Tech Park</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>10:00 AM – 11:30 PM</span>
                </div>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Explore Menu</h4>
              <ul className="space-y-2">
                <li><SmartAction href={getMenuUrl('type=takeaway')} className="hover:text-white transition-colors">Burgers & Corn Dogs</SmartAction></li>
                <li><SmartAction href={getMenuUrl('type=takeaway')} className="hover:text-white transition-colors">Specialty Animal Fries</SmartAction></li>
                <li><SmartAction href={getMenuUrl('type=takeaway')} className="hover:text-white transition-colors">Artisanal Pastas & Wraps</SmartAction></li>
                <li><SmartAction href={getMenuUrl('type=takeaway')} className="hover:text-white transition-colors">Handcrafted Shakes & Mocktails</SmartAction></li>
                <li><SmartAction href={getMenuUrl('type=takeaway')} className="hover:text-white transition-colors">Hot Hazelnut Coffee & Chai</SmartAction></li>
              </ul>
            </div>

            {/* Col 3: Legal & Trust Center (Mandatory for Payment Gateway Approval) */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Legal & Consumer Policies</h4>
              <ul className="space-y-1.5 text-xs">
                <li><Link to="/contact" className="hover:text-amber-300 transition-colors">Contact Us & Support</Link></li>
                <li><Link to="/refund-policy" className="hover:text-amber-300 transition-colors">Refund & Cancellation Policy</Link></li>
                <li><Link to="/shipping-policy" className="hover:text-amber-300 transition-colors">Shipping & Order Fulfillment Policy</Link></li>
                <li><Link to="/terms" className="hover:text-amber-300 transition-colors">Terms and Conditions of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-amber-300 transition-colors">Privacy & Data Security Policy</Link></li>
              </ul>
              <div className="pt-2">
                <SmartAction
                  href={getAdminUrl()}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white text-[11px] font-bold transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-500" />
                  <span>Staff & Kitchen Portal</span>
                </SmartAction>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} Crunch Republic. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>FSSAI Certified</span>
              <span>•</span>
              <span>Cashfree Verified Gateway</span>
              <span>•</span>
              <span>Powered by Crunch Digital QR SaaS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

