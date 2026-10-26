import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CrunchLogo from './CrunchLogo';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Utensils, 
  Tag, 
  Ticket,
  QrCode, 
  Store, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const { logout, restaurant } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders & POS', path: '/orders', icon: ClipboardList },
    { name: 'Categories', path: '/categories', icon: Tag },
    { name: 'Menu Items', path: '/dishes', icon: Utensils },
    { name: 'Offers & Promos', path: '/offers', icon: Ticket },
    { name: 'Table QRs', path: '/qr-center', icon: QrCode },
    { name: 'Cafe Settings', path: '/profile', icon: Store },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 h-screen bg-white flex flex-col border-r border-slate-200/60 shrink-0 select-none">
      {/* Brand & Cafe Header - Aligned with Navbar h-20 */}
      <div className="h-20 px-4 flex items-center justify-between border-b border-slate-200/60 shrink-0">
        <CrunchLogo 
          variant="full" 
          isDark={false} 
          size="sm" 
          showTagline={false}
          color="#B91C1C" 
          markClassName="w-9 h-9 shrink-0" 
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group duration-150 border ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 border-brand-100 shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border-transparent'
                }`
              }
            >
              <Icon className="w-4.5 h-4.5 shrink-0 transition-transform duration-200 group-hover:scale-105" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom User Logouts */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/40">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition-all duration-150"
        >
          <LogOut className="w-4.5 h-4.5 shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
