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
  Sparkles
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

  // Print Single Pantry Poster for a specific Company
  const handlePrintSingleCompany = async (company) => {
    const targetComp = company || selectedCompany;
    if (!targetComp) return;

    // Immediately clear batch items so batch never leaks into print
    setBatchItems([]);
    setPrintMode('single-company');

    let qrUrl = (selectedCompany?.name === targetComp.name && companyLogoQrUrl) ? companyLogoQrUrl : null;

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
            items.push({ title: c.name, subtitle: `Corporate Delivery: ${c.address || 'Pantry / Cafeteria'}`, qrUrl: branded });
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Companies Left Column (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="surface-card p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                      <Building2 className="w-4.5 h-4.5 text-brand-600" />
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">Registered Companies</h3>
                        <p className="text-[11px] text-slate-400 font-medium">Companies with custom QR codes for direct desk deliveries</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => setShowAddCompanyModal(true)}
                      className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Register Company</span>
                    </button>
                  </div>

                  {/* Companies List */}
                  <div className="space-y-3">
                    {companies.length === 0 ? (
                      <div className="py-8 text-center text-slate-400 text-xs">
                        No companies registered yet. Click "+ Register Company" to create one.
                      </div>
                    ) : (
                      companies.map((comp) => {
                        const isSelected = selectedCompany?._id === comp._id || selectedCompany?.name === comp.name;
                        return (
                          <div
                            key={comp._id || comp.name}
                            onClick={() => setSelectedCompany(comp)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-brand-50/80 border-brand-300 shadow-sm ring-2 ring-brand-500/20'
                                : 'bg-white border-slate-200/80 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                                isSelected ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'
                              }`}>
                                <Building2 className="w-4 h-4" />
                              </div>
                              <div className="min-w-0">
                                <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-brand-900' : 'text-slate-800'}`}>
                                  {comp.name}
                                </h4>
                                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                                  {comp.address && (
                                    <span className="flex items-center gap-1 truncate">
                                      <MapPin className="w-3 h-3 text-slate-300 shrink-0" />
                                      {comp.address}
                                    </span>
                                  )}
                                  {comp.contactPerson && (
                                    <span className="flex items-center gap-1 truncate">
                                      <User className="w-3 h-3 text-slate-300 shrink-0" />
                                      {comp.contactPerson}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePrintSingleCompany(comp);
                                }}
                                title={`Print single poster for ${comp.name}`}
                                className="text-slate-400 hover:text-brand-600 p-1.5 rounded-lg transition-colors"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveCompany(comp._id || comp.name, comp.name);
                                }}
                                className="text-slate-300 hover:text-rose-500 p-1.5 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>

              {/* Company QR Preview Right Column (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="surface-card p-6 flex flex-col gap-5 text-center">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4.5 h-4.5 text-brand-600" />
                      <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight truncate">
                        {selectedCompany ? selectedCompany.name : 'Select Company'} QR
                      </h3>
                    </div>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-extrabold rounded-md uppercase border border-blue-100">
                      Corporate Poster
                    </span>
                  </div>

                  {/* QR Canvas Box with Embedded Logo */}
                  <div className="w-full aspect-square max-w-[240px] mx-auto rounded-2xl bg-white border border-slate-200 p-3.5 flex flex-col items-center justify-center relative shadow-sm">
                    {qrLoading ? (
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
                        <span className="text-[10px] font-bold">Signing Corporate QR...</span>
                      </div>
                    ) : companyLogoQrUrl ? (
                      <img 
                        src={companyLogoQrUrl} 
                        alt={`${selectedCompany?.name} Branded QR`} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-slate-400 select-none">
                        <Building2 className="w-10 h-10 stroke-[1.2]" />
                        <span className="text-[10px] font-bold uppercase">Select a company</span>
                      </div>
                    )}
                  </div>

                  {/* Company Info Box */}
                  {selectedCompany && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-left space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Office Destination</span>
                        <span className="text-xs font-black text-brand-600">{selectedCompany.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-medium">
                        📍 {selectedCompany.address || 'Pantry / Main Reception'}
                      </p>
                      <p className="text-[10px] font-mono text-slate-400 truncate" title={companyQrData?.targetUrl}>
                        {companyQrData?.targetUrl || 'Generating secure link...'}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={handleDownload}
                      disabled={!companyLogoQrUrl}
                      className="py-2.5 bg-slate-50 hover:bg-slate-100 disabled:opacity-50 text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PNG</span>
                    </button>

                    <button
                      onClick={() => handlePrintSingleCompany(selectedCompany)}
                      disabled={!companyLogoQrUrl || qrLoading}
                      className="py-2.5 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/20"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Pantry Poster</span>
                    </button>
                  </div>
                </div>
              </div>

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

        {/* 2. Single Corporate Pantry Poster Print View (Strictly 1 Page) */}
        {printMode === 'single-company' && singlePrintData && (
          <div className="print-page-isolated w-full min-h-screen flex flex-col items-center justify-center p-8 bg-white">
            <div className="mx-auto flex flex-col items-center p-8 border-[4px] border-slate-900 rounded-3xl w-[400px] bg-white text-slate-950 font-sans text-center shadow-none">
              <CrunchLogo 
                variant="crest" 
                isDark={false} 
                size="lg" 
                color="#B91C1C" 
                markClassName="w-16 h-16 mb-1" 
              />
              <div className="mt-2 px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-[10px] font-black uppercase tracking-wider inline-block">
                Official Desk Delivery Partner
              </div>
              
              <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 w-full text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Dedicated Office Hub</span>
                <h2 className="text-lg font-black text-slate-900 leading-tight mt-0.5">{singlePrintData.company?.name}</h2>
                {singlePrintData.company?.address && (
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">{singlePrintData.company.address}</p>
                )}
              </div>

              <div className="w-[250px] h-[250px] my-5 p-2.5 border-2 border-slate-200 rounded-2xl bg-white flex items-center justify-center">
                <img src={singlePrintData.qrUrl} alt={singlePrintData.company?.name} className="w-full h-full object-contain" />
              </div>

              <div className="bg-slate-900 text-white rounded-xl px-7 py-2.5 text-xs font-black tracking-widest uppercase inline-block">
                Scan & Order Direct To Desk
              </div>
              
              <p className="text-[10px] text-slate-500 font-medium uppercase mt-4 tracking-wider">
                Fresh food & quick bites delivered warm to your floor
              </p>
            </div>
          </div>
        )}

        {/* 3. Batch Print View (All Table Tents or All Office Posters) */}
        {printMode === 'batch' && batchItems.length > 0 && (
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
