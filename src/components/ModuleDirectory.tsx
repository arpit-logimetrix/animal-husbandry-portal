import React, { useState } from 'react';
import { OfficerProfile, Language, UserRole } from '../types';
import { Building, Plus, Phone, Mail, Award, CheckCircle2, Search, Send } from 'lucide-react';

interface ModuleDirectoryProps {
  officers: OfficerProfile[];
  setOfficers: React.Dispatch<React.SetStateAction<OfficerProfile[]>>;
  language: Language;
  role: UserRole;
  searchQuery: string;
}

export const ModuleDirectory: React.FC<ModuleDirectoryProps> = ({
  officers = [],
  setOfficers,
  language,
  role,
  searchQuery = '',
}) => {
  const isHi = language === 'hi';
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('Veterinary Officer (VO)');
  const [district, setDistrict] = useState('Lucknow');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');

  const filtered = officers.filter((o) => {
    return (
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.officeLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleAddOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newOff: OfficerProfile = {
      id: `off-${Date.now()}`,
      employeeId: `EMP-UP-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      designation,
      level: 'District',
      officeLocation: `Government Veterinary Hospital, ${district}`,
      district,
      mobile: contact || '+91 94150 00000',
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@up.gov.in`,
      status: 'Active',
      postingDate: new Date().toISOString().split('T')[0],
      sanctionedPost: 'Regular Sanctioned Post',
    };

    setOfficers([newOff, ...officers]);
    setShowModal(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <Building className="w-6 h-6 text-[#14532D]" />
            <span>{isHi ? 'विभागीय अधिकारी निर्देशिका एवं पद प्रबंधन' : 'Departmental Officers Directory & Cadre Management'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? 'स्वीकृत पद स्थिति, सेवारत पशु चिकित्सक, पदस्थापना स्थान, सम्पर्क निर्देशिका एवं सर्कुलर ब्रॉडकास्ट'
              : 'Sanctioned Posts, Active Veterinary Surgeons, Postings Directory & Instant Official Directives'}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#14532D] hover:bg-[#0f3e21] text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isHi ? 'अधिकारी विवरण जोड़ें' : 'Add Officer Posting'}</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((off) => (
          <div key={off.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-slate-900 text-base">{off.name}</h3>
                <p className="text-xs text-[#14532D] font-bold">{off.designation}</p>
              </div>
              <span className="bg-emerald-100 text-[#14532D] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                {off.district}
              </span>
            </div>

            <div className="text-xs text-slate-600 space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{off.mobile}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-mono">{off.email}</span>
              </div>
              <div className="text-slate-700">Posting: <strong>{off.officeLocation}</strong></div>
            </div>

            <div className="pt-2">
              <span className="bg-emerald-50 text-[#14532D] border border-emerald-200 text-[10px] font-semibold px-2 py-1 rounded flex items-center gap-1 w-fit">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>{off.status} Service</span>
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
              Add Officer Posting Entry
            </h3>

            <form onSubmit={handleAddOfficer} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Officer Name</label>
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
                  <label className="block text-slate-700 font-semibold mb-1">Designation</label>
                  <select
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  >
                    <option value="Deputy Director (DD)">Deputy Director (DD)</option>
                    <option value="District Veterinary Officer (DVO)">District Veterinary Officer (DVO)</option>
                    <option value="Veterinary Assistant Surgeon (VAS)">Veterinary Assistant Surgeon (VAS)</option>
                    <option value="Veterinary Officer (VO)">Veterinary Officer (VO)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">District</label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Contact Mobile</label>
                <input
                  type="text"
                  required
                  placeholder="+91 94150 00000"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-mono rounded-lg p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#14532D] text-white font-semibold rounded-lg shadow-sm">
                  Save Officer Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
