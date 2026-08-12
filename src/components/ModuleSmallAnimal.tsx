import React, { useState } from 'react';
import { SmallAnimalFlock, Language, UserRole } from '../types';
import { Feather, Plus, CheckCircle2, ShieldAlert, Award, Search, ArrowUpRight } from 'lucide-react';

interface ModuleSmallAnimalProps {
  smallAnimals: SmallAnimalFlock[];
  setSmallAnimals: React.Dispatch<React.SetStateAction<SmallAnimalFlock[]>>;
  language: Language;
  role: UserRole;
  searchQuery: string;
}

export const ModuleSmallAnimal: React.FC<ModuleSmallAnimalProps> = ({
  smallAnimals = [],
  setSmallAnimals,
  language,
  role,
  searchQuery = '',
}) => {
  const isHi = language === 'hi';
  const [showModal, setShowModal] = useState(false);

  // New Flock State
  const [species, setSpecies] = useState<'Goat' | 'Sheep' | 'Pig'>('Goat');
  const [breed, setBreed] = useState('Beetal');
  const [count, setCount] = useState(10);
  const [ownerName, setOwnerName] = useState('');
  const [familyId, setFamilyId] = useState('FID-339281');
  const [district, setDistrict] = useState('Lucknow');
  const [scheme, setScheme] = useState('National Livestock Mission - Goatry Unit');

  const filtered = smallAnimals.filter((item) => {
    return (
      item.flockTagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAddFlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName) return;

    const newFlock: SmallAnimalFlock = {
      id: `sa-${Date.now()}`,
      flockTagId: `FLOCK-${species[0]}-${Math.floor(100 + Math.random() * 900)}`,
      species,
      breed,
      count: Number(count),
      ownerName,
      ownerFamilyId: familyId,
      district,
      schemeAssigned: scheme,
      subsidyAmount: species === 'Goat' ? 50000 : 75000,
      vaccinationStatus: 'Fully Vaccinated',
      lastDewormingDate: new Date().toISOString().split('T')[0],
      breedImprovementAllotment: `Certified ${breed} Breeding Male #${Math.floor(Math.random() * 90)}`,
    };

    setSmallAnimals([newFlock, ...smallAnimals]);
    setShowModal(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <Feather className="w-6 h-6 text-[#14532D]" />
            <span>{isHi ? 'छोटे पशु प्रबंधन (बकरी, भेड़ एवं सूअर पालन)' : 'Small Animal Management Module'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? 'बकरी/भेड़/सूअर इकाइयों का पंजीकरण, नस्ल सुधार (Buck/Ram Allotment), पीपीआर टीकाकरण एवं सब्सिडी'
              : 'Flock Registration, Breed Improvement (Buck/Ram Allotment), PPR Vaccination, Scheme Subsidies'}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isHi ? 'नई इकाई पंजीकृत करें' : 'Register Small Animal Flock'}</span>
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs text-[#14532D] font-bold uppercase tracking-wider font-mono">{isHi ? 'बकरी पालन (Goatry Units)' : 'Goatry Units'}</div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">1,420 Units</div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Beetal, Black Bengal & Barbari Breeds</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs text-[#14532D] font-bold uppercase tracking-wider font-mono">{isHi ? 'भेड़ पालन (Sheep Farms)' : 'Sheep Rearing Units'}</div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono">820 Units</div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Magra, Nali & Hisardale Rams Allotted</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-xs text-[#14532D] font-bold uppercase tracking-wider font-mono">{isHi ? 'पीपीआर टीका कवरेज' : 'PPR Vaccine Coverage'}</div>
          <div className="text-2xl font-bold text-[#16A34A] tracking-tight font-mono">98.1%</div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Zero Outbreak Status Certified</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex justify-between items-center text-xs font-bold text-slate-800 uppercase font-mono">
          <span>{isHi ? `पंजीकृत अजा/अजजा एवं सामान्य छोटे पशु इकाइयां (${filtered.length})` : `Registered Small Animal Units (${filtered.length})`}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 font-mono">Flock ID</th>
                <th className="p-3">Species & Breed</th>
                <th className="p-3 font-mono">Count</th>
                <th className="p-3">Owner & Family ID</th>
                <th className="p-3">Scheme & DBT Subsidy</th>
                <th className="p-3">Breed Male Allotment</th>
                <th className="p-3">Vaccination Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-all">
                  <td className="p-3 font-bold font-mono text-slate-900">{item.flockTagId}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{item.species}</div>
                    <div className="text-[11px] text-slate-500">{item.breed}</div>
                  </td>
                  <td className="p-3 font-mono font-bold text-[#14532D]">{item.count} Heads</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{item.ownerName}</div>
                    <div className="text-[11px] font-mono text-slate-500">{item.ownerFamilyId}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-slate-800 font-medium">{item.schemeAssigned}</div>
                    <div className="font-mono text-[#16A34A] font-bold">₹{item.subsidyAmount.toLocaleString()} Disbursed</div>
                  </td>
                  <td className="p-3 text-slate-800 font-medium">{item.breedImprovementAllotment}</td>
                  <td className="p-3">
                    <span className="bg-emerald-100 text-[#14532D] border border-emerald-300 px-2 py-0.5 rounded text-[10px] font-bold font-mono">
                      {item.vaccinationStatus}
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
              Register Small Animal Flock Unit
            </h3>

            <form onSubmit={handleAddFlock} className="space-y-3">
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
                  <label className="block text-slate-700 font-semibold mb-1">Species</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  >
                    <option value="Goat">Goat (बकरी)</option>
                    <option value="Sheep">Sheep (भेड़)</option>
                    <option value="Pig">Pig (सूअर)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Count of Heads</label>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#14532D] text-white font-semibold rounded-lg shadow-sm">
                  Register Unit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
