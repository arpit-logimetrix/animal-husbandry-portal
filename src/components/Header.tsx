import React, { useState } from 'react';
import { Language, UserRole, ModuleTab } from '../types';
import { PhoneCall, Globe, Building2, Search, Bell, Sparkles, User, Menu, MapPin, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { GlobalSearchModal } from './GlobalSearchModal';
import upLogo from '../assets/up-logo.png';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  onOpenAiChat: () => void;
  onOpenDiseaseAi: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  onNavigateTab: (tab: ModuleTab) => void;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  role,
  setRole,
  onOpenAiChat,
  onOpenDiseaseAi,
  searchQuery,
  setSearchQuery,
  selectedDistrict,
  setSelectedDistrict,
  onNavigateTab,
  onToggleMobileMenu,
}) => {
  const isHi = language === 'hi';
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const districts = ['Statewide (All)', 'Lucknow', 'Varanasi', 'Gorakhpur', 'Agra', 'Kanpur', 'Prayagraj', 'Meerut', 'Bareilly'];

  const notifications = [
    { id: 1, title: 'FMD Vaccination Campaign Phase-IV Active', time: '10m ago', type: 'urgent' as const },
    { id: 2, title: '1962 MVU Ambulance #14 Dispatched to Bilaspur', time: '25m ago', type: 'info' as const },
    { id: 3, title: 'DBT Subsidy Batch Approved (₹1.20 Cr)', time: '2h ago', type: 'success' as const },
  ];

  const notifConfig = {
    urgent:  { border: 'border-l-amber-400',  bg: 'bg-amber-50',  icon: <AlertCircle className="w-3 h-3 text-amber-500 shrink-0" />,  label: 'bg-amber-100 text-amber-800' },
    info:    { border: 'border-l-blue-400',   bg: 'bg-blue-50',   icon: <Info className="w-3 h-3 text-blue-500 shrink-0" />,          label: 'bg-blue-100 text-blue-800' },
    success: { border: 'border-l-emerald-400',bg: 'bg-emerald-50',icon: <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />,label: 'bg-emerald-100 text-emerald-800' },
  };

  return (
    <header className="bg-white sticky top-0 z-30" style={{boxShadow: '0 1px 3px rgba(0,0,0,0.07)'}}>
      {/* 1. Government Micro-Header Strip */}
      <div className="bg-[#14532D] text-white px-3 sm:px-5 py-1 text-[11px] flex items-center justify-between gap-2 font-sans">
        {/* Left: Department Emblem & Title */}
        <div className="flex items-center space-x-2.5 shrink-0 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-sm">
              <img src={upLogo} alt="UP Govt" className="w-full h-full object-contain" />
            </div>
          </div>
          <span className="font-semibold text-emerald-50 tracking-tight truncate text-[11px]">
            {isHi ? 'पशुपालन विभाग | भारत सरकार' : 'Dept. of Animal Husbandry | Govt. of India'}
          </span>
          <span className="hidden md:inline text-emerald-700/80 select-none">·</span>
          <span className="hidden md:inline text-emerald-300/70 font-mono text-[10px]">
            {isHi ? 'एकीकृत डिजिटल पोर्टल 2026' : 'Unified GovTech Portal 2026'}
          </span>
        </div>

        {/* Right: Helpline 1962 & Language Toggle */}
        <div className="flex items-center space-x-2 shrink-0">
          <div className="bg-amber-500/15 text-amber-200 border border-amber-400/25 font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse-amber">
            <PhoneCall className="w-3 h-3 text-amber-400 shrink-0" />
            <span className="font-mono font-bold text-[10px] sm:text-[11px] whitespace-nowrap tracking-wide">
              {isHi ? '1962 टोल फ्री' : '☏ 1962 Helpline'}
            </span>
          </div>

          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/20 text-emerald-100 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-white/15 transition-all shrink-0 cursor-pointer"
          >
            <Globe className="w-3 h-3 text-amber-300 shrink-0" />
            <span>{isHi ? 'EN' : 'हिंदी'}</span>
          </button>
        </div>
      </div>
      {/* Department gradient accent line */}
      <div className="dept-accent-line" />

      {/* 2. Main Application Header Bar */}
      <div className="px-3 sm:px-5 py-2.5">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Hamburger + Brand Logo & Title */}
          <div className="flex items-center gap-2.5 shrink-0">
            {onToggleMobileMenu && (
              <button
                onClick={onToggleMobileMenu}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#14532D]/10 text-slate-700 lg:hidden focus:outline-none transition-colors"
                title="Toggle Menu"
              >
                <Menu className="w-5 h-5 text-[#14532D]" />
              </button>
            )}

            {/* Logo Badge — UP Govt Seal */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-white border border-emerald-200 shadow-sm p-0.5"
              style={{boxShadow: '0 2px 8px rgba(20,83,45,0.15), inset 0 1px 0 rgba(255,255,255,0.9)'}}>
              <img src={upLogo} alt="UP Govt Seal" className="w-full h-full object-contain" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-[15px] font-extrabold text-slate-900 tracking-tight leading-none truncate max-w-[150px] sm:max-w-none">
                  {isHi ? 'पशुपालन विभाग' : 'Animal Husbandry Dept.'}
                </h1>
                <span className="hidden xl:inline-flex items-center bg-emerald-50 text-[#14532D] border border-emerald-200 text-[9.5px] font-mono px-1.5 py-0.5 rounded-md font-bold tracking-wide">
                  GovTech 2026
                </span>
              </div>
              <p className="text-[10.5px] text-slate-400 mt-0.5 truncate hidden sm:block font-medium">
                {isHi ? 'डिजिटल भारत — पशु स्वास्थ्य, 1962 MVU व DBT' : 'Digital Healthcare · 1962 MVU · DBT Portal'}
              </p>
            </div>
          </div>

          {/* Center: Desktop Global Command Search */}
          <div className="hidden md:block flex-1 max-w-lg mx-3">
            <button
              onClick={() => setShowSearchModal(true)}
              className="search-focus w-full bg-slate-50 hover:bg-white border border-slate-200 text-slate-400 rounded-xl px-3.5 py-2 text-xs flex items-center justify-between transition-all group shadow-sm cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#14532D] transition-colors shrink-0" />
                <span className="truncate font-medium text-[12px] text-slate-400">
                  {searchQuery || (isHi ? 'टैग आईडी, फैमिली आईडी, योजना खोजें...' : 'Search Ear Tag ID, Family ID, Scheme...')}
                </span>
              </div>
              <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[9.5px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded-md shadow-sm shrink-0 ml-2">
                ⌘ K
              </kbd>
            </button>
          </div>

          {/* Right: Controls (District, Notifications, AI Button, User Role) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Mobile Search Icon Trigger */}
            <button
              onClick={() => setShowSearchModal(true)}
              className="p-1.5 text-slate-600 hover:text-[#14532D] bg-slate-50 hover:bg-emerald-50 rounded-lg border border-slate-200 hover:border-emerald-300 md:hidden transition-all"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* District Selector */}
            <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 flex items-center text-xs space-x-1.5 hover:border-slate-300 transition-colors">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0 hidden sm:block" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-slate-700 font-semibold focus:outline-none cursor-pointer text-[11px] sm:text-xs max-w-[90px] sm:max-w-[130px] truncate"
              >
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationMenu(!showNotificationMenu)}
                className="p-2 text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 hover:border-slate-300 transition-all relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white animate-dot-blink" />
              </button>

              {showNotificationMenu && (
                <div className="notification-dropdown absolute right-0 mt-2 w-80 bg-white rounded-xl border border-slate-200 shadow-xl p-3 z-50 text-xs text-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                    <span className="font-bold text-slate-900 text-[13px]">Notifications</span>
                    <span className="text-[9.5px] font-mono font-bold text-amber-800 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded">3 NEW</span>
                  </div>
                  <div className="space-y-1.5">
                    {notifications.map((n) => {
                      const cfg = notifConfig[n.type];
                      return (
                        <div key={n.id} className={`p-2.5 ${cfg.bg} border-l-[3px] ${cfg.border} border border-slate-100 rounded-lg flex items-start gap-2`}>
                          <div className="mt-0.5">{cfg.icon}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-800 text-[11px] leading-snug">{n.title}</div>
                            <div className="text-[9.5px] text-slate-400 font-mono mt-0.5">{n.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button className="w-full text-center text-[11px] font-semibold text-[#14532D] hover:underline py-1 border-t border-slate-100 pt-2">
                    View All Notifications →
                  </button>
                </div>
              )}
            </div>

            {/* Pashu AI Button — shimmer effect */}
            <button
              onClick={onOpenAiChat}
              className="ai-btn-shimmer bg-[#14532D] hover:bg-[#0f3e21] text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0 border border-emerald-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">{isHi ? 'पशु सहायक AI' : 'Pashu AI'}</span>
            </button>

            {/* User Role Switcher */}
            <div className="bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 flex items-center text-xs gap-1.5 hover:border-emerald-300 transition-colors">
              <User className="w-3 h-3 text-[#14532D] hidden lg:block shrink-0" />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="bg-transparent text-[#14532D] font-bold focus:outline-none cursor-pointer text-[11px] sm:text-xs max-w-[85px] sm:max-w-[120px] truncate"
              >
                <option value="CITIZEN">{isHi ? 'नागरिक' : 'Farmer/Citizen'}</option>
                <option value="VET_OFFICER">{isHi ? 'पशु चिकित्सक' : 'Vet Surgeon'}</option>
                <option value="DVO">{isHi ? 'जिला अधिकारी' : 'District Officer'}</option>
                <option value="DIRECTOR">{isHi ? 'राज्य निदेशालय' : 'Directorate'}</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Global Command Search Modal */}
      <GlobalSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        language={language}
        onNavigateTab={onNavigateTab}
        onSearchSubmit={setSearchQuery}
      />
    </header>
  );
};
