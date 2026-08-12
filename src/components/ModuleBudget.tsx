import React, { useState } from 'react';
import { SchemeBudget, FundRequest, Language, UserRole } from '../types';
import { IndianRupee, Plus, FileCheck, CheckCircle2, AlertCircle, Clock, BarChart3, TrendingUp, Building2, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface ModuleBudgetProps {
  budgets: SchemeBudget[];
  fundRequests: FundRequest[];
  setFundRequests: React.Dispatch<React.SetStateAction<FundRequest[]>>;
  language: Language;
  role: UserRole;
  searchQuery: string;
}

export const ModuleBudget: React.FC<ModuleBudgetProps> = ({
  budgets = [],
  fundRequests = [],
  setFundRequests,
  language,
  role,
  searchQuery = '',
}) => {
  const isHi = language === 'hi';
  const [activeSubTab, setActiveSubTab] = useState<'schemes' | 'requests' | 'uc'>('schemes');
  const [showRequestModal, setShowRequestModal] = useState(false);

  // New Request Form
  const [district, setDistrict] = useState('Lucknow');
  const [schemeCode, setSchemeCode] = useState('MVU-1962');
  const [requestedLakhs, setRequestedLakhs] = useState(20.0);
  const [purpose, setPurpose] = useState('');

  const filteredBudgets = budgets.filter((b) => {
    return (
      b.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.schemeCode.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCreateFundRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose) return;

    const newReq: FundRequest = {
      id: `fr-${Date.now()}`,
      district,
      schemeCode,
      requestedLakhs: Number(requestedLakhs),
      purpose,
      requestedBy: role === 'DVO' ? `DVO (${district})` : 'Veterinary Surgeon',
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending Directorate',
    };

    setFundRequests([newReq, ...fundRequests]);
    setShowRequestModal(false);
    setPurpose('');
  };

  const handleApproveRequest = (reqId: string) => {
    setFundRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'Approved' } : r))
    );
  };

  const chartData = budgets.map((b) => ({
    name: b.schemeCode,
    AllocationCr: b.totalAllocatedCr,
    ExpenditureCr: b.expenditureCr,
    PendingUCCr: b.pendingUcCr,
  }));

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <IndianRupee className="w-6 h-6 text-[#14532D]" />
            <span>{isHi ? 'बजट आवंटन एवं वित्तीय स्थिति (2026-27)' : 'Budget & Financial MIS Dashboard (FY 2026-27)'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? 'योजना-वार एवं जिला-वार बजट वितरण, उपयोगिता प्रमाण पत्र (UC) एवं पारदर्शी ऑनलाइन फंड रिक्वेस्ट'
              : 'Scheme & District Financial Allocation, Expenditure Tracking, UC Submissions & Direct Disbursals'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium flex space-x-1">
            <button
              onClick={() => setActiveSubTab('schemes')}
              className={`px-3 py-1.5 rounded-md transition-all ${activeSubTab === 'schemes' ? 'bg-[#14532D] text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isHi ? 'योजना बजट' : 'Scheme Allocations'}
            </button>
            <button
              onClick={() => setActiveSubTab('requests')}
              className={`px-3 py-1.5 rounded-md transition-all ${activeSubTab === 'requests' ? 'bg-[#14532D] text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isHi ? 'फंड रिक्वेस्ट्स' : 'District Requests'}
            </button>
          </div>

          <button
            onClick={() => setShowRequestModal(true)}
            className="bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{isHi ? 'फंड रिक्वेस्ट सबमिट करें' : 'Submit Fund Request'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase font-mono">Total Budget Sanctioned</div>
          <div className="text-2xl font-bold text-[#14532D] font-mono">₹133.50 Cr</div>
          <div className="text-[11px] text-slate-500 pt-1">State & Central Share FY26</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase font-mono">Total Disbursed / Spent</div>
          <div className="text-2xl font-bold text-[#16A34A] font-mono">₹88.20 Cr</div>
          <div className="text-[11px] text-slate-500 pt-1">66.1% Overall Financial Progress</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase font-mono">Pending UC Submissions</div>
          <div className="text-2xl font-bold text-[#F59E0B] font-mono">₹12.80 Cr</div>
          <div className="text-[11px] text-slate-500 pt-1">District DVO Action Required</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase font-mono">DBT Subsidies Transferred</div>
          <div className="text-2xl font-bold text-slate-900 font-mono">₹38.40 Cr</div>
          <div className="text-[11px] text-slate-500 pt-1">Aadhaar Linked Direct Accounts</div>
        </div>
      </div>

      {/* Recharts Bar Graph */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="text-xs font-bold text-slate-800 uppercase font-mono">
          Scheme Budget Allocation vs Financial Expenditure (Cr)
        </div>
        <div className="h-64 w-full bg-slate-50 p-3 rounded-lg border border-slate-200">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', color: '#172033', borderRadius: '0.5rem' }} />
              <Legend />
              <Bar dataKey="AllocationCr" fill="#14532D" name="Allocated (Cr)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ExpenditureCr" fill="#16A34A" name="Spent (Cr)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="PendingUCCr" fill="#F59E0B" name="Pending UC (Cr)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 font-mono">Scheme Code</th>
                <th className="p-3">Scheme Title</th>
                <th className="p-3 font-mono">Allocated (Cr)</th>
                <th className="p-3 font-mono">Expenditure (Cr)</th>
                <th className="p-3 font-mono">Pending UC (Cr)</th>
                <th className="p-3">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {filteredBudgets.map((b) => {
                const percent = Math.round((b.expenditureCr / b.totalAllocatedCr) * 100);
                return (
                  <tr key={b.id} className="hover:bg-slate-50 transition-all">
                    <td className="p-3 font-bold font-mono text-slate-900">{b.schemeCode}</td>
                    <td className="p-3 text-slate-900 font-bold">{b.schemeName}</td>
                    <td className="p-3 font-mono text-slate-900 font-bold">₹{b.totalAllocatedCr.toFixed(2)} Cr</td>
                    <td className="p-3 font-mono text-[#16A34A] font-bold">₹{b.expenditureCr.toFixed(2)} Cr</td>
                    <td className="p-3 font-mono text-[#F59E0B] font-bold">₹{b.pendingUcCr.toFixed(2)} Cr</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-[#14532D] h-full rounded-full" style={{ width: `${percent}%` }}></div>
                        </div>
                        <span className="font-mono text-[10px] font-bold">{percent}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fund Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 text-xs text-slate-900">
            <h3 className="font-bold text-[#14532D] text-base border-b border-slate-200 pb-3">
              Submit District Fund Allocation Request
            </h3>

            <form onSubmit={handleCreateFundRequest} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Scheme Code</label>
                <select
                  value={schemeCode}
                  onChange={(e) => setSchemeCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                >
                  <option value="MVU-1962">MVU-1962 Mobile Veterinary Units</option>
                  <option value="NLM-GOAT">NLM-GOAT National Livestock Mission</option>
                  <option value="NADCP-FMD">NADCP-FMD Vaccination Campaign</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Requested Amount (in Lakhs ₹)</label>
                <input
                  type="number"
                  step="0.5"
                  value={requestedLakhs}
                  onChange={(e) => setRequestedLakhs(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Justification / Purpose</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Fuel replenishment & medicines for 1962 ambulances for Q1"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowRequestModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#14532D] text-white font-semibold rounded-lg shadow-sm">
                  Send to Directorate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
