import React, { useState } from 'react';
import { DepartmentAsset, Language, UserRole } from '../types';
import { Package, Plus, CheckCircle2, ShieldCheck, Search, AlertTriangle, Building, MapPin } from 'lucide-react';

interface ModuleAssetsProps {
  assets: DepartmentAsset[];
  setAssets: React.Dispatch<React.SetStateAction<DepartmentAsset[]>>;
  language: Language;
  role: UserRole;
  searchQuery: string;
}

export const ModuleAssets: React.FC<ModuleAssetsProps> = ({
  assets = [],
  setAssets,
  language,
  role,
  searchQuery = '',
}) => {
  const isHi = language === 'hi';
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [assetName, setAssetName] = useState('');
  const [assetType, setAssetType] = useState<'Building' | 'Equipment' | 'Medicine/Vaccine Stock'>('Building');
  const [district, setDistrict] = useState('Lucknow');
  const [location, setLocation] = useState('Civil Hospital HQ');
  const [valueLakhs, setValueLakhs] = useState(15.0);

  const filtered = assets.filter((a) => {
    return (
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.uniqueAssetId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.institutionName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName) return;

    const newAsset: DepartmentAsset = {
      id: `ast-${Date.now()}`,
      uniqueAssetId: `AST-UP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: assetName,
      category: assetType,
      institutionName: location,
      district,
      status: 'Operational',
      purchaseDate: new Date().toISOString().split('T')[0],
      costInLakhs: Number(valueLakhs),
      lastInspectionDate: new Date().toISOString().split('T')[0],
    };

    setAssets([newAsset, ...assets]);
    setShowModal(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <Package className="w-6 h-6 text-[#14532D]" />
            <span>{isHi ? 'विभागीय परिसंपत्ति एवं वैक्सीन कोल्ड-चेन स्टॉक' : 'Departmental Asset & Vaccine Cold-Chain Stock MIS'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? 'पशु चिकित्सालय भवन, अल्ट्रासाउंड/एक्स-रे मशीनें, वैक्सीन कोल्ड-चेन स्टॉक एवं जियोटैग ऑडिट'
              : 'Hospital Buildings, Medical Equipment AMC, Vaccine Cold Chain Storage & Geotag Verification'}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isHi ? 'नई परिसंपत्ति दर्ज करें' : 'Register Geotagged Asset'}</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((ast) => (
          <div key={ast.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] font-bold text-slate-500">{ast.uniqueAssetId}</span>
                <h3 className="font-bold text-slate-900 text-sm">{ast.name}</h3>
              </div>
              <span className="bg-emerald-100 text-[#14532D] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                ₹{ast.costInLakhs} Lakhs
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{ast.institutionName}, {ast.district}</span>
              </div>
              <div>Category: <strong>{ast.category}</strong></div>
              <div>Last Inspection: <strong>{ast.lastInspectionDate}</strong></div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="bg-emerald-50 text-[#14532D] border border-emerald-200 text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>{ast.status}</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                ✓ Geotagged Audit
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
              Register Departmental Asset
            </h3>

            <form onSubmit={handleRegisterAsset} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Asset Title / Name</label>
                <input
                  type="text"
                  required
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Asset Category</label>
                  <select
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  >
                    <option value="Building">Hospital Building</option>
                    <option value="Equipment">Medical Equipment</option>
                    <option value="Medicine/Vaccine Stock">Vaccine Cold Chain Storage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Estimated Value (Lakhs ₹)</label>
                  <input
                    type="number"
                    value={valueLakhs}
                    onChange={(e) => setValueLakhs(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Location / Hospital Address</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#14532D] text-white font-semibold rounded-lg shadow-sm">
                  Register Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
