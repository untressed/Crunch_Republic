import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, ShieldCheck } from 'lucide-react';

const Navbar = ({ title }) => {
  const { user } = useAuth();

  return (
    <header className="h-20 glass-topbar px-8 flex items-center justify-between z-10 shrink-0 select-none">
      {/* Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-extrabold tracking-tight text-slate-800">{title || 'Dashboard'}</h1>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-5">
        {/* User profile capsule */}
        {user && (
          <div className="flex items-center gap-3 pl-5">
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-slate-800 leading-tight">{user.name}</span>
              <span className="text-[10px] font-medium text-slate-400 capitalize leading-none mt-0.5">
                Admin
              </span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm shrink-0">
              <User className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
