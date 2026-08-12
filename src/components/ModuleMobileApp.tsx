import React, { useState } from 'react';
import { Language } from '../types';
import { Smartphone, Bell, Heart, GraduationCap, Award, Shield, PhoneCall, CheckCircle2, ChevronRight, User, Milk, Stethoscope, Bot } from 'lucide-react';

interface ModuleMobileAppProps {
  language: Language;
}

export const ModuleMobileApp: React.FC<ModuleMobileAppProps> = ({
  language,
}) => {
  const isHi = language === 'hi';
  const [mobileTab, setMobileTab] = useState<'home' | 'services' | 'notifications' | 'profile'>('home');
  const [serviceBooked, setServiceBooked] = useState(false);

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-[#14532D]" />
            <span>{isHi ? 'पशुसेवा मोबाइल ऐप (Android & iOS सिम्युलेटर)' : 'PashuSeva Mobile App Simulator'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? 'नागरिक/पशुपालक मोबाइल ऐप, स्वास्थ्य सेवा बुकिंग, डिजिटल प्रमाणपत्र एवं पुश नोटिफिकेशन'
              : 'Mobile Application (Android/iOS) for Scheme Application, Vet Service Booking, Push Alerts & E-Certificates'}
          </p>
        </div>

        <span className="bg-emerald-100 text-[#14532D] text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-200">
          Cross-Platform Mobile Simulator Active
        </span>
      </div>

      {/* Smartphone Mockup */}
      <div className="max-w-sm mx-auto bg-slate-900 rounded-[40px] p-4 shadow-2xl border-4 border-slate-800 text-slate-900 relative">
        {/* Phone Speaker Notch */}
        <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-3"></div>

        {/* Screen Content */}
        <div className="bg-slate-50 rounded-[30px] p-4 min-h-[520px] flex flex-col justify-between space-y-4">
          {/* App Status Bar */}
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 border-b pb-2">
            <span className="flex items-center gap-1 text-[#14532D]">
              <Milk className="w-3.5 h-3.5 text-[#14532D]" />
              पशुसेवा App
            </span>
            <span>Family ID Linked</span>
          </div>

          {/* Screen Body */}
          {mobileTab === 'home' && (
            <div className="space-y-3 text-xs">
              {/* Farmer Profile Card */}
              <div className="bg-[#14532D] text-white p-4 rounded-2xl shadow-sm space-y-1">
                <div className="text-[10px] text-amber-300 font-bold tracking-wider">WELCOME FARMER</div>
                <div className="font-bold text-base">Ramesh Kumar</div>
                <div className="text-[10px] text-slate-200 font-mono">FID-883921 • Lucknow</div>
              </div>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setServiceBooked(true);
                    setTimeout(() => setServiceBooked(false), 2200);
                  }}
                  className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-[#14532D] text-left space-y-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#14532D] flex items-center justify-center font-bold">
                    💉
                  </div>
                  <div className="font-bold text-slate-900 text-xs">Book AI / Vaccine</div>
                  <div className="text-[9px] text-slate-500">Doorstep vet care</div>
                </button>

                <button
                  onClick={() => {
                    setServiceBooked(true);
                    setTimeout(() => setServiceBooked(false), 2200);
                  }}
                  className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:border-amber-500 text-left space-y-1"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    🚑
                  </div>
                  <div className="font-bold text-slate-900 text-xs">Call 1962 MVU</div>
                  <div className="text-[9px] text-slate-500">Emergency ambulance</div>
                </button>
              </div>

              {serviceBooked && (
                <div className="bg-emerald-100 text-[#14532D] p-3 rounded-xl font-bold text-center text-[11px] animate-bounce border border-emerald-300">
                  ✓ Doorstep AI Vaccination Request Sent! Vet Assigned.
                </div>
              )}

              {/* Recent Cattle Record */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between items-center text-[11px] font-bold text-slate-900">
                  <span>TAG-IN-88902 (Murrah)</span>
                  <span className="text-[#16A34A] font-mono">15.5 L/day</span>
                </div>
                <div className="text-[10px] text-slate-500">Last FMD Vaccine: 2026-02-10 • Next Due: Oct 2026</div>
              </div>
            </div>
          )}

          {/* App Bottom Navigation Bar */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 flex justify-around text-[10px] font-semibold text-slate-600">
            <button onClick={() => setMobileTab('home')} className={`p-1 ${mobileTab === 'home' ? 'text-[#14532D] font-bold' : ''}`}>Home</button>
            <button onClick={() => setMobileTab('services')} className={`p-1 ${mobileTab === 'services' ? 'text-[#14532D] font-bold' : ''}`}>Services</button>
            <button onClick={() => setMobileTab('notifications')} className={`p-1 ${mobileTab === 'notifications' ? 'text-[#14532D] font-bold' : ''}`}>Alerts</button>
          </div>
        </div>
      </div>
    </div>
  );
};
