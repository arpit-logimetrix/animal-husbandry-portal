import React from 'react';
import { Language } from '../types';
import { Megaphone, ArrowUpRight, TrendingUp, ChevronRight, Bot, Stethoscope, Sparkles, ShieldCheck, Ambulance, Users, IndianRupee } from 'lucide-react';

interface HeroBannerProps {
  language: Language;
  onOpenFamilyIdModal: () => void;
  onOpenAiChat: () => void;
  onOpenDiseaseAi: () => void;
  onOpenMVU: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  language,
  onOpenFamilyIdModal,
  onOpenAiChat,
  onOpenDiseaseAi,
  onOpenMVU,
}) => {
  const isHi = language === 'hi';

  return (
    <div className="bg-[#F8FAFC] border-b border-slate-200/80 py-4 px-4 space-y-3.5">
      <div className="max-w-7xl mx-auto space-y-3.5">
        
        {/* 1. Official Alert Bar with amber left-strip accent */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm animate-fade-in-down flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center min-w-0 flex-1">
            <div className="w-1 self-stretch bg-amber-400 shrink-0" />
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 overflow-hidden">
              <span className="bg-amber-100 text-amber-800 border border-amber-200 font-bold text-[10px] px-2 py-0.5 rounded-md uppercase flex items-center gap-1.5 shrink-0 font-mono tracking-tight">
                <Megaphone className="w-3 h-3 text-amber-600" />
                <span>{isHi ? 'आधिकारिक चेतावनी' : 'Official Alert'}</span>
              </span>
              <p className="text-slate-700 font-medium text-xs truncate">
                {isHi
                  ? 'FMD चरण-IV टीकाकरण अभियान सक्रिय • 1962 डायल कर निकटतम एमवीयू मँगवाएँ'
                  : 'FMD Phase-IV Round Active in Lucknow & Varanasi • Dial 1962 for Doorstep MVU Ambulance'}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAiChat}
            className="text-amber-700 hover:text-amber-900 text-xs font-bold inline-flex items-center gap-1 shrink-0 self-end sm:self-auto hover:underline pr-4 pb-2.5 sm:pb-0"
          >
            <span>{isHi ? 'विवरण देखें' : 'View details'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. Key KPIs Row (4 Clean Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Livestock Tagged */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex flex-col justify-between shadow-2xs hover:border-emerald-300 transition-all space-y-1.5">
            <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>{isHi ? 'पंजीकृत पशुधन' : 'LIVESTOCK TAGGED'}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight">1,28,450</div>
              <span className="inline-flex items-center text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                <TrendingUp className="w-3 h-3 mr-0.5 text-emerald-600" /> +4.2%
              </span>
            </div>
          </div>

          {/* 1962 MVU GPS Fleet */}
          <div
            onClick={onOpenMVU}
            className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex flex-col justify-between shadow-2xs hover:border-amber-300 transition-all cursor-pointer space-y-1.5 group"
          >
            <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>{isHi ? '1962 एमवीयू बेड़ा' : '1962 MVU GPS FLEET'}</span>
              <Ambulance className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight">142</div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                100% On-Duty
              </span>
            </div>
          </div>

          {/* Beneficiaries Verified */}
          <div
            onClick={onOpenFamilyIdModal}
            className="bg-white border border-slate-200/90 rounded-xl p-3.5 flex flex-col justify-between shadow-2xs hover:border-emerald-300 transition-all cursor-pointer space-y-1.5 group"
          >
            <div className="flex justify-between items-center text-slate-500 text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>{isHi ? 'सत्यापित लाभार्थी' : 'BENEFICIARIES VERIFIED'}</span>
              <Users className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight">98.4%</div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded flex items-center">
                <ArrowUpRight className="w-3 h-3 text-emerald-600 mr-0.5" /> DBT Ready
              </span>
            </div>
          </div>

          {/* Budget Disbursed */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all space-y-2 accent-top-slate animate-fade-in-up delay-300">
            <div className="flex justify-between items-center">
              <div className="p-1.5 bg-slate-100 rounded-lg">
                <IndianRupee className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <span className="text-[9.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                {isHi ? 'बजट वितरण' : 'BUDGET DISBURSED'}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight kpi-number">₹133.5 Cr</div>
              <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                74% Utilized
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-5 items-center animate-fade-in-up delay-150">
          {/* Left 65% - Departmental Intelligence Center */}
          <div className="md:col-span-8 space-y-4 md:border-r border-slate-100 md:pr-5">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#14532D] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>{isHi ? 'विभागीय इंटेलिजेंस सेंटर' : 'Departmental Intelligence Center'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {isHi
                  ? 'पशुधन स्वास्थ्य, 1962 एम्बुलेंस संचालन व योजनाओं का लाइव डैशबोर्ड'
                  : 'Real-time overview of livestock health, MVU operations, beneficiaries & schemes.'}
              </h2>
            </div>

            {/* 4 Quick Sub-Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {[
                { val: '128K', label: isHi ? 'पशुधन' : 'Livestock', color: 'text-slate-900' },
                { val: '98.4%', label: isHi ? 'सत्यापित' : 'Verified', color: 'text-emerald-800' },
                { val: '142', label: isHi ? 'सक्रिय एमवीयू' : 'Active MVUs', color: 'text-amber-800' },
                { val: '74%', label: isHi ? 'बजट प्रयुक्त' : 'Budget Used', color: 'text-slate-700' },
              ].map((m, i) => (
                <div key={i} className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-left hover:bg-white hover:border-slate-200 transition-colors">
                  <div className={`text-lg font-extrabold font-mono ${m.color}`}>{m.val}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 35% - Pashu Sahayak AI Box — Premium */}
          <div className="md:col-span-4 space-y-3 p-4 rounded-xl border"
            style={{background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%)', borderColor: 'rgba(20,83,45,0.2)'}}>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#14532D]">
                <div className="p-1 bg-white rounded-lg border border-emerald-200 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <span>{isHi ? 'पशु सहायक AI एडवाइज़री' : 'Pashu Sahayak AI'}</span>
                <span className="ml-auto text-[9px] font-mono bg-white border border-emerald-200 text-emerald-700 px-1.5 py-0.5 rounded-md">24×7</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isHi
                  ? 'पशु स्वास्थ्य, बीमारी के लक्षण व सरकारी सब्सिडी के प्रश्न पूछें।'
                  : 'Ask about livestock health, schemes or doorstep veterinary services.'}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onOpenAiChat}
                className="ai-btn-shimmer flex-1 bg-[#14532D] hover:bg-[#0f3e21] text-white text-xs font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{isHi ? 'AI से पूछें' : 'Ask AI'}</span>
              </button>

              <button
                onClick={onOpenDiseaseAi}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-3 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-sm hover:border-teal-300"
              >
                <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
                <span>{isHi ? 'रोग स्कैन' : 'Disease Scan'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
