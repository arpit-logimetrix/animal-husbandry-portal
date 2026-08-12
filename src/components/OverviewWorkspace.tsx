import React from 'react';
import { ModuleTab, Language } from '../types';
import {
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
  ArrowRight,
  PlusCircle,
  FileText,
  AlertTriangle,
  BellRing,
  Activity,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface OverviewWorkspaceProps {
  language: Language;
  onNavigateTab: (tab: ModuleTab) => void;
  onOpenAiChat: () => void;
  onOpenDiseaseAi: () => void;
  onOpenFamilyIdModal: () => void;
}

export const OverviewWorkspace: React.FC<OverviewWorkspaceProps> = ({
  language,
  onNavigateTab,
  onOpenAiChat,
  onOpenDiseaseAi,
  onOpenFamilyIdModal,
}) => {
  const isHi = language === 'hi';

  // Grouped compact module declarations matching Points #10, #11, #12, #15, #16
  const moduleGroups = [
    {
      titleEn: 'LIVESTOCK OPERATIONS',
      titleHi: 'पशुधन एवं चिकित्सा संचालन',
      modules: [
        {
          id: 'large_animal' as ModuleTab,
          titleEn: 'Large Animal Management',
          titleHi: 'बड़े पशु प्रबंधन (गाय/भैंस)',
          descEn: 'Cattle & Buffalo health, breeding and milk logs',
          metric: '128,450 Tagged',
          icon: <Milk className="w-4 h-4 text-emerald-700" />,
          accent: 'border-emerald-400/80 bg-emerald-50/20',
        },
        {
          id: 'small_animal' as ModuleTab,
          titleEn: 'Small Animal Management',
          titleHi: 'छोटे पशु प्रबंधन (बकरी/भेड़)',
          descEn: 'Goat & Sheep registration & PPR vaccination',
          metric: '45,210 Tagged',
          icon: <Feather className="w-4 h-4 text-emerald-700" />,
          accent: 'border-slate-200 bg-white',
        },
        {
          id: 'poultry' as ModuleTab,
          titleEn: 'Poultry & Biosecurity',
          titleHi: 'कुक्कुट पालन व बायोसिक्योरिटी',
          descEn: 'Avian flu surveillance & farm registry',
          metric: '1,240 Farms',
          icon: <Feather className="w-4 h-4 text-amber-600" />,
          accent: 'border-slate-200 bg-white',
        },
        {
          id: 'mvu' as ModuleTab,
          titleEn: 'MVU Emergency GPS',
          titleHi: '1962 एमवीयू एम्बुलेंस जीके',
          descEn: 'Doorstep mobile veterinary unit dispatch',
          metric: '142 Units Active',
          icon: <Ambulance className="w-4 h-4 text-amber-600" />,
          accent: 'border-amber-300/80 bg-amber-50/30',
          badge: '1962 LIVE',
        },
      ],
    },
    {
      titleEn: 'BENEFICIARY & PROGRAMS',
      titleHi: 'लाभार्थी व योजनाएं',
      modules: [
        {
          id: 'beneficiary' as ModuleTab,
          titleEn: 'Beneficiary & Family ID',
          titleHi: 'लाभार्थी व फैमिली आईडी लिंक',
          descEn: 'Aadhaar & Family ID verified DBT accounts',
          metric: '98.4% Verified',
          icon: <Users className="w-4 h-4 text-teal-700" />,
          accent: 'border-slate-200 bg-white',
        },
        {
          id: 'budget' as ModuleTab,
          titleEn: 'Budget & Scheme MIS',
          titleHi: 'बजट व योजना एमआईएस',
          descEn: 'Fund allocation, sanction & DBT status',
          metric: '₹133.5 Cr Disbursed',
          icon: <IndianRupee className="w-4 h-4 text-[#14532D]" />,
          accent: 'border-slate-200 bg-white',
        },
        {
          id: 'training' as ModuleTab,
          titleEn: 'Training & E-Certificates',
          titleHi: 'किसान प्रशिक्षण व ई-प्रमाणपत्र',
          descEn: 'Scientific farming skills & certification',
          metric: '12,850 Certified',
          icon: <GraduationCap className="w-4 h-4 text-amber-600" />,
          accent: 'border-slate-200 bg-white',
        },
      ],
    },
    {
      titleEn: 'DEPARTMENT MANAGEMENT',
      titleHi: 'विभाग प्रबंधन',
      modules: [
        {
          id: 'assets' as ModuleTab,
          titleEn: 'Asset & Vaccine Stock',
          titleHi: 'परिसंपत्ति व टीका स्टॉक',
          descEn: 'Cold chain, vaccines & equipment inventory',
          metric: '8,420 Vials In-Stock',
          icon: <Package className="w-4 h-4 text-[#14532D]" />,
          accent: 'border-slate-200 bg-white',
        },
        {
          id: 'directory' as ModuleTab,
          titleEn: 'Officer Directory & Cadre',
          titleHi: 'अधिकारी व पशुचिकित्सक केडर',
          descEn: 'District officers, VAS & field staff directory',
          metric: '1,450 Staff Listed',
          icon: <Building className="w-4 h-4 text-[#14532D]" />,
          accent: 'border-slate-200 bg-white',
        },
      ],
    },
    {
      titleEn: 'INTELLIGENCE & AI',
      titleHi: 'इंटेलिजेंस व एआई',
      modules: [
        {
          id: 'dashboard' as ModuleTab,
          titleEn: 'GIS Command Center',
          titleHi: 'जीआईएस कमान सेंटर',
          descEn: 'Statewide spatial mapping & disease heatmap',
          metric: '75 Districts Mapped',
          icon: <LayoutDashboard className="w-4 h-4 text-emerald-700" />,
          accent: 'border-emerald-300/80 bg-emerald-50/40',
        },
        {
          id: 'mobile_app' as ModuleTab,
          titleEn: 'PashuSeva Field App',
          titleHi: 'पशुसेवा फील्ड ऐप',
          descEn: 'Field officer offline sync simulator',
          metric: 'Simulator Ready',
          icon: <Smartphone className="w-4 h-4 text-teal-700" />,
          accent: 'border-slate-200 bg-white',
        },
        {
          id: 'ai_assistant' as ModuleTab,
          titleEn: 'Pashu Sahayak AI',
          titleHi: 'पशु सहायक AI सलाहकार',
          descEn: 'Gemini-powered 24x7 livestock advisor',
          metric: '24x7 Online',
          icon: <Sparkles className="w-4 h-4 text-amber-500" />,
          accent: 'border-teal-300 bg-gradient-to-br from-teal-50/60 to-emerald-50/60',
          badge: 'AI ENGINE',
        },
      ],
    },
  ];

  // Today's Operations metrics (Point #19)
  const todaysActivities = [
    { name: isHi ? 'एमवीयू कॉल (1962)' : 'MVU Calls (1962)', today: '286', change: '+12%', positive: true },
    { name: isHi ? 'एफएमडी टीकाकरण' : 'FMD Vaccinations', today: '1,284', change: '+8%', positive: true },
    { name: isHi ? 'कृत्रिम गर्भाधान (AI)' : 'AI / Breeding Procedures', today: '142', change: '+4%', positive: true },
    { name: isHi ? 'नए पशु टैग पंजीकरण' : 'New Tag Registrations', today: '96', change: '+7%', positive: true },
    { name: isHi ? 'लंबित डीबीटी अनुमोदन' : 'Pending DBT Approvals', today: '14', change: '-2%', positive: true },
  ];

  // District Performance records (Point #20)
  const districtPerformance = [
    { name: 'Lucknow', livestock: '18,420', vaccination: '96.2%', mvu: '12 Active', scheme: '88%', status: 'Optimal' },
    { name: 'Varanasi', livestock: '15,110', vaccination: '94.8%', mvu: '10 Active', scheme: '84%', status: 'Optimal' },
    { name: 'Gorakhpur', livestock: '14,890', vaccination: '92.1%', mvu: '9 Active', scheme: '79%', status: 'Normal' },
    { name: 'Agra', livestock: '13,200', vaccination: '90.5%', mvu: '8 Active', scheme: '76%', status: 'Normal' },
    { name: 'Kanpur', livestock: '12,950', vaccination: '88.4%', mvu: '8 Active', scheme: '72%', status: 'Attention' },
    { name: 'Prayagraj', livestock: '11,800', vaccination: '91.2%', mvu: '7 Active', scheme: '78%', status: 'Normal' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-6">
      {/* Main Grid: 75% Operations & Analytics + 25% Intelligence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (~75%) - Department Operations & Tables */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Department Operations - Compact Modules */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-1">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14532D]" />
                <span>{isHi ? 'विभागीय कार्य क्षेत्र' : 'Department Operations'}</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                {isHi ? 'मॉड्यूल खोलने हेतु किसी भी कार्ड पर क्लिक करें' : 'Click any module to open workspace'}
              </span>
            </div>

            {/* Grouped Modules */}
            <div className="space-y-5">
              {moduleGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest pl-0.5">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span>{isHi ? group.titleHi : group.titleEn}</span>
                    <div className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {group.modules.map((mod) => {
                        const accentMap: Record<string, string> = {
                          large_animal: 'accent-top-green',
                          small_animal: 'accent-top-green',
                          poultry: 'accent-top-amber',
                          mvu: 'accent-top-amber',
                          beneficiary: 'accent-top-teal',
                          budget: 'accent-top-green',
                          training: 'accent-top-amber',
                          assets: 'accent-top-slate',
                          directory: 'accent-top-slate',
                          dashboard: 'accent-top-green',
                          mobile_app: 'accent-top-teal',
                          ai_assistant: 'accent-top-teal',
                        };
                        const accent = accentMap[mod.id] || 'accent-top-slate';
                        return (
                          <div
                            key={mod.id}
                            onClick={() => onNavigateTab(mod.id)}
                            className={`module-tile bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col justify-between cursor-pointer group shadow-sm hover:border-slate-300 min-h-[128px] ${accent}`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 shadow-sm shrink-0 group-hover:bg-white transition-colors">
                                  {mod.icon}
                                </div>
                                {mod.badge ? (
                                  <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-md animate-pulse-amber">
                                    {mod.badge}
                                  </span>
                                ) : (
                                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#14532D] group-hover:translate-x-0.5 transition-all" />
                                )}
                              </div>

                              <div>
                                <h4 className="font-bold text-slate-800 text-xs group-hover:text-[#14532D] transition-colors line-clamp-1">
                                  {isHi ? mod.titleHi : mod.titleEn}
                                </h4>
                                <p className="text-[10.5px] text-slate-400 line-clamp-1 mt-0.5 leading-snug">
                                  {mod.descEn}
                                </p>
                              </div>
                            </div>

                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-semibold">
                              <span className="text-slate-600 truncate">{mod.metric}</span>
                              <span className="text-[#14532D] font-sans text-[10px] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">Open →</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Today's Operations Table (Point #19) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#14532D]" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  {isHi ? 'आज की विभागीय गतिविधियाँ (Today\'s Operations)' : 'Today\'s Operations'}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                LIVE METRICS
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50/80 text-slate-500 text-[10px] font-mono uppercase">
                    <th className="py-2.5 px-3 font-semibold rounded-tl-lg">{isHi ? 'गतिविधि' : 'Activity'}</th>
                    <th className="py-2.5 px-3 font-semibold text-right">{isHi ? 'आज की संख्या' : 'Today'}</th>
                    <th className="py-2.5 px-3 font-semibold text-right rounded-tr-lg">{isHi ? 'मासिक बदलाव' : 'Change'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {todaysActivities.map((act, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{act.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900 text-right">{act.today}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-right">
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-[10px]">{act.change}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* District Performance Table (Point #20) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-700" />
                <span>{isHi ? 'जिला स्तरीय प्रगति' : 'District Performance'}</span>
              </h3>
              <button
                onClick={() => onNavigateTab('dashboard')}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 hover:underline inline-flex items-center gap-1"
              >
                <span>{isHi ? 'सभी जिले देखें' : 'View all districts'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-200 bg-slate-50/80 text-slate-500 text-[10px] font-mono uppercase">
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'जिला' : 'District'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'पंजीकृत पशु' : 'Livestock'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'टीकाकरण %' : 'Vaccination'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'एमवीयू स्थिति' : 'MVU Fleet'}</th>
                    <th className="py-2.5 px-3 font-semibold">{isHi ? 'योजना पूर्णता' : 'Scheme Completion'}</th>
                    <th className="py-2.5 px-3 font-semibold text-right">{isHi ? 'स्थिति' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {districtPerformance.map((dist, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{dist.name}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-700">{dist.livestock}</td>
                      <td className="py-2.5 px-3">
                        <span className="font-mono font-bold text-emerald-700">{dist.vaccination}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">{dist.mvu}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">{dist.scheme}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                            dist.status === 'Optimal'
                              ? 'badge-optimal'
                              : dist.status === 'Normal'
                              ? 'badge-normal'
                              : 'badge-attention'
                          }`}
                        >
                          {dist.status === 'Optimal' ? '✓ Optimal' : dist.status === 'Normal' ? '– Normal' : '⚠ Attention'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column (~25%) - Right Intelligence Panel */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* 1. Official Alerts & Notifications (Point #13) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <BellRing className="w-3.5 h-3.5 text-amber-600" />
                <span>Alerts & Notifications</span>
              </h4>
              <span className="text-[9px] font-mono bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded">4 NEW</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 border-l-[3px] border-l-amber-400 bg-amber-50/60 border border-amber-100 rounded-lg space-y-0.5">
                <div className="font-bold text-amber-900 text-[11px] flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>FMD Alert Active</span>
                </div>
                <p className="text-[10.5px] text-amber-800/80 leading-tight">
                  Lucknow &amp; Varanasi Phase-IV vaccination in progress.
                </p>
              </div>

              <div className="p-2.5 border-l-[3px] border-l-slate-400 bg-slate-50 border border-slate-100 rounded-lg space-y-0.5">
                <div className="font-semibold text-slate-800 text-[11px]">Vaccination Due</div>
                <p className="text-[10.5px] text-slate-500">12,400 cattle in Gorakhpur need PPR booster.</p>
              </div>

              <div className="p-2.5 border-l-[3px] border-l-blue-400 bg-blue-50/50 border border-blue-100 rounded-lg space-y-0.5">
                <div className="font-semibold text-slate-800 text-[11px]">MVU Dispatch #14</div>
                <p className="text-[10.5px] text-slate-500">1962 Unit en route to Gram Bilaspur.</p>
              </div>

              <div className="p-2.5 border-l-[3px] border-l-emerald-400 bg-emerald-50/50 border border-emerald-100 rounded-lg space-y-0.5">
                <div className="font-semibold text-slate-800 text-[11px]">Budget Approved</div>
                <p className="text-[10.5px] text-slate-500">₹1.20 Cr released for dairy infrastructure.</p>
              </div>
            </div>
          </div>

          {/* 2. Quick Actions (Point #17) - Compact Buttons */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-2">
              {isHi ? 'त्वरित कार्य (Quick Actions)' : 'Quick Actions'}
            </h4>

            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('large_animal')}
                className="w-full p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-[#14532D] transition-all"
              >
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Register Animal</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateTab('mvu')}
                className="w-full p-2.5 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-amber-900 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Ambulance className="w-3.5 h-3.5 text-amber-600" />
                  <span>Book 1962 MVU</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={onOpenFamilyIdModal}
                className="w-full p-2.5 bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-teal-900 transition-all"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>Check Eligibility</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigateTab('mobile_app')}
                className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-between text-xs font-semibold text-slate-800 hover:text-slate-900 transition-all"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-600" />
                  <span>Download Reports</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* 3. Livestock Health Overview (Point #18) */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-2xs space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Livestock Health
              </h4>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                92.4% HEALTHY
              </span>
            </div>

            {/* Visual Health Breakdown Bar */}
            <div className="space-y-2">
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                <div className="bg-emerald-600 h-full" style={{ width: '92.4%' }} title="Healthy 92.4%" />
                <div className="bg-amber-400 h-full" style={{ width: '3.1%' }} title="Vaccination Due 3.1%" />
                <div className="bg-cyan-500 h-full" style={{ width: '3.4%' }} title="Under Treatment 3.4%" />
                <div className="bg-rose-500 h-full" style={{ width: '1.1%' }} title="Critical 1.1%" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                  <span>Healthy: <b>92.4%</b></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>Vaccine Due: <b>3.1%</b></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                  <span>Treatment: <b>3.4%</b></span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span>Critical: <b>1.1%</b></span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
