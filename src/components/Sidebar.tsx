import React, { useState } from 'react';
import { ModuleTab, Language } from '../types';
import {
  Grid,
  Milk,
  Feather,
  Ambulance,
  Users,
  IndianRupee,
  GraduationCap,
  Package,
  Building,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
  FileText
} from 'lucide-react';
import upLogo from '../assets/up-logo.png';

interface SidebarProps {
  activeTab: ModuleTab;
  setActiveTab: (tab: ModuleTab) => void;
  language: Language;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  language,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const isHi = language === 'hi';
  const [collapsed, setCollapsed] = useState(false);

  type NavGroup = {
    titleEn: string;
    titleHi: string;
    items: {
      id: ModuleTab;
      labelEn: string;
      labelHi: string;
      icon: React.ReactNode;
      badge?: string;
    }[];
  };

  const navGroups: NavGroup[] = [
    {
      titleEn: 'OVERVIEW',
      titleHi: 'अवलोकन',
      items: [
        { id: 'overview', labelEn: 'Dashboard', labelHi: 'मुख्य डैशबोर्ड', icon: <Grid className="w-4 h-4" /> },
      ],
    },
    {
      titleEn: 'OPERATIONS',
      titleHi: 'विभागीय कार्य',
      items: [
        { id: 'large_animal', labelEn: 'Large Animals', labelHi: 'बड़े पशु', icon: <Milk className="w-4 h-4" /> },
        { id: 'small_animal', labelEn: 'Small Animals', labelHi: 'छोटे पशु', icon: <Feather className="w-4 h-4" /> },
        { id: 'poultry', labelEn: 'Poultry', labelHi: 'कुक्कुट पालन', icon: <Feather className="w-4 h-4 text-amber-300" /> },
        { id: 'mvu', labelEn: 'MVU Operations', labelHi: 'एमवीयू 1962 एम्बुलेंस', icon: <Ambulance className="w-4 h-4 text-amber-400" />, badge: '1962 LIVE' },
      ],
    },
    {
      titleEn: 'PROGRAMS',
      titleHi: 'योजनाएं व कार्यक्रम',
      items: [
        { id: 'beneficiary', labelEn: 'Beneficiaries', labelHi: 'लाभार्थी पोर्टल', icon: <Users className="w-4 h-4" />, badge: 'DBT' },
        { id: 'budget', labelEn: 'Schemes & Benefits', labelHi: 'योजनाएं व बजट', icon: <IndianRupee className="w-4 h-4 text-emerald-300" /> },
        { id: 'training', labelEn: 'Training', labelHi: 'किसान प्रशिक्षण', icon: <GraduationCap className="w-4 h-4 text-amber-300" /> },
      ],
    },
    {
      titleEn: 'MANAGEMENT',
      titleHi: 'प्रबंधन व स्टॉक',
      items: [
        { id: 'assets', labelEn: 'Assets & Inventory', labelHi: 'परिसंपत्ति व टीका स्टॉक', icon: <Package className="w-4 h-4" /> },
        { id: 'directory', labelEn: 'Officer Directory', labelHi: 'अधिकारी निर्देशिका', icon: <Building className="w-4 h-4" /> },
      ],
    },
    {
      titleEn: 'INTELLIGENCE',
      titleHi: 'इंटेलिजेंस व एआई',
      items: [
        { id: 'dashboard', labelEn: 'GIS Command Center', labelHi: 'जीआईएस कमान सेंटर', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'mobile_app', labelEn: 'Reports & Analytics', labelHi: 'रिपोर्ट व फील्ड ऐप', icon: <Smartphone className="w-4 h-4 text-teal-300" /> },
        { id: 'ai_assistant', labelEn: 'Pashu Sahayak AI', labelHi: 'पशु सहायक AI', icon: <Sparkles className="w-4 h-4 text-amber-300" />, badge: 'AI' },
      ],
    },
  ];

