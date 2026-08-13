import React, { useState } from 'react';
import { Language, UserRole, ModuleTab } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HeroBanner } from './components/HeroBanner';
import { OverviewWorkspace } from './components/OverviewWorkspace';
import { FloatingAiAssistant } from './components/FloatingAiAssistant';
import { ModuleLargeAnimal } from './components/ModuleLargeAnimal';
import { ModuleSmallAnimal } from './components/ModuleSmallAnimal';
import { ModulePoultry } from './components/ModulePoultry';
import { ModuleTraining } from './components/ModuleTraining';
import { ModuleBudget } from './components/ModuleBudget';
import { ModuleBeneficiary } from './components/ModuleBeneficiary';
import { ModuleDirectory } from './components/ModuleDirectory';
import { ModuleAssets } from './components/ModuleAssets';
import { ModuleMVU } from './components/ModuleMVU';
import { ModuleDashboard } from './components/ModuleDashboard';
import { ModuleMobileApp } from './components/ModuleMobileApp';

import {
  INITIAL_LARGE_ANIMALS,
  INITIAL_SMALL_ANIMALS,
  INITIAL_POULTRY_FARMS,
  INITIAL_TRAINING_COURSES,
  INITIAL_CERTIFICATES,
  INITIAL_BUDGETS,
  INITIAL_FUND_REQUESTS,
  INITIAL_BENEFICIARIES,
  INITIAL_OFFICERS,
  INITIAL_ASSETS,
  INITIAL_MVUS
} from './data/mockData';

