import React, { useState } from 'react';
import { PoultryFarm, Language, UserRole } from '../types';
import { Feather, Plus, CheckCircle2, ShieldAlert, AlertTriangle, Search } from 'lucide-react';

interface ModulePoultryProps {
  poultryFarms: PoultryFarm[];
  setPoultryFarms: React.Dispatch<React.SetStateAction<PoultryFarm[]>>;
  language: Language;
  role: UserRole;
  searchQuery: string;
}

export const ModulePoultry: React.FC<ModulePoultryProps> = ({
  poultryFarms = [],
  setPoultryFarms,
  language,
  role,
  searchQuery = '',
}) => {
  const isHi = language === 'hi';
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [farmName, setFarmName] = useState('');
  const [farmType, setFarmType] = useState<'Backyard' | 'Commercial Layer' | 'Commercial Broiler'>('Backyard');
  const [capacity, setCapacity] = useState(250);
  const [ownerName, setOwnerName] = useState('');
  const [district, setDistrict] = useState('Lucknow');

  const filtered = poultryFarms.filter((p) => {
    return (
      p.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleRegisterFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName || !ownerName) return;

    const newFarm: PoultryFarm = {
      id: `p-${Date.now()}`,
      farmName,
      type: farmType,
      currentBirdCount: Number(capacity),
      totalChicksDistributed: Number(capacity),
      ownerName,
      ownerFamilyId: 'FID-998811',
      district,
      diseaseSurveillanceStatus: 'Clear',
      biosecurityAuditScore: 92,
      schemeStatus: 'Approved',
    };

    setPoultryFarms([newFarm, ...poultryFarms]);
    setShowModal(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <Feather className="w-6 h-6 text-[#14532D]" />
            <span>{isHi ? 'कुक्कुट विकास एवं एवियन इन्फ्लूएंजा निगरानी' : 'Poultry & Avian Flu Surveillance Module'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? 'बैकयार्ड चूजा वितरण, कमर्शियल लेयर/ब्रायलर ऑडिट, बायोसिक्योरिटी प्रमाणन एवं बर्ड फ्लू नमूनाकरण'
              : 'Backyard Chick Disbursal, Layer/Broiler Audits, Biosecurity Certification & Avian Flu Lab Testing'}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isHi ? 'नया पोल्ट्री फॉर्म दर्ज करें' : 'Register Poultry Farm'}</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((farm) => (
          <div key={farm.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{farm.farmName}</h3>
                <p className="text-xs text-slate-500">{farm.type} • {farm.district}</p>
              </div>
              <span className="bg-emerald-100 text-[#14532D] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                {farm.currentBirdCount} Birds
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
              <div>Owner: <strong>{farm.ownerName}</strong> ({farm.ownerFamilyId})</div>
              <div>Biosecurity Score: <strong>{farm.biosecurityAuditScore}%</strong></div>
              <div>Disease Surveillance: <strong className="text-[#16A34A]">{farm.diseaseSurveillanceStatus}</strong></div>
            </div>

            <div className="pt-2">
              <span className="bg-emerald-50 text-[#14532D] border border-emerald-200 text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1 w-fit">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Scheme: {farm.schemeStatus}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 text-xs text-slate-900">
            <h3 className="font-bold text-[#14532D] text-base border-b border-slate-200 pb-3">
              Register Poultry Farm & Biosecurity
            </h3>

            <form onSubmit={handleRegisterFarm} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Farm Name</label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Owner Name</label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Farm Category</label>
                  <select
                    value={farmType}
                    onChange={(e) => setFarmType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  >
                    <option value="Backyard">Backyard Poultry</option>
                    <option value="Commercial Layer">Commercial Layer</option>
                    <option value="Commercial Broiler">Commercial Broiler</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Capacity (Birds)</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#14532D] text-white font-semibold rounded-lg shadow-sm">
                  Register Farm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
