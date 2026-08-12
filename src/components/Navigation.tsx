import React from 'react';
import { ModuleTab, Language } from '../types';
import {
  LayoutDashboard,
  Milk,
  Feather,
  GraduationCap,
  IndianRupee,
  Users,
  Building,
  Package,
  Ambulance,
  Smartphone,
  Sparkles,
  Stethoscope,
  Grid
} from 'lucide-react';

interface NavigationProps {
  activeTab: ModuleTab;
  setActiveTab: (tab: ModuleTab) => void;
  language: Language;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, language }) => {
  const isHi = language === 'hi';

  const tabs: { id: ModuleTab; labelEn: string; labelHi: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', labelEn: 'Overview', labelHi: 'मुख्य पृष्ठ', icon: <Grid className="w-4 h-4" /> },
    { id: 'large_animal', labelEn: 'Large Animals', labelHi: 'बड़े पशु (गाय/भैंस)', icon: <Milk className="w-4 h-4" /> },
    { id: 'small_animal', labelEn: 'Small Animals', labelHi: 'छोटे पशु (बकरी/भेड़)', icon: <Feather className="w-4 h-4" /> },
    { id: 'poultry', labelEn: 'Poultry', labelHi: 'कुक्कुट (मुर्गी पालन)', icon: <Feather className="w-4 h-4 text-amber-400" /> },
    { id: 'training', labelEn: 'Training & E-Cert', labelHi: 'प्रशिक्षण एवं ई-प्रमाणपत्र', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'budget', labelEn: 'Budget & Finance', labelHi: 'बजट एवं वित्त', icon: <IndianRupee className="w-4 h-4 text-emerald-400" /> },
    { id: 'beneficiary', labelEn: 'Beneficiaries & Family ID', labelHi: 'लाभार्थी एवं फैमिली आईडी', icon: <Users className="w-4 h-4" /> },
    { id: 'directory', labelEn: 'Directory & Posts', labelHi: 'विभागीय निर्देशिका', icon: <Building className="w-4 h-4" /> },
    { id: 'assets', labelEn: 'Assets & Stock', labelHi: 'परिसंपत्ति एवं स्टॉक', icon: <Package className="w-4 h-4" /> },
    { id: 'mvu', labelEn: 'MVU 1962 GPS', labelHi: 'एमवीयू 1962 ट्रैकिंग', icon: <Ambulance className="w-4 h-4 text-red-400" />, badge: 'LIVE' },
    { id: 'dashboard', labelEn: 'MIS Dashboard', labelHi: 'एमआईएस डैशबोर्ड', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'mobile_app', labelEn: 'PashuSeva App', labelHi: 'पशुसेवा ऐप', icon: <Smartphone className="w-4 h-4 text-blue-400" /> },
    { id: 'ai_assistant', labelEn: 'PashuMitra AI', labelHi: 'पशुमित्र AI', icon: <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> },
    { id: 'ai_disease_detector', labelEn: 'AI Disease Scan', labelHi: 'AI रोग स्कैन', icon: <Stethoscope className="w-4 h-4 text-cyan-300" /> },
  ];

  return (
    <nav className="bg-slate-950/90 border-b border-slate-800/80 shadow-md sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-2 overflow-x-auto scrollbar-none flex items-center space-x-1 py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
              }`}
            >
              {tab.icon}
              <span>{isHi ? tab.labelHi : tab.labelEn}</span>
              {tab.badge && (
                <span className="bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md animate-pulse ml-1">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