import {
  Sparkles,
  Shield,
  PhoneCall,
  CheckCircle2,
  X,
  Send,
  Milk,
  Feather,
  GraduationCap,
  IndianRupee,
  Users,
  Building,
  Package,
  Ambulance,
  LayoutDashboard,
  Smartphone,
  Bot,
  Stethoscope,
  ArrowRight,
  ShieldAlert,
  Building2
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [role, setRole] = useState<UserRole>('CITIZEN');
  const [activeTab, setActiveTab] = useState<ModuleTab>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Statewide (All)');

  // Department State
  const [largeAnimals, setLargeAnimals] = useState(INITIAL_LARGE_ANIMALS);
  const [smallAnimals, setSmallAnimals] = useState(INITIAL_SMALL_ANIMALS);
  const [poultryFarms, setPoultryFarms] = useState(INITIAL_POULTRY_FARMS);
  const [courses, setCourses] = useState(INITIAL_TRAINING_COURSES);
  const [certificates, setCertificates] = useState(INITIAL_CERTIFICATES);
  const [budgets, setBudgets] = useState(INITIAL_BUDGETS);
  const [fundRequests, setFundRequests] = useState(INITIAL_FUND_REQUESTS);
  const [beneficiaries, setBeneficiaries] = useState(INITIAL_BENEFICIARIES);
  const [officers, setOfficers] = useState(INITIAL_OFFICERS);
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [mvus, setMvus] = useState(INITIAL_MVUS);

  // Modal States
  const [showAiChat, setShowAiChat] = useState<boolean>(false);
  const [showDiseaseAi, setShowDiseaseAi] = useState<boolean>(false);
  const [showFamilyIdModal, setShowFamilyIdModal] = useState<boolean>(false);
  const [floatingAiOpen, setFloatingAiOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // PashuMitra Chat State
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    {
      role: 'model',
      text: language === 'hi'
        ? 'नमस्कार! मैं पशु सहायक AI हूँ। मैं आपकी पशु स्वास्थ्य, FMD टीकाकरण, 1962 एम्बुलेंस तथा सरकारी योजनाओं में कैसे सहायता कर सकता हूँ?'
        : 'Welcome! I am Pashu Sahayak AI Assistant. How can I help you with livestock healthcare, FMD vaccination schedules, 1962 MVU emergency calls, or scheme subsidies today?'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Disease AI State
  const [animalType, setAnimalType] = useState('Cattle / Cow');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [diseaseAnalysis, setDiseaseAnalysis] = useState<string | null>(null);
  const [diseaseLoading, setDiseaseLoading] = useState(false);

  // Family ID Verification State
  const [familyIdInput, setFamilyIdInput] = useState('FID-889972');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [familyIdVerified, setFamilyIdVerified] = useState(false);

  const isHi = language === 'hi';

  // Handle PashuMitra AI Send
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userText = chatInput;
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setChatLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          language,
          history: chatMessages
        })
      });

      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { role: 'model', text: data.text || data.fallbackText || 'Thank you for contacting Pashu Sahayak AI. Dial 1962 for urgent veterinary helpline.' }
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Pashu Sahayak service offline momentarily. Please call Emergency Veterinary Helpline 1962.' }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Handle Disease AI Analysis
  const handleAnalyzeDisease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomsInput && !imagePreview) return;

    setDiseaseLoading(true);
    setDiseaseAnalysis(null);

    try {
      const res = await fetch('/api/ai/disease-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          animalType,
          symptoms: symptomsInput,
          imageBase64: imagePreview,
          language
        })
      });

      const data = await res.json();
      setDiseaseAnalysis(data.analysis || 'Analysis complete. Please consult District Veterinary Officer.');
    } catch (err) {
      setDiseaseAnalysis('Disease scan unavailable. Please call 1962 for Mobile Veterinary Unit inspection.');
    } finally {
      setDiseaseLoading(false);
    }
  };

  // Handle Image Upload Simulation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Overview Module Cards
  const overviewModules = [
    { id: 'large_animal' as ModuleTab, titleEn: 'Large Animal Management', titleHi: 'बड़े पशु प्रबंधन (गाय/भैंस)', descEn: 'INAPH Ear Tagging, Milk Yield, Breeding AI & FMD Vaccine Logs', icon: <Milk className="w-5 h-5 text-[#14532D]" />, count: '1,28,450 Tagged' },
    { id: 'small_animal' as ModuleTab, titleEn: 'Small Animal & Sheep/Goat', titleHi: 'छोटे पशु (बकरी/भेड़)', descEn: 'Flock Tagging, PPR Vaccine, Deworming & Breed Allotment', icon: <Feather className="w-5 h-5 text-emerald-700" />, count: '45,200 Flocks' },
    { id: 'poultry' as ModuleTab, titleEn: 'Poultry & Biosecurity', titleHi: 'कुक्कुट (मुर्गी पालन)', descEn: 'Backyard Chicks, Layer/Broiler Audits & Avian Flu Surveillance', icon: <Feather className="w-5 h-5 text-amber-600" />, count: '1,850 Farms' },
    { id: 'mvu' as ModuleTab, titleEn: 'MVU 1962 Emergency GPS', titleHi: 'एमवीयू 1962 ट्रैकिंग', descEn: 'Emergency Ambulance Call Booking, Live GPS Map & Vet Mobile App', icon: <Ambulance className="w-5 h-5 text-[#F59E0B]" />, count: '142 Ambulances' },
    { id: 'budget' as ModuleTab, titleEn: 'Budget & Scheme MIS', titleHi: 'बजट एवं वित्त', descEn: 'District Utilization, UC Submissions & Fund Disbursal Approvals', icon: <IndianRupee className="w-5 h-5 text-[#14532D]" />, count: '₹133.5 Cr Budget' },
    { id: 'beneficiary' as ModuleTab, titleEn: 'Beneficiary & Family ID', titleHi: 'लाभार्थी एवं फैमिली आईडी', descEn: 'Direct Benefit Transfer (DBT), Aadhaar e-KYC & Subsidy Status', icon: <Users className="w-5 h-5 text-emerald-700" />, count: '98.4% Linked' },
    { id: 'assets' as ModuleTab, titleEn: 'Asset & Vaccine Stock', titleHi: 'परिसंपत्ति एवं स्टॉक', descEn: 'Hospital Buildings, Equipment AMC, Vaccine Stock Alerts & Geotag Audits', icon: <Package className="w-5 h-5 text-slate-700" />, count: '3,420 Assets' },
    { id: 'directory' as ModuleTab, titleEn: 'Officer Directory & Cadre', titleHi: 'विभागीय निर्देशिका', descEn: 'Sanctioned Posts, Active Vets, Postings & Instant Broadcast Circulars', icon: <Building className="w-5 h-5 text-[#14532D]" />, count: '840 Officers' },
    { id: 'training' as ModuleTab, titleEn: 'Training & E-Certificates', titleHi: 'प्रशिक्षण एवं ई-प्रमाणपत्र', descEn: 'Farmer Dairy/Goatry Courses, QR Verifiable Certificates & Video Manuals', icon: <GraduationCap className="w-5 h-5 text-amber-600" />, count: '12,400 Certified' },
    { id: 'dashboard' as ModuleTab, titleEn: 'GIS Command Center', titleHi: 'जीआईएस कमान सेंटर', descEn: 'State/District Analytics, FMD Heatmaps & AI Outbreak Predictions', icon: <LayoutDashboard className="w-5 h-5 text-[#14532D]" />, count: 'Live Analytics' },
    { id: 'mobile_app' as ModuleTab, titleEn: 'PashuSeva Field App View', titleHi: 'पशुसेवा ऐप सिम्युलेटर', descEn: 'Farmer / Field Vet App View, Tag Scanner & Offline Sync Interface', icon: <Smartphone className="w-5 h-5 text-teal-700" />, count: 'Mobile Mode' },
  ];

  return (
    <div className="h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col overflow-hidden">
      {/* Government Enterprise Top Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        role={role}
        setRole={setRole}
        onOpenAiChat={() => setFloatingAiOpen(true)}
        onOpenDiseaseAi={() => setShowDiseaseAi(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        onNavigateTab={setActiveTab}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
      />

      {/* Main Body: Sidebar + Dynamic Module Workspace */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Deep Forest Green Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          language={language}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Workspace Content */}
        <div className="flex-1 overflow-y-auto min-h-0 pb-12">
          {/* Ticker & Command KPI Banner (Visible only in Overview) */}
          {activeTab === 'overview' && (
            <HeroBanner
              language={language}
              onOpenFamilyIdModal={() => setShowFamilyIdModal(true)}
              onOpenAiChat={() => setShowAiChat(true)}
              onOpenDiseaseAi={() => setShowDiseaseAi(true)}
              onOpenMVU={() => setActiveTab('mvu')}
            />
          )}

          <main className="mt-2">
            {activeTab === 'overview' && (
              <OverviewWorkspace
                language={language}
                onNavigateTab={setActiveTab}
                onOpenAiChat={() => setShowAiChat(true)}
                onOpenDiseaseAi={() => setShowDiseaseAi(true)}
                onOpenFamilyIdModal={() => setShowFamilyIdModal(true)}
              />
            )}

            {activeTab === 'large_animal' && (
              <ModuleLargeAnimal
                animals={largeAnimals}
                setAnimals={setLargeAnimals}
                role={role}
                language={language}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'small_animal' && (
              <ModuleSmallAnimal
                smallAnimals={smallAnimals}
                setSmallAnimals={setSmallAnimals}
                role={role}
                language={language}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'poultry' && (
              <ModulePoultry
                poultryFarms={poultryFarms}
                setPoultryFarms={setPoultryFarms}
                role={role}
                language={language}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'training' && (
              <ModuleTraining
                courses={courses}
                setCourses={setCourses}
                certificates={certificates}
                setCertificates={setCertificates}
                role={role}
                language={language}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'budget' && (
              <ModuleBudget
                budgets={budgets}
                fundRequests={fundRequests}
                setFundRequests={setFundRequests}
                role={role}
                language={language}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'beneficiary' && (
              <ModuleBeneficiary
                beneficiaries={beneficiaries}
                setBeneficiaries={setBeneficiaries}
                role={role}
                language={language}
                searchQuery={searchQuery}
                onOpenFamilyIdModal={() => setShowFamilyIdModal(true)}
              />
            )}

            {activeTab === 'directory' && (
              <ModuleDirectory
                officers={officers}
                setOfficers={setOfficers}
                role={role}
                language={language}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'assets' && (
              <ModuleAssets
                assets={assets}
                setAssets={setAssets}
                role={role}
                language={language}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'mvu' && (
              <ModuleMVU
                mvus={mvus}
                setMvus={setMvus}
                role={role}
                language={language}
                searchQuery={searchQuery}
              />
            )}

            {activeTab === 'dashboard' && (
              <ModuleDashboard
                role={role}
                language={language}
                onRunPredictiveAi={() => setShowAiChat(true)}
              />
            )}

            {activeTab === 'mobile_app' && (
              <ModuleMobileApp
                language={language}
              />
            )}

            {activeTab === 'ai_assistant' && (
              <div className="max-w-4xl mx-auto p-4 space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-6 h-6 text-[#14532D]" />
                      <h3 className="font-bold text-slate-900 text-base">Pashu Sahayak AI Advisory Workspace</h3>
                    </div>
                    <span className="bg-emerald-100 text-[#14532D] font-mono text-xs font-semibold px-2.5 py-1 rounded">
                      Gemini Powered
                    </span>
                  </div>

                  <div className="h-80 overflow-y-auto space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                    {chatMessages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3.5 rounded-xl max-w-md text-xs ${m.role === 'user' ? 'bg-[#14532D] text-white font-medium' : 'bg-white text-slate-800 border border-slate-200 shadow-sm'}`}>
                          {m.text}
                        </div>
                      </div>
                    ))}
                    {chatLoading && <div className="text-[#14532D] font-mono text-xs animate-pulse">Pashu AI Analyzing...</div>}
                  </div>

                  <form onSubmit={handleSendChat} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder={isHi ? 'पशु रोग लक्षण, टीकाकरण शेड्यूल या 1962 सेवा पूछें...' : 'Ask about livestock diseases, FMD schedule, 1962 ambulance, or subsidies...'}
                      className="flex-1 bg-white border border-slate-200 text-slate-800 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#14532D]"
                    />
                    <button type="submit" disabled={chatLoading} className="bg-[#14532D] hover:bg-[#0f3e21] text-white px-5 py-2.5 rounded-lg text-xs font-semibold shadow-sm">
                      Send Prompt
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'ai_disease_detector' && (
              <div className="max-w-4xl mx-auto p-4 space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-6 h-6 text-[#14532D]" />
                      <h3 className="font-bold text-slate-900 text-base">AI Animal Disease Screening & Symptom Audit</h3>
                    </div>
                  </div>

                  <form onSubmit={handleAnalyzeDisease} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 text-xs mb-1.5">Select Livestock Category</label>
                        <select
                          value={animalType}
                          onChange={(e) => setAnimalType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-lg p-2.5"
                        >
                          <option>Cattle / Cow (गाय)</option>
                          <option>Buffalo (भैंस)</option>
                          <option>Goat / Sheep (बकरी/भेड़)</option>
                          <option>Poultry Flock (मुर्गी)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 text-xs mb-1.5">Attach Photo of Lesions/Skin</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full bg-slate-50 border border-slate-200 text-slate-600 text-xs rounded-lg p-2 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-[#14532D] file:text-white file:text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 text-xs mb-1.5">Observed Symptoms & Body Temp</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. High fever (105F), skin nodules, mouth blisters, drop in milk yield..."
                        value={symptomsInput}
                        onChange={(e) => setSymptomsInput(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-3 text-xs focus:outline-none focus:border-[#14532D]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={diseaseLoading}
                      className="bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold text-xs px-6 py-2.5 rounded-lg shadow-sm flex items-center gap-2"
                    >
                      <Stethoscope className="w-4 h-4" />
                      <span>{diseaseLoading ? 'Analyzing via Gemini AI...' : 'Run AI Disease Diagnostic Scan'}</span>
                    </button>
                  </form>

                  {diseaseAnalysis && (
                    <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-200 space-y-3">
                      <h4 className="font-bold text-[#14532D] text-sm flex items-center gap-2 font-mono">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                        AI Diagnostic Screening Report
                      </h4>
                      <div className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {diseaseAnalysis}
                      </div>
                      <div className="bg-amber-100 border border-amber-300 p-3 rounded-lg text-xs text-amber-900 flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-[#F59E0B] shrink-0" />
                        <span>AI screening is guidance. Mandatory veterinary verification by Veterinary Assistant Surgeon required. Dial 1962 for doorstep MVU.</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Global PashuMitra Chat Modal */}
      {showAiChat && activeTab !== 'ai_assistant' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-5 shadow-xl border border-slate-200 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-[#14532D]" />
                <h3 className="font-bold text-slate-900 text-sm">Pashu Sahayak 24x7 AI Assistant</h3>
              </div>
              <button onClick={() => setShowAiChat(false)} className="text-slate-400 hover:text-slate-700 p-1 font-bold">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="h-72 overflow-y-auto space-y-2.5 p-3 bg-slate-50 rounded-lg border border-slate-200">
              {chatMessages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-xl max-w-xs ${m.role === 'user' ? 'bg-[#14532D] text-white font-medium' : 'bg-white text-slate-800 border border-slate-200 shadow-sm'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {chatLoading && <div className="text-[#14532D] font-mono text-[11px] animate-pulse">Thinking...</div>}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Pashu Sahayak..."
                className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#14532D]"
              />
              <button type="submit" disabled={chatLoading} className="bg-[#14532D] hover:bg-[#0f3e21] text-white px-4 py-2 rounded-lg font-semibold">
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Global Disease AI Modal */}
      {showDiseaseAi && activeTab !== 'ai_disease_detector' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-xl border border-slate-200 space-y-4 text-xs text-slate-900">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-[#14532D]" />
                <h3 className="font-bold text-slate-900 text-sm">Quick Disease Scan AI</h3>
              </div>
              <button onClick={() => setShowDiseaseAi(false)} className="text-slate-400 hover:text-slate-700 p-1 font-bold">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAnalyzeDisease} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Symptoms Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Fever, lesions on udder or mouth..."
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-2.5 focus:outline-none focus:border-[#14532D]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button type="button" onClick={() => setShowDiseaseAi(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600">
                  Cancel
                </button>
                <button type="submit" disabled={diseaseLoading} className="px-4 py-2 bg-[#14532D] text-white font-semibold rounded-lg shadow-sm">
                  {diseaseLoading ? 'Analyzing...' : 'Run Analysis'}
                </button>
              </div>
            </form>

            {diseaseAnalysis && (
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-xs text-slate-800 max-h-48 overflow-y-auto">
                {diseaseAnalysis}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Family ID e-KYC Verification Modal */}
      {showFamilyIdModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 text-xs text-slate-900">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <span>🆔 Family ID Verification & Aadhaar e-KYC</span>
              </h3>
              <button onClick={() => setShowFamilyIdModal(false)} className="text-slate-400 hover:text-slate-700 p-1 font-bold">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Enter Family ID (परिवार पहचान पत्र)</label>
                <input
                  type="text"
                  value={familyIdInput}
                  onChange={(e) => setFamilyIdInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono rounded-lg p-2.5 focus:outline-none focus:border-[#14532D]"
                />
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="w-full bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold py-2.5 rounded-lg shadow-sm"
                >
                  Fetch Family Details & Send Aadhaar OTP
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-[#14532D] font-mono text-[11px]">
                    ✓ Family Details Fetched: <strong>Ramesh Kumar (4 Members)</strong>. OTP sent to registered mobile ********88.
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Enter 6-Digit Aadhaar OTP</label>
                    <input
                      type="text"
                      placeholder="123456"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono rounded-lg p-2.5 focus:outline-none focus:border-[#14532D]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setFamilyIdVerified(true)}
                    className="w-full bg-[#16A34A] hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow-sm"
                  >
                    Verify e-KYC & Enable 50% DBT Subsidy
                  </button>
                </div>
              )}

              {familyIdVerified && (
                <div className="bg-emerald-100 border border-emerald-300 p-3.5 rounded-lg text-[#14532D] font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
                  <span>e-KYC VERIFIED! Family ID Linked to DBT Portal.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating 24x7 Pashu Sahayak AI Widget */}
      <FloatingAiAssistant
        language={language}
        isOpen={floatingAiOpen}
        onToggle={() => setFloatingAiOpen(!floatingAiOpen)}
        onOpenMVU={() => setActiveTab('mvu')}
        onOpenDiseaseAi={() => setShowDiseaseAi(true)}
      />
    </div>
  );
}
