import React, { useState } from 'react';
import { MVUUnit, Language, UserRole } from '../types';
import { Ambulance, MapPin, PhoneCall, Navigation, Clock, ShieldAlert, CheckCircle2, AlertTriangle, Smartphone, UserCheck, Send, Sparkles, Phone } from 'lucide-react';

interface ModuleMVUProps {
  mvus: MVUUnit[];
  setMvus: React.Dispatch<React.SetStateAction<MVUUnit[]>>;
  language: Language;
  role: UserRole;
  searchQuery: string;
}

export const ModuleMVU: React.FC<ModuleMVUProps> = ({
  mvus = [],
  setMvus,
  language,
  role,
  searchQuery = '',
}) => {
  const isHi = language === 'hi';
  const [selectedMvu, setSelectedMvu] = useState<MVUUnit | null>(mvus?.[0] || null);

  // New Emergency Call Booking Form (Toll-Free 1962 Simulator)
  const [showCallModal, setShowCallModal] = useState(false);
  const [farmerName, setFarmerName] = useState('');
  const [farmerContact, setFarmerContact] = useState('');
  const [villageLocation, setVillageLocation] = useState('');
  const [animalIssue, setAnimalIssue] = useState('');
  const [district, setDistrict] = useState('Lucknow');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Vet App Simulator Mode Toggle
  const [isVetAppView, setIsVetAppView] = useState(false);

  const filtered = mvus.filter((m) => {
    return (
      m.mvuNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.assignedVetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.vehicleRegNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleBookEmergencyCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !animalIssue) return;

    setBookingConfirmed(true);

    // Auto-allot to first available MVU
    setMvus((prev) =>
      prev.map((m, idx) => {
        if (idx === 0) {
          return {
            ...m,
            status: 'On Call Duty',
            activeEmergencyCall: {
              callId: `CALL-1962-${Math.floor(1000 + Math.random() * 9000)}`,
              farmerName,
              farmerContact: farmerContact || '+91 98765 00000',
              location: villageLocation || 'Village Center',
              animalIssue,
              bookingTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          };
        }
        return m;
      })
    );

    setTimeout(() => {
      setBookingConfirmed(false);
      setShowCallModal(false);
      setFarmerName('');
      setAnimalIssue('');
    }, 1800);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <Ambulance className="w-6 h-6 text-[#DC2626] animate-pulse" />
            <span>{isHi ? 'मोबाइल पशु चिकित्सा इकाई (MVU 1962) जीपीएस कमान सेंटर' : 'Mobile Veterinary Unit (MVU 1962) Real-Time GPS GIS Command Center'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? '1962 आपातकालीन कॉल बुकिंग, स्वचालित एम्बुलेंस आबंटन, लाइव जीपीएस मैप एवं फील्ड पशु चिकित्सक ऐप'
              : 'Toll-Free 1962 Emergency Booking, Automated MVU Allotment & Field Veterinary App View'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsVetAppView(!isVetAppView)}
            className={`text-xs font-semibold px-3.5 py-2 rounded-lg border transition-all flex items-center gap-1.5 ${
              isVetAppView ? 'bg-[#14532D] text-white border-[#14532D]' : 'bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{isVetAppView ? 'Command Center View' : 'Field Vet Mobile Mode'}</span>
          </button>

          <button
            onClick={() => setShowCallModal(true)}
            className="bg-[#DC2626] hover:bg-red-700 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{isHi ? '1962 कॉल बुक करें' : 'Simulate 1962 Emergency Call'}</span>
          </button>
        </div>
      </div>

      {!isVetAppView ? (
        /* GIS Map Command Center Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* GIS Map Canvas Mockup */}
          <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center text-xs border-b border-slate-200 pb-3">
              <span className="font-mono font-bold text-[#14532D] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#16A34A]" />
                Live District GIS Route Map View (1962 Fleet Active)
              </span>
              <span className="bg-emerald-100 text-[#14532D] text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200 font-mono">
                142 Ambulances On Road
              </span>
            </div>

            {/* Simulated Clean GIS Map Visual */}
            <div className="relative h-96 w-full rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
              {/* Map Canvas Styling: Grid + Light Terrain */}
              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-60"></div>
              
              {/* District Boundary Overlay Mockup */}
              <svg className="absolute inset-0 w-full h-full stroke-emerald-600/30 fill-emerald-50/20" strokeWidth="1.5">
                <polygon points="40,50 180,30 320,80 420,200 350,340 120,320 30,220" />
                <polygon points="320,80 580,40 720,120 680,280 420,200" />
                <polygon points="120,320 350,340 420,200 480,380 220,390" />
              </svg>

              {/* Floating Live MVU Markers */}
              {filtered.map((m, idx) => {
                const posX = 15 + ((idx * 28 + 20) % 70);
                const posY = 20 + ((idx * 32 + 15) % 65);
                const isSelected = selectedMvu?.id === m.id;

                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMvu(m)}
                    style={{ left: `${posX}%`, top: `${posY}%` }}
                    className={`absolute cursor-pointer transition-all transform -translate-x-1/2 -translate-y-1/2 z-10 ${
                      isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full shadow-md flex items-center justify-center font-bold text-xs ${
                        m.status === 'On Call Duty'
                          ? 'bg-[#DC2626] text-white border-2 border-white animate-bounce'
                          : m.status === 'En-route'
                          ? 'bg-[#F59E0B] text-white border-2 border-white'
                          : 'bg-[#14532D] text-white border-2 border-white'
                      }`}
                    >
                      <Ambulance className="w-4 h-4" />
                    </div>
                    <div className="mt-1 bg-white text-slate-900 border border-slate-300 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow text-center whitespace-nowrap">
                      {m.mvuNumber}
                    </div>
                  </div>
                );
              })}

              {/* Floating Map Legend */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur border border-slate-200 p-2.5 rounded-lg shadow-md text-[10px] space-y-1 text-slate-800">
                <div className="font-bold border-b border-slate-200 pb-1 mb-1 text-slate-900">GIS Status Legend</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#14532D]"></span> Standby at Hospital HQ</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span> En-Route to Farmer Site</div>
                <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] animate-pulse"></span> Active Emergency Call (1962)</div>
              </div>
            </div>

            {/* Active MVUs Fleet Table */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase font-mono">1962 Ambulance Fleet Status</span>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5 font-mono">MVU Code</th>
                      <th className="p-2.5">Reg Number</th>
                      <th className="p-2.5">District</th>
                      <th className="p-2.5">Assigned Vet</th>
                      <th className="p-2.5">Duty Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {filtered.map((m) => (
                      <tr
                        key={m.id}
                        onClick={() => setSelectedMvu(m)}
                        className={`cursor-pointer transition-all ${
                          selectedMvu?.id === m.id ? 'bg-emerald-50/60 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="p-2.5 font-mono font-bold text-slate-900">{m.mvuNumber}</td>
                        <td className="p-2.5 font-mono">{m.vehicleRegNo}</td>
                        <td className="p-2.5">{m.district}</td>
                        <td className="p-2.5">{m.assignedVetName}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                              m.status === 'On Call Duty'
                                ? 'bg-red-100 text-[#DC2626] border border-red-200'
                                : m.status === 'En-route'
                                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                : 'bg-emerald-100 text-[#14532D] border border-emerald-200'
                            }`}
                          >
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Information Drawer */}
          {selectedMvu && (
            <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs text-slate-800">
              <div className="border-b border-slate-200 pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold font-mono text-slate-900 text-sm">{selectedMvu.mvuNumber}</span>
                  <span className="bg-emerald-100 text-[#14532D] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                    {selectedMvu.district}
                  </span>
                </div>
                <div className="text-slate-500 font-mono text-[11px] mt-1">Vehicle Reg: {selectedMvu.vehicleRegNo}</div>
              </div>

              {/* Assigned Staff */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900 text-xs">Assigned Mobile Veterinary Unit Team</div>
                <div>Surgeon: <strong>{selectedMvu.assignedVetName}</strong> ({selectedMvu.assignedVetContact})</div>
                <div>Para-Vet Assistant: <strong>{selectedMvu.paraVetAssistant}</strong></div>
                <div>Driver-Cum-Attendant: <strong>{selectedMvu.driverName}</strong></div>
              </div>

              {/* Active 1962 Call Details */}
              {selectedMvu.activeEmergencyCall ? (
                <div className="bg-red-50 p-3.5 rounded-lg border border-red-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#DC2626] font-mono flex items-center gap-1">
                      <PhoneCall className="w-3.5 h-3.5 text-[#DC2626]" />
                      1962 Emergency Ticket
                    </span>
                    <span className="text-[10px] font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                      {selectedMvu.activeEmergencyCall.bookingTime}
                    </span>
                  </div>
                  <div className="text-slate-800">Farmer: <strong>{selectedMvu.activeEmergencyCall.farmerName}</strong> ({selectedMvu.activeEmergencyCall.farmerContact})</div>
                  <div className="text-slate-800">Location: <strong>{selectedMvu.activeEmergencyCall.location}</strong></div>
                  <div className="text-red-900 font-medium">Issue: {selectedMvu.activeEmergencyCall.animalIssue}</div>
                </div>
              ) : (
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200 text-[#14532D] font-medium text-center">
                  ✓ Unit on Standby at District HQ Hospital. Ready for 1962 dispatch.
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Field Vet Mobile App View Simulator */
        <div className="max-w-md mx-auto bg-white p-5 rounded-2xl border-4 border-slate-800 shadow-2xl space-y-4 text-xs text-slate-900">
          <div className="bg-[#14532D] text-white p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="w-5 h-5 text-amber-300" />
              <div>
                <div className="font-bold">1962 Field Vet Mobile App</div>
                <div className="text-[10px] opacity-80">Offline Sync & GPS On</div>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-800 px-2 py-0.5 rounded">ONLINE</span>
          </div>

          <div className="space-y-3">
            <div className="font-bold text-slate-800 text-xs">Active Emergency Dispatches Today</div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
              <div className="flex justify-between font-bold text-[#DC2626]">
                <span>Ticket #1962-9981</span>
                <span>En-Route (2.4 km)</span>
              </div>
              <p className="text-slate-700">Farmer: Ramesh Kumar • Village Bilaspur</p>
              <p className="text-slate-600 italic">"Buffalo suffering high fever and bloating."</p>
              <button className="w-full bg-[#14532D] text-white py-2 rounded-lg font-semibold shadow-sm">
                Mark Arrival & Start Treatment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1962 Call Simulation Modal */}
      {showCallModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 text-xs text-slate-900">
            <h3 className="font-bold text-[#DC2626] text-base border-b border-slate-200 pb-3 flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-[#DC2626]" />
              <span>Simulate Toll-Free 1962 Ambulance Call</span>
            </h3>

            {!bookingConfirmed ? (
              <form onSubmit={handleBookEmergencyCall} className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Farmer Name</label>
                  <input
                    type="text"
                    required
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Contact Mobile</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={farmerContact}
                    onChange={(e) => setFarmerContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Village & Landmark</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Village Bilaspur near Gram Panchayat Ghar"
                    value={villageLocation}
                    onChange={(e) => setVillageLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Animal Emergency Issue</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="High fever, calving difficulty, sudden injury..."
                    value={animalIssue}
                    onChange={(e) => setAnimalIssue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                  <button type="button" onClick={() => setShowCallModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2 bg-[#DC2626] text-white font-semibold rounded-lg shadow-sm">
                    Book 1962 Emergency Call
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-emerald-100 border border-emerald-300 p-4 rounded-lg text-[#14532D] text-center font-bold space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#16A34A] mx-auto" />
                <div>1962 TICKET GENERATED!</div>
                <div className="text-xs font-normal">Nearest MVU Ambulance dispatched to {villageLocation}. SMS sent to farmer.</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
