import React, { useState } from 'react';
import { LargeAnimal, Language, UserRole } from '../types';
import {
  Milk, Tag, Syringe, Plus, Search, ShieldCheck, Calendar, Activity, CheckCircle2,
  User, ChevronRight, Clock, Sparkles, TrendingUp, AlertTriangle, FileText, Check,
  QrCode, Award, ArrowUpRight, Stethoscope, RefreshCw, Layers
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ModuleLargeAnimalProps {
  animals: LargeAnimal[];
  setAnimals: React.Dispatch<React.SetStateAction<LargeAnimal[]>>;
  language: Language;
  role: UserRole;
  searchQuery: string;
}

export const ModuleLargeAnimal: React.FC<ModuleLargeAnimalProps> = ({
  animals = [],
  setAnimals,
  language,
  role,
  searchQuery = '',
}) => {
  const isHi = language === 'hi';
  const [filterSpecies, setFilterSpecies] = useState<'ALL' | 'Cattle' | 'Buffalo'>('ALL');
  const [selectedAnimal, setSelectedAnimal] = useState<LargeAnimal | null>(animals?.[0] || null);
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'vaccines' | 'breeding' | 'productivity' | 'documents'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '6M' | '1Y'>('30D');

  // New Animal Form State
  const [newTag, setNewTag] = useState('');
  const [newSpecies, setNewSpecies] = useState<'Cattle' | 'Buffalo'>('Buffalo');
  const [newBreed, setNewBreed] = useState('Murrah');
  const [newAge, setNewAge] = useState(3);
  const [newOwner, setNewOwner] = useState('');
  const [newFamilyId, setNewFamilyId] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newDistrict, setNewDistrict] = useState('Lucknow');
  const [newYield, setNewYield] = useState(15.0);

  // New Vaccination Log state
  const [vacDisease, setVacDisease] = useState('Foot & Mouth Disease (FMD)');
  const [vacBatch, setVacBatch] = useState('FMD-2026-X12');

  // New AI Breeding Straw state
  const [strawNo, setStrawNo] = useState('STRAW-MUR-990');
  const [bullBreed, setBullBreed] = useState('Pedigree Murrah Bull #201');

  const filteredAnimals = animals.filter((a) => {
    const matchSearch =
      a.tagNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.ownerFamilyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSpecies = filterSpecies === 'ALL' || a.species === filterSpecies;
    return matchSearch && matchSpecies;
  });

  const handleRegisterAnimal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag || !newOwner) return;

    const created: LargeAnimal = {
      id: `la-${Date.now()}`,
      tagNumber: newTag.startsWith('TAG-') ? newTag : `TAG-IN-${newTag}`,
      species: newSpecies,
      breed: newBreed,
      ageYears: Number(newAge),
      gender: 'Female',
      ownerName: newOwner,
      ownerFamilyId: newFamilyId || 'FID-883921',
      ownerContact: newContact || '+91 98000 00000',
      district: newDistrict,
      block: 'Central Block',
      milkYieldLitersDay: Number(newYield),
      fatPercentage: newSpecies === 'Buffalo' ? 7.2 : 4.5,
      snfPercentage: 8.8,
      vaccinations: [
        {
          disease: 'Foot & Mouth Disease (FMD)',
          date: new Date().toISOString().split('T')[0],
          doseNumber: 1,
          nextDueDate: '2026-10-15',
          batchNumber: 'FMD-NEW-2026',
        },
      ],
      breedingRecords: [],
      healthHistory: [
        {
          date: new Date().toISOString().split('T')[0],
          diagnosis: 'Initial Ear Tag Registration & Digital Health Passport Issued',
          vetName: 'Dr. Automated Registrar',
          treatmentGiven: 'Tagging & Health Card Generated',
        },
      ],
    };

    setAnimals([created, ...animals]);
    setSelectedAnimal(created);
    setShowAddModal(false);
    setNewTag('');
    setNewOwner('');
  };

  const handleAddVaccination = (animalId: string) => {
    setAnimals((prev) =>
      prev.map((a) => {
        if (a.id === animalId) {
          const updated = {
            ...a,
            vaccinations: [
              ...a.vaccinations,
              {
                disease: vacDisease,
                date: new Date().toISOString().split('T')[0],
                doseNumber: a.vaccinations.length + 1,
                nextDueDate: '2026-10-12',
                batchNumber: vacBatch,
              },
            ],
          };
          if (selectedAnimal?.id === animalId) setSelectedAnimal(updated);
          return updated;
        }
        return a;
      })
    );
  };

  const handleAddAIBreeding = (animalId: string) => {
    setAnimals((prev) =>
      prev.map((a) => {
        if (a.id === animalId) {
          const updated = {
            ...a,
            breedingRecords: [
              ...a.breedingRecords,
              {
                aiDate: new Date().toISOString().split('T')[0],
                semenStrawNo: strawNo,
                bullBreed: bullBreed,
                pregnancyStatus: 'Confirmed Positive',
                expectedCalvingDate: '2027-01-20',
              },
            ],
          };
          if (selectedAnimal?.id === animalId) setSelectedAnimal(updated);
          return updated;
        }
        return a;
      })
    );
  };

  const sampleYieldData = selectedAnimal
    ? [
        { month: 'Oct', yield: Number((selectedAnimal.milkYieldLitersDay - 2.2).toFixed(1)), target: 14.0 },
        { month: 'Nov', yield: Number((selectedAnimal.milkYieldLitersDay - 1.5).toFixed(1)), target: 14.0 },
        { month: 'Dec', yield: Number((selectedAnimal.milkYieldLitersDay - 0.8).toFixed(1)), target: 14.0 },
        { month: 'Jan', yield: Number((selectedAnimal.milkYieldLitersDay + 0.5).toFixed(1)), target: 14.0 },
        { month: 'Feb', yield: Number((selectedAnimal.milkYieldLitersDay + 1.2).toFixed(1)), target: 14.0 },
        { month: 'Mar', yield: Number((selectedAnimal.milkYieldLitersDay).toFixed(1)), target: 14.0 },
      ]
    : [];

  const aiInsights = [
    {
      id: 1,
      title: isHi ? '12 पशुओं को FMD टीकाकरण की आवश्यकता' : '12 animals due for FMD vaccination',
      desc: isHi ? 'लखनऊ ब्लॉक 2 में टीकाकरण बूस्टर अभियान की योजना बनाएं' : 'Scheduled booster campaign recommended in Lucknow Block 2.',
      action: isHi ? 'टीकाकरण अनुसूची देखें' : 'Schedule Vaccination',
      color: 'amber',
    },
    {
      id: 2,
      title: isHi ? 'दूध उत्पादकता में 8.2% की वृद्धि' : 'Milk productivity increased 8.2% this month',
      desc: isHi ? 'मुर्राह भैंसों में गुणवत्ता आहार से दूध उत्पादन में वृद्धि' : 'Better fodder and Murrah breed management yielding higher fat content.',
      action: isHi ? 'विश्लेषण देखें' : 'View Analytics',
      color: 'emerald',
    },
    {
      id: 3,
      title: isHi ? '3 पशुओं को फॉलो-अप जांच की आवश्यकता' : '3 animals require follow-up examination',
      desc: isHi ? 'मास्टाइटिस रोकथाम के लिए पशु चिकित्सक निरीक्षण आवश्यक' : 'Post-treatment health check requested by VAS officer.',
      action: isHi ? 'चिकित्सक नियुक्त करें' : 'Assign Vet Officer',
      color: 'blue',
    },
    {
      id: 4,
      title: isHi ? 'भैंस TAG-IN-889012 की उच्च उत्पादकता' : 'Buffalo TAG-IN-889012 shows above-average yield',
      desc: isHi ? 'औसत से 22% अधिक दूध उत्पादन। अनुवांशिक ब्रीडिंग हेतु उपयुक्त' : '22% higher yield than herd average. Suitable for elite AI breeding program.',
      action: isHi ? 'पासपोर्ट खोलें' : 'View Passport',
      color: 'teal',
    },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6 animate-fadeIn font-sans text-slate-900">
      {/* 1. Page Header with Timestamp & Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Milk className="w-6 h-6 text-[#14532D]" />
              <span>{isHi ? 'बड़े पशु प्रबंधन (गाय एवं भैंस)' : 'Large Animal Management'}</span>
            </h2>
            <span className="bg-emerald-50 text-[#14532D] border border-emerald-200 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
              INAPH Linked
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
            <span>{isHi ? 'पशुधन पंजीकरण, स्वास्थ्य, ब्रीडिंग एवं उत्पादकता ट्रैकिंग' : 'Livestock registration, health, breeding and productivity'}</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-slate-400">
              <Clock className="w-3 h-3 text-emerald-600" />
              {isHi ? 'अंतिम सिंक्रनाइज़ेशन: 12 अगस्त 2026 • 11:42 AM' : 'Last synchronized: 12 Aug 2026 • 11:42 AM'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Species Filter Segment */}
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex text-xs font-semibold">
            <button
              onClick={() => setFilterSpecies('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterSpecies === 'ALL' ? 'bg-[#14532D] text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHi ? 'सभी' : 'All'}
            </button>
            <button
              onClick={() => setFilterSpecies('Cattle')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterSpecies === 'Cattle' ? 'bg-[#14532D] text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHi ? 'गाय' : 'Cattle'}
            </button>
            <button
              onClick={() => setFilterSpecies('Buffalo')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filterSpecies === 'Buffalo' ? 'bg-[#14532D] text-white shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isHi ? 'भैंस' : 'Buffalo'}
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-all"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            <span>{isHi ? '+ नया पशु पंजीकृत करें' : '+ Register Animal'}</span>
          </button>
        </div>
      </div>

      {/* 2. Secondary Livestock KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Total Animals</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono">1,28,450</div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">100% INAPH Tagged</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Vaccination Coverage</span>
          <div className="text-xl font-extrabold text-slate-900 font-mono">94.2%</div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">FMD Phase IV</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Healthy Animals</span>
          <div className="text-xl font-extrabold text-[#16A34A] font-mono">1,21,100</div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">Fit for Dairy</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Under Treatment</span>
          <div className="text-xl font-extrabold text-amber-600 font-mono">1,480</div>
          <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded font-bold">1962 MVU Monitored</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-tight">Avg Milk Yield</span>
          <div className="text-xl font-extrabold text-[#14532D] font-mono">14.2 L/day</div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">↑ 8.2% vs prev mth</span>
        </div>
      </div>

      {/* 3. ✨ AI-Powered Insights Banner */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>{isHi ? 'एआई इंटेलिजेंस एवं ऑटोमेटेड सिफारिशें' : 'AI-POWERED INSIGHTS & RECOMMENDATIONS'}</span>
          </h3>
          <span className="text-[11px] font-mono text-slate-400">Pashu AI Engine v2.6</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {aiInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="bg-teal-50 text-teal-800 border border-teal-200 text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                    AI INTELLIGENCE
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <h4 className="font-bold text-slate-900 text-xs leading-snug">{insight.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{insight.desc}</p>
              </div>

              <button
                onClick={() => {
                  if (selectedAnimal) setActiveTab('vaccines');
                }}
                className="text-xs font-bold text-[#14532D] hover:text-[#0f3e21] flex items-center gap-1 pt-2 border-t border-slate-100 group"
              >
                <span>{insight.action}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Main Section: Animal Directory Table & Digital Passport Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Compact Enterprise Animal Directory List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex justify-between items-center text-xs font-bold font-mono">
            <span>{isHi ? `पंजीकृत पशुसूची (${filteredAnimals.length})` : `Registered Animals (${filteredAnimals.length})`}</span>
            <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">INAPH Verified</span>
          </div>

          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {filteredAnimals.map((animal) => {
              const isSelected = selectedAnimal?.id === animal.id;
              return (
                <div
                  key={animal.id}
                  onClick={() => setSelectedAnimal(animal)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50/70 border-[#14532D] shadow-2xs ring-1 ring-[#14532D]'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#14532D] font-bold flex items-center justify-center text-lg border border-emerald-200 shrink-0">
                        {animal.species === 'Buffalo' ? '🦬' : '🐄'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                          <span className="font-mono">{animal.tagNumber}</span>
                          <span className="text-[10px] font-semibold bg-emerald-100 text-[#14532D] px-2 py-0.2 rounded border border-emerald-200 font-mono">
                            {animal.breed}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 flex items-center gap-1.5 mt-0.5">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{animal.ownerName}</span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-[10px] text-slate-500">{animal.ownerFamilyId}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#14532D]' : 'text-slate-400'}`} />
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center text-[#16A34A] font-bold gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" /> Healthy
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[#14532D] font-bold font-mono">{animal.milkYieldLitersDay} L/day</span>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      FMD Vaccine Up-to-Date
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Digital Health Passport Detail Workspace */}
        {selectedAnimal ? (
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 space-y-5">
            {/* Passport Top Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-4 gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold font-mono text-slate-900">{selectedAnimal.tagNumber}</span>
                  <span className="bg-emerald-100 text-[#14532D] text-xs font-semibold px-2.5 py-0.5 rounded-md border border-emerald-300 font-mono">
                    Digital Health Passport
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {selectedAnimal.species} ({selectedAnimal.breed}) • {selectedAnimal.ageYears} Years • {selectedAnimal.district} District
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleAddVaccination(selectedAnimal.id)}
                  className="bg-emerald-100 hover:bg-emerald-200 text-[#14532D] border border-emerald-300 font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                >
                  <Syringe className="w-3.5 h-3.5 text-[#14532D]" />
                  <span>+ Log Vaccine</span>
                </button>
                <button
                  onClick={() => handleAddAIBreeding(selectedAnimal.id)}
                  className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                >
                  <Activity className="w-3.5 h-3.5 text-amber-800" />
                  <span>+ Log AI Straw</span>
                </button>
              </div>
            </div>

            {/* Passport Navigation Tabs */}
            <div className="flex border-b border-slate-200 overflow-x-auto text-xs font-medium text-slate-600 gap-1 scrollbar-none">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3.5 py-2 border-b-2 transition-all font-semibold whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-[#14532D] text-[#14532D] bg-emerald-50/50 rounded-t-lg'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-3.5 py-2 border-b-2 transition-all font-semibold whitespace-nowrap ${
                  activeTab === 'timeline'
                    ? 'border-[#14532D] text-[#14532D] bg-emerald-50/50 rounded-t-lg'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Health & Timeline
              </button>
              <button
                onClick={() => setActiveTab('vaccines')}
                className={`px-3.5 py-2 border-b-2 transition-all font-semibold whitespace-nowrap ${
                  activeTab === 'vaccines'
                    ? 'border-[#14532D] text-[#14532D] bg-emerald-50/50 rounded-t-lg'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Vaccination Log ({selectedAnimal.vaccinations.length})
              </button>
              <button
                onClick={() => setActiveTab('breeding')}
                className={`px-3.5 py-2 border-b-2 transition-all font-semibold whitespace-nowrap ${
                  activeTab === 'breeding'
                    ? 'border-[#14532D] text-[#14532D] bg-emerald-50/50 rounded-t-lg'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Breeding & AI ({selectedAnimal.breedingRecords.length})
              </button>
              <button
                onClick={() => setActiveTab('productivity')}
                className={`px-3.5 py-2 border-b-2 transition-all font-semibold whitespace-nowrap ${
                  activeTab === 'productivity'
                    ? 'border-[#14532D] text-[#14532D] bg-emerald-50/50 rounded-t-lg'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Milk Productivity
              </button>
              <button
                onClick={() => setActiveTab('documents')}
                className={`px-3.5 py-2 border-b-2 transition-all font-semibold whitespace-nowrap ${
                  activeTab === 'documents'
                    ? 'border-[#14532D] text-[#14532D] bg-emerald-50/50 rounded-t-lg'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                Documents & QR
              </button>
            </div>

            {/* TAB CONTENT: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4 text-xs">
                {/* Identity Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Owner Name</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedAnimal.ownerName}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Family ID Link</span>
                    <span className="font-bold text-[#14532D] font-mono text-xs">{selectedAnimal.ownerFamilyId}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">District / Block</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedAnimal.district} ({selectedAnimal.block})</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Daily Milk Yield</span>
                    <span className="font-bold text-[#14532D] font-mono text-xs">{selectedAnimal.milkYieldLitersDay} Liters / Day</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Fat & SNF %</span>
                    <span className="font-bold text-amber-800 font-mono text-xs">{selectedAnimal.fatPercentage}% Fat / {selectedAnimal.snfPercentage}% SNF</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Health Status</span>
                    <span className="font-bold text-[#16A34A] text-xs flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Fit & Active
                    </span>
                  </div>
                </div>

                {/* Health Overview Summary */}
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#14532D] text-xs">AHD Immunization Compliance</span>
                    <span className="bg-emerald-100 text-[#14532D] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-300">
                      100% Compliant
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    This animal has completed FMD (Foot & Mouth Disease) Phase IV and Brucellosis primary immunization. Next booster due on <strong className="font-mono text-slate-900">15 Oct 2026</strong>.
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Health & Timeline */}
            {activeTab === 'timeline' && (
              <div className="space-y-4 text-xs">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider font-mono text-[11px]">
                  Clinical History & Veterinary Audit Log
                </h4>

                <div className="relative pl-6 border-l-2 border-slate-200 space-y-4">
                  {selectedAnimal.healthHistory.map((h, i) => (
                    <div key={i} className="relative group">
                      <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#14532D] border-2 border-white ring-2 ring-emerald-100" />
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                        <div className="flex justify-between items-center text-slate-900 font-bold">
                          <span>{h.diagnosis}</span>
                          <span className="text-[10px] font-mono text-slate-400">{h.date}</span>
                        </div>
                        <div className="text-slate-600 font-medium">Treatment: {h.treatmentGiven}</div>
                        <div className="text-[11px] text-emerald-800 font-mono">Attending Officer: {h.vetName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Vaccination */}
            {activeTab === 'vaccines' && (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider font-mono text-[11px]">
                    Immunization & Vaccine Batch Logs
                  </h4>
                  <button
                    onClick={() => handleAddVaccination(selectedAnimal.id)}
                    className="text-xs text-[#14532D] font-bold underline hover:text-[#0f3e21]"
                  >
                    + Record New Dose
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedAnimal.vaccinations.map((v, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{v.disease}</span>
                        <span className="text-[#16A34A] font-mono text-[11px]">Dose #{v.doseNumber}</span>
                      </div>
                      <div className="text-slate-500 font-mono text-[11px]">Administered: {v.date}</div>
                      <div className="text-slate-500 font-mono text-[11px]">Batch: {v.batchNumber}</div>
                      <div className="text-amber-800 font-bold text-[11px] pt-1 border-t border-slate-200">
                        Next Due: {v.nextDueDate}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Breeding & AI */}
            {activeTab === 'breeding' && (
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider font-mono text-[11px]">
                    Artificial Insemination (AI) & Pedigree Records
                  </h4>
                  <button
                    onClick={() => handleAddAIBreeding(selectedAnimal.id)}
                    className="text-xs text-amber-900 font-bold underline"
                  >
                    + Log AI Insemination
                  </button>
                </div>

                {selectedAnimal.breedingRecords.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
                    No artificial insemination records logged yet. Click "+ Log AI Insemination" above.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedAnimal.breedingRecords.map((b, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>Semen Straw: {b.semenStrawNo}</span>
                          <span className="text-emerald-800 font-mono text-[11px]">{b.pregnancyStatus}</span>
                        </div>
                        <div className="text-slate-600">Bull Breed: {b.bullBreed}</div>
                        <div className="text-slate-500 font-mono text-[11px]">AI Date: {b.aiDate}</div>
                        <div className="text-amber-900 font-bold text-[11px]">Expected Calving: {b.expectedCalvingDate}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: Milk Productivity */}
            {activeTab === 'productivity' && (
              <div className="space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider font-mono text-[11px]">
                    Milk Production Chart & Target Analysis
                  </h4>

                  {/* Range Selectors */}
                  <div className="bg-slate-100 p-1 rounded-lg flex text-[10px] font-bold">
                    {(['7D', '30D', '6M', '1Y'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setTimeRange(r)}
                        className={`px-2.5 py-1 rounded transition-all ${
                          timeRange === r ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-48 w-full bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sampleYieldData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                      <YAxis stroke="#64748b" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '0.5rem' }} />
                      <Area type="monotone" dataKey="yield" stroke="#14532D" fill="#DCFCE7" strokeWidth={2.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Average Yield</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">{selectedAnimal.milkYieldLitersDay} L</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Best Month</span>
                    <span className="font-bold text-emerald-700 font-mono text-sm">Feb (16.2 L)</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px]">Target Target</span>
                    <span className="font-bold text-[#14532D] font-mono text-sm">15.0 L</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Documents & QR */}
            {activeTab === 'documents' && (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white p-2 border border-slate-300 rounded-xl shadow-2xs flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-[#14532D]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">INAPH Government Health Card</h4>
                      <p className="text-slate-500 text-xs mt-0.5">Scannable digital QR for vet doorstep visits & transport permissions</p>
                      <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded mt-1 inline-block">
                        UID: {selectedAnimal.tagNumber}
                      </span>
                    </div>
                  </div>

                  <button className="bg-[#14532D] hover:bg-[#0f3e21] text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-2xs">
                    <Award className="w-4 h-4 text-amber-300" />
                    <span>Download e-Passbook PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* 5. Livestock Health Overview & Vaccination Distribution */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider font-mono">
          {isHi ? 'पशुधन स्वास्थ्य स्थिति एवं टीकाकरण कवरेज' : 'STATEWIDE LIVESTOCK HEALTH & VACCINATION COVERAGE'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Health Status Distribution */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-800 text-xs">Health Category Split</span>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-[#16A34A]">Healthy / Fit</span>
                  <span className="font-mono">1,21,100 (94.2%)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#16A34A] h-full rounded-full" style={{ width: '94.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-amber-700">Under Treatment</span>
                  <span className="font-mono">1,480 (1.2%)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '1.2%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold mb-1">
                  <span className="text-emerald-800">Vaccination Pending</span>
                  <span className="font-mono">5,870 (4.6%)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '4.6%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Disease Vaccination Coverage Bars */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 md:col-span-2">
            <span className="font-bold text-slate-800 text-xs">Disease-wise Immunization Progress</span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">FMD Campaign</span>
                <div className="text-base font-extrabold text-slate-900 font-mono">92% Covered</div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-[#14532D] h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Hemorrhagic Septicemia (HS)</span>
                <div className="text-base font-extrabold text-slate-900 font-mono">87% Covered</div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '87%' }} />
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Brucellosis Control</span>
                <div className="text-base font-extrabold text-slate-900 font-mono">81% Covered</div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: '81%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-xs text-slate-900 animate-fadeIn">
            <h3 className="font-bold text-[#14532D] text-base flex items-center gap-2 border-b border-slate-200 pb-3">
              <Milk className="w-5 h-5 text-[#14532D]" />
              <span>{isHi ? 'नया पशु ईयर टैग पंजीकृत करें' : 'Register New Animal Ear Tag (INAPH)'}</span>
            </h3>

            <form onSubmit={handleRegisterAnimal} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Ear Tag Number (12 Digit UID)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TAG-IN-90088"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono rounded-xl p-2.5 focus:outline-none focus:border-[#14532D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Species</label>
                  <select
                    value={newSpecies}
                    onChange={(e) => setNewSpecies(e.target.value as 'Cattle' | 'Buffalo')}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-2.5"
                  >
                    <option value="Buffalo">Buffalo (भैंस)</option>
                    <option value="Cattle">Cattle (गाय)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Breed</label>
                  <input
                    type="text"
                    value={newBreed}
                    onChange={(e) => setNewBreed(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Owner Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newOwner}
                  onChange={(e) => setNewOwner(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold rounded-xl shadow-2xs">
                  Register Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
