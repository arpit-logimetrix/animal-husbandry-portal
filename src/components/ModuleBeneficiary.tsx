import React, { useState } from 'react';
import { Beneficiary, Language, UserRole } from '../types';
import { Users, Plus, CheckCircle2, ShieldCheck, Search, Award, ArrowUpRight } from 'lucide-react';

interface ModuleBeneficiaryProps {
  beneficiaries: Beneficiary[];
  setBeneficiaries: React.Dispatch<React.SetStateAction<Beneficiary[]>>;
  language: Language;
  role: UserRole;
  searchQuery: string;
  onOpenFamilyIdModal: () => void;
}

export const ModuleBeneficiary: React.FC<ModuleBeneficiaryProps> = ({
  beneficiaries = [],
  setBeneficiaries,
  language,
  role,
  searchQuery = '',
  onOpenFamilyIdModal,
}) => {
  const isHi = language === 'hi';
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [familyId, setFamilyId] = useState('FID-908123');
  const [category, setCategory] = useState<'General' | 'SC' | 'ST' | 'OBC' | 'Women Farmer'>('SC');
  const [scheme, setScheme] = useState('50% Subsidy Mini Dairy Unit (4 Cows)');
  const [subsidy, setSubsidy] = useState(120000);
  const [district, setDistrict] = useState('Lucknow');

  const filtered = beneficiaries.filter((b) => {
    return (
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.familyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleRegisterBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !familyId) return;

    const newBen: Beneficiary = {
      id: `ben-${Date.now()}`,
      fullName: name,
      familyId,
      aadhaarMasked: 'XXXX-XXXX-9912',
      category,
      gender: category === 'Women Farmer' ? 'Female' : 'Male',
      district,
      block: 'Central',
      village: 'Gram Bilaspur',
      mobile: '+91 98000 00000',
      landHoldingAcres: 2.5,
      verifiedFamilyId: true,
      verifiedAadhaarOtp: true,
      schemesEnrolled: [
        {
          schemeName: scheme,
          sanctionDate: new Date().toISOString().split('T')[0],
          subsidyAmount: Number(subsidy),
          dbtStatus: 'Disbursed',
          bankAccountMasked: 'SB-****-8812',
        },
      ],
    };

    setBeneficiaries([newBen, ...beneficiaries]);
    setShowModal(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <Users className="w-6 h-6 text-[#14532D]" />
            <span>{isHi ? 'लाभार्थी एवं फैमिली आईडी (DBT) पोर्टल' : 'Beneficiary & Family ID DBT Portal'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? 'परिवार पहचान पत्र सत्यापन, आधार e-KYC, एससी/एसटी/महिला किसान सब्सिडी एवं सीधे बैंक खाते में भुगतान (DBT)'
              : 'Family ID Linkage, Aadhaar e-KYC Verification, Category Subsidies & Direct Bank Transfers'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenFamilyIdModal}
            className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
            <span>{isHi ? 'फैमिली आईडी e-KYC जांचें' : 'Verify Family ID e-KYC'}</span>
          </button>

          <button
            onClick={() => setShowModal(true)}
            className="bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{isHi ? 'नया लाभार्थी दर्ज करें' : 'Register Beneficiary'}</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase font-mono">Registered Beneficiaries</div>
          <div className="text-2xl font-bold text-slate-900 font-mono">18,420</div>
          <div className="text-[11px] text-slate-500 pt-1">Across 75 Districts</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase font-mono">Family ID Linked Rate</div>
          <div className="text-2xl font-bold text-[#16A34A] font-mono">98.4%</div>
          <div className="text-[11px] text-slate-500 pt-1">Aadhaar e-KYC Certified</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase font-mono">Women Farmer Beneficiaries</div>
          <div className="text-2xl font-bold text-[#14532D] font-mono">34.2%</div>
          <div className="text-[11px] text-slate-500 pt-1">Special Category Priority</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="text-xs text-slate-500 font-bold uppercase font-mono">Total DBT Subsidy Disbursed</div>
          <div className="text-2xl font-bold text-emerald-700 font-mono">₹38.40 Cr</div>
          <div className="text-[11px] text-slate-500 pt-1">PFMS Direct Bank Credit</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 font-mono">Family ID</th>
                <th className="p-3">Beneficiary Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">District</th>
                <th className="p-3">Enrolled Scheme</th>
                <th className="p-3 font-mono">DBT Subsidy Status</th>
                <th className="p-3">e-KYC Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50 transition-all">
                  <td className="p-3 font-bold font-mono text-slate-900">{b.familyId}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{b.fullName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{b.aadhaarMasked}</div>
                  </td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-800 border border-slate-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      {b.category}
                    </span>
                  </td>
                  <td className="p-3">{b.district}</td>
                  <td className="p-3 text-slate-800">{b.schemesEnrolled?.[0]?.schemeName || 'Mini Dairy Scheme'}</td>
                  <td className="p-3 font-mono font-bold text-[#16A34A]">₹{(b.schemesEnrolled?.[0]?.subsidyAmount || 50000).toLocaleString()} Disbursed</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-[#14532D] border border-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
                      <span>{b.verifiedFamilyId ? 'e-KYC Verified' : 'Pending'}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 text-xs text-slate-900">
            <h3 className="font-bold text-[#14532D] text-base border-b border-slate-200 pb-3">
              Register Beneficiary for DBT Subsidy
            </h3>

            <form onSubmit={handleRegisterBeneficiary} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Beneficiary Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Family ID (परिवार पहचान पत्र)</label>
                  <input
                    type="text"
                    required
                    value={familyId}
                    onChange={(e) => setFamilyId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono rounded-lg p-2.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Social Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  >
                    <option value="SC">SC (50% Subsidy)</option>
                    <option value="ST">ST (50% Subsidy)</option>
                    <option value="Women Farmer">Women Farmer</option>
                    <option value="OBC">OBC</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Assigned Department Scheme</label>
                <input
                  type="text"
                  value={scheme}
                  onChange={(e) => setScheme(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#14532D] text-white font-semibold rounded-lg shadow-sm">
                  Register Beneficiary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
