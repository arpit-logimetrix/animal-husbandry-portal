import React, { useState } from 'react';
import { Language, UserRole } from '../types';
import { LayoutDashboard, MapPin, BarChart2, PieChart as PieIcon, Download, Layers, ShieldCheck, ArrowUpRight, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

interface ModuleDashboardProps {
  language: Language;
  role: UserRole;
  onRunPredictiveAi: () => void;
}

export const ModuleDashboard: React.FC<ModuleDashboardProps> = ({
  language,
  role,
  onRunPredictiveAi,
}) => {
  const isHi = language === 'hi';
  const [selectedLevel, setSelectedLevel] = useState<'State' | 'Division' | 'District' | 'Block'>('State');

  // District Comparison Data for Recharts
  const districtPerformanceData = [
    { district: 'Lucknow', TaggedAnimals: 28400, VaccinationPct: 96, BudgetLakhs: 1250 },
    { district: 'Varanasi', TaggedAnimals: 32100, VaccinationPct: 94, BudgetLakhs: 1420 },
    { district: 'Gorakhpur', TaggedAnimals: 19800, VaccinationPct: 92, BudgetLakhs: 890 },
    { district: 'Agra', TaggedAnimals: 16500, VaccinationPct: 89, BudgetLakhs: 780 },
    { district: 'Kanpur', TaggedAnimals: 22400, VaccinationPct: 95, BudgetLakhs: 1100 },
    { district: 'Prayagraj', TaggedAnimals: 18100, VaccinationPct: 91, BudgetLakhs: 820 },
  ];

  // Species Pie Chart Data in GovTech palette
  const speciesData = [
    { name: 'Buffaloes (भैंस)', value: 52, color: '#14532D' },
    { name: 'Cattle (गाय)', value: 38, color: '#059669' },
    { name: 'Goat & Sheep (बकरी/भेड़)', value: 7, color: '#F59E0B' },
    { name: 'Poultry & Swine', value: 3, color: '#2563EB' },
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Title / Command Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#172033] flex items-center gap-2 tracking-tight">
              <LayoutDashboard className="w-6 h-6 text-[#14532D]" />
              <span>{isHi ? 'एकीकृत पशुपालन कमांड एवं इंटेलिजेंस सेंटर' : 'Unified Animal Husbandry Command & Intelligence Center'}</span>
            </h2>
            <span className="bg-emerald-100 text-[#14532D] text-[10px] font-mono px-2 py-0.5 rounded font-bold border border-emerald-300">
              State Level
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? 'राज्य/मंडल/जिला/ब्लॉक स्तर रिपोर्टिंग, योजना-वार भौतिक व वित्तीय प्रगति एवं लाइव जीआईएस मैपिंग'
              : 'Real-time overview of livestock, beneficiaries, schemes, MVU GPS, and district field operations.'}
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          {/* Level Switcher */}
          <div className="bg-slate-100 p-1.5 rounded-lg border border-slate-200 flex font-medium space-x-1">
            {(['State', 'Division', 'District', 'Block'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  selectedLevel === lvl
                    ? 'bg-[#14532D] text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <button
            onClick={onRunPredictiveAi}
            className="bg-gradient-to-r from-[#059669] to-[#0d9488] hover:from-[#047857] hover:to-[#0f766e] text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm border border-emerald-500/20"
          >
            <BarChart2 className="w-4 h-4 text-amber-300" />
            <span>{isHi ? 'AI पूर्वानुमान रिपोर्ट' : 'Pashu AI Analytics'}</span>
          </button>
        </div>
      </div>

      {/* KPI Command Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">{isHi ? 'कुल पशुधन टैगिंग' : 'Total Livestock Tagged'}</span>
            <span className="bg-emerald-100 text-[#16A34A] text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">↑ 12.4%</span>
          </div>
          <div className="text-2xl font-bold text-[#172033] font-mono mt-2">1,28,450</div>
          <p className="text-[11px] text-slate-500 mt-1">INAPH UID Ear Tagged Animals</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">{isHi ? 'एफएमडी टीका कवरेज' : 'FMD Vaccine Coverage'}</span>
            <span className="bg-emerald-100 text-[#16A34A] text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">94.2%</span>
          </div>
          <div className="text-2xl font-bold text-[#172033] font-mono mt-2">1,21,000</div>
          <p className="text-[11px] text-slate-500 mt-1">Phase-6 Active Campaign</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">{isHi ? 'एमवीयू 1962 कॉल समाधान' : 'MVU 1962 Call Resolution'}</span>
            <span className="bg-amber-100 text-[#F59E0B] text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">98.8%</span>
          </div>
          <div className="text-2xl font-bold text-[#172033] font-mono mt-2">14,820 Calls</div>
          <p className="text-[11px] text-slate-500 mt-1">Avg Response: 28 mins</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-500">{isHi ? 'डीबीटी योजना वितरण' : 'DBT Subsidy Disbursed'}</span>
            <span className="bg-emerald-100 text-[#16A34A] text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">Verified</span>
          </div>
          <div className="text-2xl font-bold text-[#172033] font-mono mt-2">₹133.5 Cr</div>
          <p className="text-[11px] text-slate-500 mt-1">Family ID Linked Farmers</p>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart: District Wise Tagged Animals & Budget */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
            <span>{isHi ? 'जिला-वार पशुपंजीयन एवं बजट आवंटन (लक्षित बनाम हासिल)' : 'District Livestock Registration vs Budget Utilization'}</span>
            <span className="text-[#166534] font-mono">Real-time Govt Sync</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="district" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#172033', borderRadius: '0.5rem' }} />
                <Bar dataKey="TaggedAnimals" fill="#14532D" name={isHi ? 'पंजीकृत पशु' : 'Tagged Livestock'} radius={[4, 4, 0, 0]} />
                <Bar dataKey="BudgetLakhs" fill="#F59E0B" name={isHi ? 'बजट (लाख ₹)' : 'Budget (₹ Lakhs)'} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Livestock Composition */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
            {isHi ? 'राज्य पशुधन प्रजाति अनुपात' : 'Statewide Livestock Composition'}
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={speciesData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {speciesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#172033', borderRadius: '0.5rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 text-xs">
            {speciesData.map((s, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                  {s.name}
                </span>
                <span className="font-mono font-bold text-slate-900">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GIS District Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 text-xs font-bold">
          <span className="text-slate-800 uppercase tracking-wider font-mono">
            {isHi ? 'जीआईएस आधारित जिला-वार टीकाकरण एवं एफएमडी कवरेज रिपोर्ट' : 'GIS District-Wise Vaccination & FMD Coverage Matrix'}
          </span>
          <button className="flex items-center gap-1.5 text-[#166534] hover:text-[#14532D] font-mono transition-all">
            <Download className="w-3.5 h-3.5" />
            <span>Export Official PDF Report</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3">{isHi ? 'जिला' : 'District Name'}</th>
                <th className="p-3 font-mono">{isHi ? 'पंजीकृत टैग' : 'Tagged Animals'}</th>
                <th className="p-3 font-mono">{isHi ? 'एफएमडी कवरेज %' : 'FMD Vaccine Coverage'}</th>
                <th className="p-3 font-mono">{isHi ? 'एमवीयू 1962 कॉल दर' : 'MVU Response Rate'}</th>
                <th className="p-3">{isHi ? 'स्थिति' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {districtPerformanceData.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-all">
                  <td className="p-3 font-bold text-slate-900">{d.district}</td>
                  <td className="p-3 font-mono text-slate-800">{d.TaggedAnimals.toLocaleString()}</td>
                  <td className="p-3 font-bold font-mono text-[#16A34A]">{d.VaccinationPct}%</td>
                  <td className="p-3 font-mono text-slate-800">98.2%</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-[#166534] font-mono font-bold border border-emerald-300 px-2.5 py-1 rounded text-[10px] flex items-center gap-1 w-fit">
                      🟢 Approved / Compliant
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
