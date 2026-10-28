import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import CrunchLogo from '../components/CrunchLogo';
import { 
  QrCode, 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Building2,
  UtensilsCrossed,
  Layers,
  MapPin,
  Phone,
  User,
  ExternalLink,
  Sparkles,
  Search,
  Edit3,
  Copy,
  Check
} from 'lucide-react';

// Client-side Canvas utility to composite official Crunch Republic logo right in the center of QR code
const embedCrunchRepublicLogo = (qrDataUrl, label = 'CR') => {
  return new Promise((resolve) => {
    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.src = qrDataUrl;
    qrImg.onload = () => {
      const size = 640;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // Draw base QR code
      ctx.drawImage(qrImg, 0, 0, size, size);

      // Dimensions for centered brand emblem
      const emblemSize = Math.floor(size * 0.23);
      const pos = (size - emblemSize) / 2;

      // 1. Clean protective white plate with rounded corners
      ctx.save();
      ctx.beginPath();
      const pad = 7;
      const boxSize = emblemSize + (pad * 2);
      const boxPos = pos - pad;
      const radius = 18;
      if (ctx.roundRect) {
        ctx.roundRect(boxPos, boxPos, boxSize, boxSize, radius);
      } else {
        ctx.rect(boxPos, boxPos, boxSize, boxSize);
      }
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 2;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#f1f5f9';
      ctx.stroke();
      ctx.restore();

      // 2. Render Official Crunch Republic Logo (/assets/logo.svg)
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      logoImg.src = '/assets/logo.svg';

      const renderFallbackVector = () => {
        try {
          // Official Crunch Republic Monogram vector path (222x218 viewBox)
          const officialPath = new Path2D("M 103.500 11.646 C 92.445 12.775, 76.831 17.625, 68.011 22.671 C 52.092 31.775, 36.742 48.278, 28.891 64.728 C 19.662 84.065, 17.339 107.418, 22.532 128.651 C 24.676 137.416, 31.711 152.440, 37.413 160.430 C 55.739 186.111, 90.616 201.921, 120.428 198.061 C 130.390 196.771, 135.016 195.361, 134.971 193.629 C 134.941 192.469, 119.271 170.166, 115.257 165.569 C 113.377 163.416, 112.155 163, 107.717 163 C 95.088 163, 79.962 156.256, 70.147 146.249 C 59.539 135.435, 54 121.219, 54 104.809 C 54 88.294, 59.779 74.289, 71.500 62.399 C 85.368 48.331, 104.726 42.233, 123.201 46.113 C 132.470 48.059, 142.521 53.374, 149.371 59.952 C 152.835 63.278, 156.092 66, 156.607 66 C 157.462 66, 169.414 54.111, 176.424 46.287 L 179.302 43.075 175.678 38.652 C 171.665 33.755, 161.494 25.920, 152.925 21.126 C 147.351 18.007, 139.475 15.161, 131 13.202 C 125.744 11.988, 109.277 11.056, 103.500 11.646 M 88.151 87.318 C 87.287 88.359, 87.042 97.021, 87.235 119.620 L 87.500 150.500 102.170 151 C 110.239 151.275, 117.200 151.860, 117.638 152.301 C 118.541 153.208, 133.191 173.761, 147.488 194.180 C 152.757 201.705, 158.358 209.242, 159.935 210.930 L 162.802 214 179.151 213.985 C 188.143 213.976, 196.104 213.586, 196.843 213.118 C 197.871 212.467, 196.583 209.986, 191.343 202.525 C 187.579 197.167, 181.011 187.787, 176.747 181.679 L 168.994 170.575 173.383 166.037 C 183.020 156.075, 187.259 145.720, 187.337 131.946 C 187.381 124.170, 186.953 121.285, 185.033 116.446 C 179.669 102.920, 169.132 92.469, 156.649 88.296 C 149.483 85.900, 90.032 85.052, 88.151 87.318 M 118.469 118.220 C 118.179 118.975, 118.068 126.096, 118.221 134.046 L 118.500 148.500 131 148.789 C 145.473 149.124, 146.776 148.901, 150.960 145.381 C 159.322 138.344, 158.700 126.352, 149.619 119.562 C 147.202 117.755, 145.138 117.460, 132.928 117.174 C 121.820 116.915, 118.889 117.127, 118.469 118.220");
          ctx.save();
          const scale = emblemSize / 222;
          ctx.translate(pos, pos);
          ctx.scale(scale, scale);
          ctx.fillStyle = '#B91C1C';
          ctx.fill(officialPath, 'evenodd');
          ctx.restore();
        } catch (e) {
          ctx.fillStyle = '#B91C1C';
          ctx.font = '900 ' + Math.floor(emblemSize * 0.45) + 'px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('CR', size / 2, size / 2);
        }
        resolve(canvas.toDataURL('image/png'));
      };

      logoImg.onload = () => {
        // Draw the exact official Crunch Republic SVG mark centered inside the protective plate
        ctx.drawImage(logoImg, pos, pos, emblemSize, emblemSize);
        resolve(canvas.toDataURL('image/png'));
      };

      logoImg.onerror = () => {
        renderFallbackVector();
      };
    };
  });
};

