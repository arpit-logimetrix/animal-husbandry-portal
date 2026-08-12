import React, { useState, useEffect } from 'react';
import { Search, X, Clock, ArrowRight, Tag, Users, Award, Stethoscope, ChevronRight, Sparkles } from 'lucide-react';
import { ModuleTab, Language } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onNavigateTab: (tab: ModuleTab) => void;
  onSearchSubmit: (query: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  language,
  onNavigateTab,
  onSearchSubmit,
}) => {
  const isHi = language === 'hi';
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or state
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const recentSearches = [
    { text: 'TAG-IN-889012', type: 'Animal Ear Tag', tab: 'large_animal' as ModuleTab },
    { text: 'Family ID FID-883921', type: 'Family ID Link', tab: 'beneficiary' as ModuleTab },
    { text: 'Dairy Development Scheme', type: 'Subsidy Scheme', tab: 'beneficiary' as ModuleTab },
    { text: 'Lucknow Central MVU', type: '1962 Ambulance', tab: 'mvu' as ModuleTab },
  ];

  const quickActions = [
    { label: isHi ? 'नया पशु पंजीकृत करें' : 'Register New Animal', icon: <Tag className="w-4 h-4 text-[#14532D]" />, tab: 'large_animal' as ModuleTab },
    { label: isHi ? 'फैमिली आईडी खोजें' : 'Verify Family ID', icon: <Users className="w-4 h-4 text-emerald-600" />, tab: 'beneficiary' as ModuleTab },
    { label: isHi ? '1962 एमवीयू बुक करें' : 'Book 1962 MVU Ambulance', icon: <Stethoscope className="w-4 h-4 text-amber-600" />, tab: 'mvu' as ModuleTab },
    { label: isHi ? 'प्रशिक्षण प्रमाणपत्र' : 'View Training Certificates', icon: <Award className="w-4 h-4 text-teal-600" />, tab: 'training' as ModuleTab },
  ];

  const handleSelectRecent = (itemText: string, tab: ModuleTab) => {
    onSearchSubmit(itemText);
    onNavigateTab(tab);
    onClose();
  };

  const handleSelectAction = (tab: ModuleTab) => {
    onNavigateTab(tab);
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query.trim());
      onNavigateTab('large_animal');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden space-y-0 text-slate-900 transition-all">
        {/* Search Input Bar */}
        <form onSubmit={handleFormSubmit} className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isHi ? 'टैग नंबर, फैमिली आईडी, योजना या अधिकारी खोजें...' : 'Search Ear Tag ID, Family ID, Scheme, Officer or District...'}
            className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-500 bg-white border border-slate-200 rounded shadow-2xs">
            ESC
          </kbd>
        </form>

        <div className="p-4 space-y-5 text-xs max-h-[60vh] overflow-y-auto">
          {/* Quick Actions */}
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              {isHi ? 'त्वरित कार्य' : 'QUICK ACTIONS'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAction(action.tab)}
                  className="flex items-center gap-2.5 p-2.5 bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 rounded-xl text-left text-slate-700 hover:text-[#14532D] font-medium transition-all group"
                >
                  <div className="p-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0">
                    {action.icon}
                  </div>
                  <span className="truncate text-xs">{action.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-slate-400 group-hover:text-[#14532D] transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              {isHi ? 'हाल के खोज' : 'RECENT SEARCHES'}
            </div>
            <div className="space-y-1">
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectRecent(item.text, item.tab)}
                  className="w-full flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg text-slate-700 transition-all text-xs group"
                >
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-900 group-hover:text-[#14532D]">{item.text}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            AHD Enterprise Search • Digital India
          </span>
          <span>Press Enter to search</span>
        </div>
      </div>
    </div>
  );
};