  const handleSelectTab = (tab: ModuleTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full overflow-hidden" style={{background: 'linear-gradient(180deg, #14532D 0%, #0f3e21 100%)'}}>
      {/* Top Branding Section */}
      <div className="px-3.5 pt-4 pb-3 border-b border-emerald-800/50 flex items-center justify-between shrink-0">
        <div className={`flex items-center space-x-2.5 overflow-hidden ${collapsed ? 'justify-center w-full' : ''}`}>
          {/* UP Govt Seal Logo */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-white border-2 border-amber-400/40 p-0.5 shadow-sm">
            <img src={upLogo} alt="UP Govt Seal" className="w-full h-full object-contain rounded-full" />
          </div>

          {(!collapsed || mobileOpen) && (
            <div className="transition-all duration-200">
              <div className="text-[10px] font-mono font-bold tracking-widest text-amber-400/90 uppercase">UP SARKAR</div>
              <h2 className="text-xs font-bold text-white/95 tracking-tight leading-snug">
                {isHi ? 'पशुपालन कमान सेंटर' : 'GovTech Command'}
              </h2>
            </div>
          )}
        </div>

        {mobileOpen && (
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg hover:bg-white/10 text-emerald-200 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Grouped Navigation */}
      <nav className="p-2 pt-3 space-y-4 flex-1 overflow-y-auto min-h-0 text-white"
        style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.15) transparent'}}>
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-0.5">
            {(!collapsed || mobileOpen) && (
              <div className="px-3 pb-1.5 flex items-center gap-2">
                <div className="h-px flex-1 bg-emerald-700/50" />
                <div className="text-[9.5px] font-mono font-bold text-emerald-400/60 tracking-widest uppercase whitespace-nowrap">
                  {isHi ? group.titleHi : group.titleEn}
                </div>
                <div className="h-px flex-1 bg-emerald-700/50" />
              </div>
            )}

            {group.items.map((item) => {
              const isActive = activeTab === item.id;
              const isCollapsedView = collapsed && !mobileOpen;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  title={isCollapsedView ? (isHi ? item.labelHi : item.labelEn) : undefined}
                  className={`w-full flex items-center ${
                    isCollapsedView ? 'justify-center px-2 h-[38px]' : 'justify-between px-3 h-[38px]'
                  } rounded-xl text-xs font-medium transition-all relative group ${
                    isActive
                      ? 'sidebar-active-pill font-bold'
                      : 'text-emerald-100/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className={`shrink-0 transition-colors ${
                      isActive ? 'text-[#14532D]' : 'text-emerald-300/80 group-hover:text-emerald-100'
                    }`}>
                      {item.icon}
                    </span>
                    {(!collapsed || mobileOpen) && (
                      <span className="truncate text-left text-[12.5px] font-medium">
                        {isHi ? item.labelHi : item.labelEn}
                      </span>
                    )}
                  </div>

                  {(!collapsed || mobileOpen) && item.badge && (
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded-md text-[9px] font-mono font-bold shrink-0 ${
                        item.badge === '1962 LIVE'
                          ? 'bg-amber-500/25 text-amber-200 border border-amber-400/40 animate-pulse-amber'
                          : isActive
                          ? 'bg-emerald-200 text-[#14532D]'
                          : 'bg-white/10 text-emerald-200 border border-white/10'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer / Collapse Button */}
      <div className="p-3 border-t border-emerald-800/40 bg-black/10 flex items-center justify-between shrink-0">
        {(!collapsed || mobileOpen) && (
          <div className="flex items-center gap-1.5 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-dot-blink" />
            <span className="text-[10px] text-emerald-400/80 font-mono">System Live</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 hover:text-white transition-all mx-auto hidden lg:block"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex bg-[#14532D] text-white flex-col transition-all duration-300 z-20 shrink-0 border-r border-emerald-900 shadow-xl h-full overflow-hidden ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-68 max-w-[85vw] bg-[#14532D] text-white flex flex-col h-full shadow-2xl z-10 animate-slideRight">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