// Corporate Delivery Partner Grid Card with embedded QR code, link copying, edit and print actions
const CorporateCompanyCard = ({ 
  company, 
  token, 
  onEdit, 
  onDelete, 
  onPrint, 
  onDownload 
}) => {
  const [qrUrl, setQrUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!company?.name) {
      setLoading(false);
      return;
    }
    const fetchQr = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/restaurant/qr?orderType=company_delivery&companyName=${encodeURIComponent(company.name)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();
        if (data.success && isMounted) {
          setTargetUrl(data.data.targetUrl || '');
          const branded = await embedCrunchRepublicLogo(data.data.qrCodeUrl, 'CR');
          if (isMounted) {
            setQrUrl(branded);
          }
        }
      } catch (err) {
        console.error('Error generating card QR:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchQr();
    return () => {
      isMounted = false;
    };
  }, [company?.name, token]);

  const handleCopyLink = () => {
    if (!targetUrl) return;
    navigator.clipboard.writeText(targetUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-brand-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      {/* Top Details & Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 font-bold shrink-0 shadow-xs group-hover:bg-brand-600 group-hover:text-white transition-colors">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-extrabold text-slate-900 truncate" title={company.name}>
                {company.name}
              </h4>
              <span className="inline-block mt-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 uppercase tracking-wider">
                Corporate Hub
              </span>
            </div>
          </div>

          {/* Quick Actions (Edit / Delete) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onEdit(company)}
              title="Edit Company Details"
              className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(company._id || company.name, company.name)}
              title="Delete Company"
              className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Branded QR Code Box */}
        <div className="my-4 p-3 bg-slate-50/80 rounded-2xl border border-slate-100 flex flex-col items-center justify-center relative">
          <div className="w-44 h-44 bg-white rounded-xl border border-slate-200/80 p-2.5 flex items-center justify-center shadow-xs">
            {loading ? (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin text-brand-600" />
                <span className="text-[10px] font-bold">Signing QR...</span>
              </div>
            ) : qrUrl ? (
              <img
                src={qrUrl}
                alt={`${company.name} Branded QR`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-[10px] text-slate-400 font-bold">Failed to load QR</div>
            )}
          </div>

          {/* Customer URL Copy Bar */}
          <div className="w-full mt-3 flex items-center justify-between gap-2 px-2.5 py-1.5 bg-white rounded-xl border border-slate-200/70 text-[10px]">
            <span className="text-slate-500 font-mono truncate select-all" title={targetUrl}>
              {targetUrl ? targetUrl.replace('https://', '') : 'Generating link...'}
            </span>
            <button
              onClick={handleCopyLink}
              disabled={!targetUrl}
              className="text-slate-500 hover:text-brand-600 shrink-0 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
              title="Copy Customer QR URL"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Company Details / Features */}
        <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-[11px] leading-tight text-slate-600 line-clamp-1" title={company.address}>
              {company.address || 'Pantry / Main Floor Desk'}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 truncate" title={company.contactPerson}>
              <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{company.contactPerson || 'Reception / Admin'}</span>
            </span>
            {company.phone && (
              <span className="flex items-center gap-1 text-slate-400 font-mono text-[10px] shrink-0">
                <Phone className="w-3 h-3" />
                {company.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Action Buttons */}
      <div className="p-3.5 bg-slate-50/90 border-t border-slate-100 grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onDownload(company, qrUrl)}
          disabled={!qrUrl}
          className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Download</span>
        </button>

        <button
          onClick={() => onPrint(company, qrUrl)}
          disabled={!qrUrl}
          className="py-2 px-3 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm shadow-brand-500/20 disabled:opacity-50"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Poster</span>
        </button>
      </div>
    </div>
  );
};

// Full A4 Corporate Pantry / Cafeteria Poster (Edge-to-Edge printable layout)
const CorporateA4Poster = ({ company, qrUrl }) => {
  const companyName = company?.name || company?.title || '';
  const companyAddress = company?.address || company?.subtitle || '';

  return (
    <div className="w-[660px] max-w-full h-[960px] mx-auto my-auto flex flex-col justify-between items-center p-10 border-[5px] border-slate-950 rounded-[36px] bg-white text-slate-950 font-sans text-center shadow-none box-border">
      {/* 1. Header with Crunch Republic Official Crest & Partner Badge */}
      <div className="flex flex-col items-center w-full">
        <CrunchLogo 
          variant="crest" 
          isDark={false} 
          size="lg" 
          color="#B91C1C" 
          markClassName="w-20 h-20 mb-1.5" 
        />
        <div className="mt-2.5 px-6 py-1.5 bg-amber-50 text-amber-950 border-2 border-amber-400 rounded-full text-xs font-black uppercase tracking-widest shadow-xs inline-block">
          Official Desk Delivery Partner
        </div>
      </div>

      {/* 2. Dedicated Office Destination Box */}
      <div className="my-3 p-5 bg-slate-50 rounded-3xl border-2 border-slate-200 w-full text-center">
        <span className="text-xs uppercase font-extrabold text-slate-400 tracking-widest block mb-1">
          Dedicated Office Hub
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 leading-tight">
          {companyName}
        </h2>
        {companyAddress && (
          <p className="text-sm font-semibold text-slate-600 mt-1 flex items-center justify-center gap-1.5">
            📍 {companyAddress}
          </p>
        )}
      </div>

      {/* 3. Huge High-Resolution QR Code */}
      <div className="w-[360px] h-[360px] p-4 border-[3px] border-slate-300 rounded-3xl bg-white flex items-center justify-center shadow-xs">
        {qrUrl ? (
          <img 
            src={qrUrl} 
            alt={companyName} 
            className="w-full h-full object-contain" 
          />
        ) : (
          <div className="text-xs text-slate-400 font-bold uppercase">QR Code Loading...</div>
        )}
      </div>

      {/* 4. Action Banner & Bottom Subtext */}
      <div className="flex flex-col items-center w-full mt-3">
        <div className="bg-slate-950 text-white rounded-2xl px-10 py-3.5 text-sm sm:text-base font-black tracking-widest uppercase shadow-md inline-block">
          Scan & Order Direct To Desk
        </div>
        
        <p className="text-xs text-slate-600 font-bold uppercase mt-3.5 tracking-wider">
          Fresh handcrafted food & hot coffee delivered warm to your floor
        </p>
        <p className="text-[10px] text-slate-400 font-semibold tracking-widest uppercase mt-1">
          No Waiting • Live Order Tracking • Instant UPI Payments
        </p>
      </div>
    </div>
  );
};

const QrCenter = () => {
  const { token, restaurant, updateLocalRestaurant } = useAuth();
  
  // Active Tab: 'dine_in' | 'corporate'
  const [activeTab, setActiveTab] = useState('dine_in');

  // Tables State
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [tableQrData, setTableQrData] = useState(null);
  const [tableLogoQrUrl, setTableLogoQrUrl] = useState('');

  // Companies State
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyQrData, setCompanyQrData] = useState(null);
  const [companyLogoQrUrl, setCompanyLogoQrUrl] = useState('');
  
  // Add Company Form State
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [compName, setCompName] = useState('');
  const [compAddress, setCompAddress] = useState('');
  const [compContact, setCompContact] = useState('');
  const [compPhone, setCompPhone] = useState('');

  // Company Search filter
  const [companySearch, setCompanySearch] = useState('');

  // Edit Company State
  const [editingCompany, setEditingCompany] = useState(null);
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editContact, setEditContact] = useState('');
  const [editPhone, setEditPhone] = useState('');

  // Filtered companies based on search
  const filteredCompanies = (companies || []).filter((c) => {
    if (!c) return false;
    if (!companySearch || !companySearch.trim()) return true;
    const q = companySearch.toLowerCase().trim();
    return (
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.address && c.address.toLowerCase().includes(q)) ||
      (c.contactPerson && c.contactPerson.toLowerCase().includes(q)) ||
      (c.phone && c.phone.toLowerCase().includes(q))
    );
  });

  // Loading & Feedback
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Print State: 'single-table' | 'single-company' | 'batch' | null
  const [printMode, setPrintMode] = useState(null);
  const [singlePrintData, setSinglePrintData] = useState(null);

  // Batch Printing
  const [batchItems, setBatchItems] = useState([]);
  const [batchLoading, setBatchLoading] = useState(false);

  // Load Tables from restaurant context
  useEffect(() => {
    if (restaurant?.tables?.length > 0) {
      setTables(restaurant.tables);
      if (!selectedTable || !restaurant.tables.includes(selectedTable)) {
        setSelectedTable(restaurant.tables[0]);
      }
    }
  }, [restaurant]);

  // Load Companies from API
  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await fetch('/api/restaurant/companies', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data?.length > 0) {
        setCompanies(data.data);
        if (!selectedCompany) {
          setSelectedCompany(data.data[0]);
        }
      }
    } catch (err) {
      console.error('Error fetching companies:', err);
    }
  };

  // Generate Dine-In Table QR when selectedTable changes
  useEffect(() => {
    if (activeTab === 'dine_in' && selectedTable) {
      generateTableQR(selectedTable);
    }
  }, [selectedTable, activeTab]);

  // Generate Company QR when selectedCompany changes
  useEffect(() => {
    if (activeTab === 'corporate' && selectedCompany) {
      generateCompanyQR(selectedCompany.name);
    }
  }, [selectedCompany, activeTab]);

  const generateTableQR = async (tableNum) => {
    setQrLoading(true);
    try {
      const response = await fetch(`/api/restaurant/qr?orderType=dine_in&tableNumber=${encodeURIComponent(tableNum)}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setTableQrData(data.data);
        // Automatically composite Crunch Republic logo in center of QR
        const brandedUrl = await embedCrunchRepublicLogo(data.data.qrCodeUrl, 'CR');
        setTableLogoQrUrl(brandedUrl);
      }
    } catch (error) {
      console.error('QR error:', error);
    } finally {
      setQrLoading(false);
    }
  };

  const generateCompanyQR = async (companyName) => {
    setQrLoading(true);
    try {
      const response = await fetch(`/api/restaurant/qr?orderType=company_delivery&companyName=${encodeURIComponent(companyName)}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setCompanyQrData(data.data);
        // Automatically composite Crunch Republic logo in center of QR
        const brandedUrl = await embedCrunchRepublicLogo(data.data.qrCodeUrl, 'CR');
        setCompanyLogoQrUrl(brandedUrl);
      }
    } catch (error) {
      console.error('Company QR error:', error);
    } finally {
      setQrLoading(false);
    }
  };

  // Handle Add Table
  const handleAddTable = async () => {
    if (!newTable || newTable.trim() === '') return;
    const trimmed = newTable.trim();
    if (tables.includes(trimmed)) {
      setStatusMsg({ type: 'error', text: `Table "${trimmed}" already exists.` });
      return;
    }

    const updatedTables = [...tables, trimmed];
    setTables(updatedTables);
    setNewTable('');
    if (!selectedTable) setSelectedTable(trimmed);

    try {
      const response = await fetch('/api/restaurant/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: restaurant.name,
          address: restaurant.address,
          contactNumber: restaurant.contactNumber,
          openingHours: restaurant.openingHours,
          logo: restaurant.logo,
          tables: updatedTables,
        }),
      });
      const data = await response.json();
      if (data.success) {
        updateLocalRestaurant(data.data);
        setStatusMsg({ type: 'success', text: `Table "${trimmed}" added successfully!` });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Error saving new table.' });
    }
  };

  // Handle Remove Table
  const handleRemoveTable = async (tableToRemove) => {
    const updatedTables = tables.filter(t => t !== tableToRemove);
    setTables(updatedTables);
    if (selectedTable === tableToRemove) {
      setSelectedTable(updatedTables.length > 0 ? updatedTables[0] : '');
      setTableQrData(null);
      setTableLogoQrUrl('');
    }

    try {
      const response = await fetch('/api/restaurant/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: restaurant.name,
          address: restaurant.address,
          contactNumber: restaurant.contactNumber,
          openingHours: restaurant.openingHours,
          logo: restaurant.logo,
          tables: updatedTables,
        }),
      });
      const data = await response.json();
      if (data.success) {
        updateLocalRestaurant(data.data);
        setStatusMsg({ type: 'success', text: `Table "${tableToRemove}" removed.` });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Add Company
  const handleAddCompany = async (e) => {
    e.preventDefault();
    if (!compName || compName.trim() === '') return;

    setLoading(true);
    try {
      const res = await fetch('/api/restaurant/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: compName.trim(),
          address: compAddress,
          contactPerson: compContact,
          phone: compPhone,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCompanies(data.data);
        const created = data.data.find(c => c.name === compName.trim()) || data.data[data.data.length - 1];
        setSelectedCompany(created);
        setShowAddCompanyModal(false);
        setCompName('');
        setCompAddress('');
        setCompContact('');
        setCompPhone('');
        setStatusMsg({ type: 'success', text: `Company "${created.name}" registered for delivery orders!` });
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Failed to add company.' });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Server error adding company.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle Remove Company
  const handleRemoveCompany = async (companyId, companyName) => {
    if (!window.confirm(`Delete company profile "${companyName}"?`)) return;
    try {
      const res = await fetch(`/api/restaurant/companies/${companyId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCompanies(data.data);
        if (selectedCompany?._id === companyId || selectedCompany?.name === companyName) {
          setSelectedCompany(data.data.length > 0 ? data.data[0] : null);
          setCompanyQrData(null);
          setCompanyLogoQrUrl('');
        }
        setStatusMsg({ type: 'success', text: `Company "${companyName}" removed.` });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Download Current QR Image
  const handleDownload = () => {
    const isDineIn = activeTab === 'dine_in';
    const targetUrl = isDineIn ? tableLogoQrUrl : companyLogoQrUrl;
    const filename = isDineIn 
      ? `Crunch_Republic_QR_${selectedTable.replace(/\s+/g, '_')}.png`
      : `Crunch_Republic_QR_${selectedCompany?.name.replace(/\s+/g, '_')}.png`;

    if (!targetUrl) return;
    const link = document.createElement('a');
    link.href = targetUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Single Tent Card for a specific Table
  const handlePrintSingleTable = async (tableName) => {
    const targetTable = tableName || selectedTable;
    if (!targetTable) return;

    // Immediately clear batch items so batch never leaks into print
    setBatchItems([]);
    setPrintMode('single-table');

    let qrUrl = (selectedTable === targetTable && tableLogoQrUrl) ? tableLogoQrUrl : null;
    
    if (!qrUrl) {
      setQrLoading(true);
      try {
        const response = await fetch(`/api/restaurant/qr?orderType=dine_in&tableNumber=${encodeURIComponent(targetTable)}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          qrUrl = await embedCrunchRepublicLogo(data.data.qrCodeUrl, 'CR');
          setSelectedTable(targetTable);
          setTableLogoQrUrl(qrUrl);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setQrLoading(false);
      }
    }

    if (qrUrl) {
      setSinglePrintData({
        type: 'table',
        table: targetTable,
        qrUrl: qrUrl
      });
      setTimeout(() => {
        window.print();
      }, 150);
    }
  };

  // Handle Open Edit Company Modal
  const handleOpenEdit = (comp) => {
    setEditingCompany(comp);
    setEditName(comp.name || '');
    setEditAddress(comp.address || '');
    setEditContact(comp.contactPerson || '');
    setEditPhone(comp.phone || '');
  };

  // Handle Update Company
  const handleUpdateCompany = async (e) => {
    e.preventDefault();
    if (!editName || editName.trim() === '' || !editingCompany) return;

    setLoading(true);
    try {
      const companyId = editingCompany._id || editingCompany.name;
      const res = await fetch(`/api/restaurant/companies/${encodeURIComponent(companyId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editName.trim(),
          address: editAddress,
          contactPerson: editContact,
          phone: editPhone,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCompanies(data.data);
        setEditingCompany(null);
        setStatusMsg({ type: 'success', text: `Company "${editName.trim()}" updated successfully!` });
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Failed to update company.' });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Server error updating company.' });
    } finally {
      setLoading(false);
    }
  };

  // Download Company QR
  const handleDownloadCompanyQr = (company, qrUrl) => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `Crunch_Republic_QR_${company.name.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Single Pantry Poster for a specific Company
  const handlePrintSingleCompany = async (company, preloadedQrUrl) => {
    const targetComp = company || selectedCompany;
    if (!targetComp) return;

    // Immediately clear batch items so batch never leaks into print
    setBatchItems([]);
    setPrintMode('single-company');

    let qrUrl = preloadedQrUrl || ((selectedCompany?.name === targetComp.name && companyLogoQrUrl) ? companyLogoQrUrl : null);

    if (!qrUrl) {
      setQrLoading(true);
      try {
        const response = await fetch(`/api/restaurant/qr?orderType=company_delivery&companyName=${encodeURIComponent(targetComp.name)}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          qrUrl = await embedCrunchRepublicLogo(data.data.qrCodeUrl, 'CR');
          setSelectedCompany(targetComp);
          setCompanyLogoQrUrl(qrUrl);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setQrLoading(false);
      }
    }

    if (qrUrl) {
      setSinglePrintData({
        type: 'company',
        company: targetComp,
        qrUrl: qrUrl
      });
      setTimeout(() => {
        window.print();
      }, 150);
    }
  };

  // Batch Print All Tables or All Companies
  const handleBatchPrint = async () => {
    setSinglePrintData(null);
    setPrintMode('batch');
    setBatchLoading(true);
    setStatusMsg({ type: 'success', text: 'Compositing high-res logo QR codes for batch print...' });

    try {
      const items = [];
      if (activeTab === 'dine_in') {
        for (const t of tables) {
          const res = await fetch(`/api/restaurant/qr?orderType=dine_in&tableNumber=${encodeURIComponent(t)}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            const branded = await embedCrunchRepublicLogo(data.data.qrCodeUrl, 'CR');
            items.push({ title: t, subtitle: 'Dine-in Table Tent', qrUrl: branded });
          }
        }
      } else {
        for (const c of companies) {
          const res = await fetch(`/api/restaurant/qr?orderType=company_delivery&companyName=${encodeURIComponent(c.name)}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data.success) {
            const branded = await embedCrunchRepublicLogo(data.data.qrCodeUrl, 'CR');
            items.push({ 
              company: c,
              title: c.name, 
              subtitle: c.address || 'Corporate Delivery Desk / Floor Pantry',
              address: c.address || 'Corporate Delivery Desk / Floor Pantry',
              qrUrl: branded 
            });
          }
        }
      }

      setBatchItems(items);
      setTimeout(() => {
        setBatchLoading(false);
        window.print();
      }, 400);
    } catch (err) {
      console.error(err);
      setBatchLoading(false);
      setStatusMsg({ type: 'error', text: 'Failed to batch generate QR codes.' });
    }
  };

  return (
    <>
      <div className="print:hidden flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-800">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        <Navbar title="Table & Corporate QR Center" />

        <main className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Notification Toast */}
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

          {/* Top Mode Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 surface-card p-4">
            <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
              <button
                onClick={() => setActiveTab('dine_in')}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'dine_in'
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Dine-In Tables</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'dine_in' ? 'bg-brand-50 text-brand-600' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tables.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('corporate')}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'corporate'
                    ? 'bg-white text-brand-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Corporate Delivery</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'corporate' ? 'bg-brand-50 text-brand-600' : 'bg-slate-200 text-slate-600'
                }`}>
                  {companies.length}
                </span>
              </button>
            </div>

            {/* Batch Print Button */}
            <button
              onClick={handleBatchPrint}
              disabled={batchLoading || (activeTab === 'dine_in' ? tables.length === 0 : companies.length === 0)}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all shrink-0"
            >
              {batchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
              <span>
                {batchLoading 
                  ? 'Generating Batch...' 
                  : activeTab === 'dine_in' 
                    ? `Print All ${tables.length} Table Tents` 
                    : `Print All ${companies.length} Office Posters`}
              </span>
            </button>
          </div>



          {/* ===================== TAB 1: DINE-IN TABLES ===================== */}
          {activeTab === 'dine_in' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Tables Left Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="surface-card p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Layers className="w-4.5 h-4.5 text-brand-600" />
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">Active Floor Tables</h3>
                        <p className="text-[11px] text-slate-400 font-medium">Click any table to preview its centered-logo QR and print</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg">
                      {tables.length} Total
                    </span>
                  </div>

                  {/* Add New Table Input */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newTable}
                      onChange={(e) => setNewTable(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddTable()}
                      placeholder="e.g. Table 11 or Garden Table 2"
                      className="flex-1 px-4 py-2.5 surface-input text-xs"
                    />
                    <button
                      onClick={handleAddTable}
                      className="px-5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Table</span>
                    </button>
                  </div>

                  {/* Tables Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tables.map((t) => {
                      const isSelected = selectedTable === t;
                      return (
                        <div
                          key={t}
                          onClick={() => setSelectedTable(t)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-brand-50/80 border-brand-300 shadow-sm ring-2 ring-brand-500/20'
                              : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              <QrCode className="w-3.5 h-3.5" />
                            </div>
                            <span className={`text-xs font-bold truncate ${isSelected ? 'text-brand-900' : 'text-slate-700'}`}>
                              {t}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrintSingleTable(t);
                              }}
                              title={`Print single tent card for ${t}`}
                              className="text-slate-400 hover:text-brand-600 p-1 rounded-lg transition-colors"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm(`Delete ${t}?`)) handleRemoveTable(t);
                              }}
                              className="text-slate-300 hover:text-rose-500 p-1 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Table Preview Right Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="surface-card p-6 flex flex-col gap-5 text-center">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4.5 h-4.5 text-brand-600" />
                      <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">
                        {selectedTable} QR Code
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 bg-brand-50 text-brand-700 text-[10px] font-extrabold rounded-md uppercase border border-brand-100">
                      Crunch Republic Logo
                    </span>
                  </div>

                  {/* QR Canvas Box with Embedded Logo */}
                  <div className="w-full aspect-square max-w-[240px] mx-auto rounded-2xl bg-white border border-slate-200 p-3.5 flex flex-col items-center justify-center relative shadow-sm">
                    {qrLoading ? (
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
                        <span className="text-[10px] font-bold">Compositing Logo QR...</span>
                      </div>
                    ) : tableLogoQrUrl ? (
                      <img 
                        src={tableLogoQrUrl} 
                        alt={`${selectedTable} Branded QR`} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-slate-400 select-none">
                        <QrCode className="w-10 h-10 stroke-[1.2]" />
                        <span className="text-[10px] font-bold uppercase">Select a table</span>
                      </div>
                    )}
                  </div>

                  {/* Table details & destination */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-left space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Target Table</span>
                      <span className="text-xs font-black text-brand-600">{selectedTable}</span>
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 truncate" title={tableQrData?.targetUrl}>
                      {tableQrData?.targetUrl || 'Generating secure link...'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={handleDownload}
                      disabled={!tableLogoQrUrl}
                      className="py-2.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PNG</span>
                    </button>

                    <button
                      onClick={() => handlePrintSingleTable(selectedTable)}
                      disabled={!tableLogoQrUrl || qrLoading}
                      className="py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/20"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Tent Card</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB 2: CORPORATE DELIVERY ===================== */}
          {activeTab === 'corporate' && (
            <div className="space-y-6">
              {/* Corporate Control Bar */}
              <div className="surface-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">
                        Registered Corporate Partners
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-brand-50 text-brand-600 border border-brand-100">
                        {companies.length} Hubs
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      Branded QR codes with direct desk delivery routing to partner offices
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search bar */}
                  <div className="relative min-w-[220px]">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={companySearch}
                      onChange={(e) => setCompanySearch(e.target.value)}
                      placeholder="Search company or office..."
                      className="w-full pl-9 pr-7 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                    {companySearch && (
                      <button
                        onClick={() => setCompanySearch('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Register New Company Button */}
                  <button
                    onClick={() => setShowAddCompanyModal(true)}
                    className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm shadow-brand-500/20"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Register Company</span>
                  </button>
                </div>
              </div>

              {/* Companies Grid View */}
              {filteredCompanies.length === 0 ? (
                <div className="surface-card p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                    <Building2 className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700">No partner companies found</h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    {companySearch
                      ? `No companies matching "${companySearch}". Try clearing your search keyword.`
                      : 'No companies registered yet. Click "+ Register Company" to create your first partner QR.'}
                  </p>
                  {companySearch && (
                    <button
                      onClick={() => setCompanySearch('')}
                      className="mt-2 text-xs font-bold text-brand-600 hover:underline"
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCompanies.map((comp) => (
                    <CorporateCompanyCard
                      key={comp._id || comp.name}
                      company={comp}
                      token={token}
                      onEdit={handleOpenEdit}
                      onDelete={handleRemoveCompany}
                      onPrint={(c, qr) => handlePrintSingleCompany(c, qr)}
                      onDownload={(c, qr) => handleDownloadCompanyQr(c, qr)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>
    </div>

      {/* Modal: Register New Company */}
      {showAddCompanyModal && (
        <div className="print:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scale-up border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-brand-600" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">Register Company For Delivery</h3>
              </div>
              <button 
                onClick={() => setShowAddCompanyModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCompany} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Company / Office Name *</label>
                <input
                  type="text"
                  required
                  value={compName}
                  onChange={(e) => setCompName(e.target.value)}
                  placeholder="e.g. TCS Cyber Park or Google Hub"
                  className="w-full px-3.5 py-2 surface-input text-xs"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Delivery Address / Floor / Tower</label>
                <input
                  type="text"
                  value={compAddress}
                  onChange={(e) => setCompAddress(e.target.value)}
                  placeholder="e.g. Tower B, 4th Floor Cafeteria"
                  className="w-full px-3.5 py-2 surface-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact Person</label>
                  <input
                    type="text"
                    value={compContact}
                    onChange={(e) => setCompContact(e.target.value)}
                    placeholder="e.g. HR / Pantry Admin"
                    className="w-full px-3.5 py-2 surface-input text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Contact Phone</label>
                  <input
                    type="text"
                    value={compPhone}
                    onChange={(e) => setCompPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full px-3.5 py-2 surface-input text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCompanyModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Company & Generate QR</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Company Details */}
      {editingCompany && (
        <div className="print:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scale-up border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-brand-600" />
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                  Edit Corporate Hub Details
                </h3>
              </div>
              <button
                onClick={() => setEditingCompany(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateCompany} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Company / Office Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Amazon Hub"
                  className="w-full px-3.5 py-2 surface-input text-xs"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Delivery Address / Floor / Tower
                </label>
                <input
                  type="text"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  placeholder="e.g. Tower 3, 5th Floor Cafeteria"
                  className="w-full px-3.5 py-2 surface-input text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={editContact}
                    onChange={(e) => setEditContact(e.target.value)}
                    placeholder="e.g. Reception / Help Desk"
                    className="w-full px-3.5 py-2 surface-input text-xs"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Contact Phone
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="+91 98..."
                    className="w-full px-3.5 py-2 surface-input text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== PRINT VIEWS (Completely isolated on print, 0% on screen) ===================== */}
      <div className="hidden print:block bg-white text-slate-900 w-full min-h-screen">
        
        {/* 1. Single Table Tent Card Print View (Strictly 1 Page) */}
        {printMode === 'single-table' && singlePrintData && (
          <div className="print-page-isolated w-full min-h-screen flex flex-col items-center justify-center p-8 bg-white">
            <div className="mx-auto flex flex-col items-center p-8 border-[3px] border-slate-900 rounded-3xl w-[360px] bg-white text-slate-950 font-sans text-center shadow-none">
              <CrunchLogo 
                variant="crest" 
                isDark={false} 
                size="md" 
                color="#B91C1C" 
                markClassName="w-14 h-14 mb-1" 
              />
              <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest border-b border-slate-200 pb-2 w-4/5 mx-auto mt-2">
                Scan To Order • Live Menu
              </p>
              
              <div className="w-[240px] h-[240px] my-5 p-2.5 border-2 border-slate-200 rounded-2xl bg-white flex items-center justify-center">
                <img src={singlePrintData.qrUrl} alt={singlePrintData.table} className="w-full h-full object-contain" />
              </div>

              <div className="bg-slate-900 text-white rounded-xl px-7 py-2.5 text-base font-black tracking-wider uppercase inline-block">
                <span>{singlePrintData.table}</span>
              </div>
              
              <p className="text-[10px] text-slate-400 font-semibold uppercase mt-5 tracking-wider">
                Point phone camera to browse menu & place order
              </p>
            </div>
          </div>
        )}

        {/* 2. Single Corporate Pantry Poster Print View (1 Full A4 Page) */}
        {printMode === 'single-company' && singlePrintData && (
          <div className="print-page-isolated w-full flex flex-col items-center justify-center bg-white p-2">
            <CorporateA4Poster company={singlePrintData.company} qrUrl={singlePrintData.qrUrl} />
          </div>
        )}

        {/* 3. Batch Print View: Corporate Posters (1 Full A4 Page PER COMPANY) */}
        {printMode === 'batch' && activeTab === 'corporate' && batchItems.length > 0 && (
          <div className="w-full bg-white">
            {batchItems.map((item, idx) => (
              <div key={idx} className="print-a4-page w-full flex flex-col items-center justify-center bg-white p-2">
                <CorporateA4Poster company={item.company || item} qrUrl={item.qrUrl} />
              </div>
            ))}
          </div>
        )}

        {/* 4. Batch Print View: Dine-In Tables (Tent Cards) */}
        {printMode === 'batch' && activeTab === 'dine_in' && batchItems.length > 0 && (
          <div className="p-6 bg-white min-h-screen">
            <div className="grid grid-cols-2 gap-8">
              {batchItems.map((item, idx) => (
                <div key={idx} className="print-batch-card flex flex-col items-center p-6 border-[2px] border-slate-900 rounded-2xl w-[320px] mx-auto bg-white text-slate-950 font-sans text-center mb-6">
                  <CrunchLogo 
                    variant="crest" 
                    isDark={false} 
                    size="sm" 
                    color="#B91C1C" 
                    showTagline={false}
                    markClassName="w-10 h-10 mb-0.5" 
                  />
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 pb-1 w-4/5 mt-0.5">
                    {item.subtitle}
                  </p>
                  <div className="w-[180px] h-[180px] my-3 p-2 border border-slate-200 rounded-xl bg-white flex items-center justify-center">
                    <img src={item.qrUrl} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="bg-slate-900 text-white rounded-lg px-4 py-1.5 text-xs font-black">
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[8px] text-slate-400 uppercase mt-2 font-medium">Scan camera to order</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default QrCenter;
