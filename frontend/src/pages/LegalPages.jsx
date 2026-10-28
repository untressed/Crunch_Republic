import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileText, 
  RotateCcw, 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Lock, 
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  AlertCircle
} from 'lucide-react';
import CrunchLogo from '../components/CrunchLogo';

const PolicyModal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-950 border border-brand-800 text-brand-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-white">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center text-sm font-bold transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          {children}
        </div>
        <div className="p-4 border-t border-stone-800 bg-stone-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

const LegalPages = () => {
  const [modalType, setModalType] = useState(null);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Bar */}
      <nav className="border-b border-stone-800 bg-stone-950/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <CrunchLogo variant="full" isDark={true} size="sm" color="#DC2626" markClassName="w-10 h-10 shrink-0" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-950 border border-brand-800 text-brand-400 text-xs font-black uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5 text-brand-500" />
          <span>Compliance & Trust Center</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Legal Policies & Customer Terms
        </h1>
        <p className="text-sm sm:text-base text-stone-400 max-w-2xl mx-auto leading-relaxed">
          Crunch Republic is committed to ethical dining, secure digital transactions, and complete consumer transparency in compliance with Indian IT & Consumer Protection Rules.
        </p>
      </div>

      {/* Main Grid of 5 Policies */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Contact Us */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-500/40 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-800 text-amber-400 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Contact Us & Support</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Direct customer assistance for orders, billing queries, table reservations, and feedback.
              </p>
              <div className="pt-2 space-y-2.5 text-xs text-stone-300 border-t border-stone-800">
                <div className="flex items-center gap-2.5">
                  <Building2 className="w-4 h-4 text-brand-500 shrink-0" />
                  <span><strong>Entity:</strong> Crunch Republic Cafe & Dining</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>Sector Cyber Hub / Tech Park Commercial SEZ, India</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>+91 98111 22233 / +91 98000 00001</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>support@thecrunchrepublic.com</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>Operational Hours: 10:00 AM – 11:30 PM (7 Days a Week)</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setModalType('contact')}
              className="mt-6 w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              View Full Contact Details
            </button>
          </div>

          {/* 2. Refund & Cancellation */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-500/40 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-800 text-rose-400 flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Refund & Cancellation Policy</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Clear rules regarding order cancellation, preparation windows, and electronic payment refunds.
              </p>
              <div className="pt-2 space-y-2 text-xs text-stone-300 border-t border-stone-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Instant cancellation within 60 seconds if kitchen has not started cooking.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% refund for failed transactions, dish unavailability, or payment gateway debits.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>UPI / Card refunds processed within 3-5 business days directly to original payment source.</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setModalType('refund')}
              className="mt-6 w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Read Refund Policy
            </button>
          </div>

          {/* 3. Shipping & Delivery Policy */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-500/40 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-800 text-indigo-400 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Fulfillment & Delivery Policy</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Timelines for Dine-in table service, takeaway pickup counter, and campus corporate desk deliveries.
              </p>
              <div className="pt-2 space-y-2 text-xs text-stone-300 border-t border-stone-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Dine-In Table:</strong> Freshly prepared and served within 12-20 minutes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Takeaway Pickup:</strong> Packed in insulated containers, ready within 15-25 minutes.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Corporate Desk Delivery:</strong> Hand-delivered directly to partner building pantry/desk.</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setModalType('shipping')}
              className="mt-6 w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Read Delivery Policy
            </button>
          </div>

          {/* 4. Terms & Conditions */}
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-500/40 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Terms of Service</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Legal terms governing use of the website, menu pricing, QR token scanning, and dine-in code of conduct.
              </p>
              <div className="pt-2 space-y-2 text-xs text-stone-300 border-t border-stone-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Prices quoted in Indian Rupees (INR) with itemized GST breakdown at checkout.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Coupons and discounts (e.g. CRUNCH20) subject to minimum order thresholds.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>FSSAI food hygiene compliance maintained across all preparation stations.</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setModalType('terms')}
              className="mt-6 w-full py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Read Terms of Service
            </button>
          </div>

          {/* 5. Privacy Policy */}
          <div className="md:col-span-2 bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-brand-500/40 transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-950/80 border border-sky-800 text-sky-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-white">Privacy & Data Security Policy</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                How Crunch Republic protects your personal identity, mobile number, and financial data during digital ordering.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-stone-300 border-t border-stone-800">
                <div>
                  <h4 className="font-bold text-white mb-1">🔒 Zero Card Storage</h4>
                  <p className="text-stone-400 text-[11px]">We never store credit card numbers, CVVs, or UPI PINs. All payments are encrypted by Cashfree (PCI-DSS Level 1 compliant).</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">📱 Minimal Data Collection</h4>
                  <p className="text-stone-400 text-[11px]">We only record your mobile number and name to notify you when food is prepared and send your digital invoice.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">🚫 No Third-Party Spam</h4>
                  <p className="text-stone-400 text-[11px]">Your contact details are strictly confidential and never shared or sold to external marketing agencies.</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setModalType('privacy')}
              className="mt-6 w-full sm:w-auto px-8 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider transition-colors self-start"
            >
              Read Privacy Policy
            </button>
          </div>

        </div>
      </div>

      {/* MODAL 1: CONTACT US */}
      <PolicyModal title="Contact & Merchant Details" isOpen={modalType === 'contact'} onClose={() => setModalType(null)}>
        <p><strong>Merchant Legal Entity:</strong> Crunch Republic Cafe & Dining Solutions</p>
        <p><strong>Trading Name:</strong> Crunch Republic</p>
        <p><strong>Corporate & Outlet Address:</strong> Sector Cyber Hub / Tech Park Commercial SEZ, India</p>
        <p><strong>Operating Hours:</strong> Monday through Sunday, 10:00 AM to 11:30 PM IST</p>
        <p><strong>Grievance & Customer Support Email:</strong> support@thecrunchrepublic.com</p>
        <p><strong>Direct Helpline / WhatsApp:</strong> +91 98111 22233</p>
        <p>For any billing discrepancies, online transaction queries, or dietary inquiries, our manager will respond within 2-4 business hours.</p>
      </PolicyModal>

      {/* MODAL 2: REFUND POLICY */}
      <PolicyModal title="Refund, Cancellation & Return Policy" isOpen={modalType === 'refund'} onClose={() => setModalType(null)}>
        <h4 className="font-bold text-white">1. Cancellation Window</h4>
        <p>Because all food items at Crunch Republic are prepared fresh to order, cancellations can only be requested within <strong>60 seconds</strong> of submitting an order, provided the kitchen display has not marked the order as "Cooking / In Progress".</p>

        <h4 className="font-bold text-white">2. Automatic Refunds for Failed Transactions</h4>
        <p>In case an amount is debited from your bank account or UPI application but the order generation fails due to a network interruption, Cashfree will automatically reverse the full amount to your source account within <strong>24 to 48 hours</strong>.</p>

        <h4 className="font-bold text-white">3. Defective / Incorrect Items</h4>
        <p>If you receive an incorrect dish or have a hygiene/quality concern, please notify our counter staff or WhatsApp helpline (+91 98111 22233) immediately with your Order ID. Upon verification, we will promptly replace the dish or issue an immediate 100% refund.</p>

        <h4 className="font-bold text-white">4. Refund Settlement Method</h4>
        <p>Approved refunds are processed via the original payment gateway channel (UPI, Netbanking, or Debit/Credit Card) within <strong>3 to 5 business days</strong> according to RBI banking timelines.</p>
      </PolicyModal>

      {/* MODAL 3: SHIPPING & DELIVERY */}
      <PolicyModal title="Shipping & Order Fulfillment Policy" isOpen={modalType === 'shipping'} onClose={() => setModalType(null)}>
        <h4 className="font-bold text-white">1. Service Channels</h4>
        <p>Crunch Republic operates three primary service channels:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Dine-In Table Orders:</strong> Delivered straight to your table number within 12 to 20 minutes from the time payment is authorized.</li>
          <li><strong>Direct Takeaway / Pickup:</strong> Packaged in heat-sealed, tamper-evident containers and ready at our counter within 15 to 25 minutes.</li>
          <li><strong>Corporate Desk Delivery:</strong> Hand-delivered by dedicated runners to partner building floors (Amazon, Barclays, UKG, Infosys, etc.) during active delivery windows.</li>
        </ul>

        <h4 className="font-bold text-white">2. Delivery Charges</h4>
        <p>Dine-in and Takeaway counter pickups incur zero delivery charges. Corporate desk deliveries are subject to standard campus handling policies displayed transparently during checkout.</p>
      </PolicyModal>

      {/* MODAL 4: TERMS & CONDITIONS */}
      <PolicyModal title="Terms and Conditions of Use" isOpen={modalType === 'terms'} onClose={() => setModalType(null)}>
        <h4 className="font-bold text-white">1. Acceptance of Terms</h4>
        <p>By scanning our QR codes, visiting thecrunchrepublic.com, or placing an order, you agree to comply with these terms, prevailing restaurant safety guidelines, and relevant digital commerce laws of India.</p>

        <h4 className="font-bold text-white">2. Pricing & Taxes</h4>
        <p>All prices listed on the digital menu are in Indian Rupees (INR). GST and statutory restaurant service taxes are calculated at checkout in compliance with Government of India taxation laws.</p>

        <h4 className="font-bold text-white">3. Dietary & Allergen Disclaimer</h4>
        <p>While we take extreme care in segregating vegetarian and non-vegetarian preparation stations, dishes may come in contact with dairy, gluten, nuts, or soy. Customers with severe allergies are advised to specify instructions prior to ordering.</p>

        <h4 className="font-bold text-white">4. Governing Jurisdiction</h4>
        <p>Any disputes or grievances arising out of transactions on this portal shall be governed by the laws of India and subject to local jurisdiction.</p>
      </PolicyModal>

      {/* MODAL 5: PRIVACY POLICY */}
      <PolicyModal title="Privacy & Data Protection Policy" isOpen={modalType === 'privacy'} onClose={() => setModalType(null)}>
        <h4 className="font-bold text-white">1. Information We Collect</h4>
        <p>We only collect your Name, Mobile Number, Table/Desk Number, and Order Selection necessary to prepare your food and issue your billing invoice.</p>

        <h4 className="font-bold text-white">2. Payment Security</h4>
        <p>Crunch Republic does NOT collect, view, or store payment credentials, card numbers, or UPI PINs. All payment transactions are securely handled by <strong>Cashfree Payments India Pvt. Ltd.</strong> using 256-bit AES encryption.</p>

        <h4 className="font-bold text-white">3. Cookie & Session Policy</h4>
        <p>We use minimal session cookies to remember your active table number and cart items so your order is not lost while browsing.</p>
      </PolicyModal>

    </div>
  );
};

export default LegalPages;

