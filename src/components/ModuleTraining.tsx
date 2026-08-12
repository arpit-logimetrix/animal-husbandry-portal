import React, { useState } from 'react';
import { TrainingCourse, TrainingCertificate, Language, UserRole } from '../types';
import { GraduationCap, Award, PlayCircle, FileText, CheckCircle2, Download, QrCode, Plus, Users, Sparkles } from 'lucide-react';

interface ModuleTrainingProps {
  courses: TrainingCourse[];
  certificates: TrainingCertificate[];
  setCertificates: React.Dispatch<React.SetStateAction<TrainingCertificate[]>>;
  language: Language;
  role: UserRole;
  searchQuery: string;
}

export const ModuleTraining: React.FC<ModuleTrainingProps> = ({
  courses = [],
  certificates = [],
  setCertificates,
  language,
  role,
  searchQuery = '',
}) => {
  const isHi = language === 'hi';
  const [activeTab, setActiveTab] = useState<'courses' | 'certificates' | 'quiz'>('courses');
  const [selectedCert, setSelectedCert] = useState<TrainingCertificate | null>(certificates?.[0] || null);

  // E-Learning Quiz Simulator State
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [ans1, setAns1] = useState<string>('');
  const [ans2, setAns2] = useState<string>('');

  // Course Enroll Modal
  const [traineeName, setTraineeName] = useState('');
  const [familyId, setFamilyId] = useState('FID-883921');
  const [enrolledCourseTitle, setEnrolledCourseTitle] = useState('');
  const [showCertGenerateModal, setShowCertGenerateModal] = useState(false);

  const filteredCourses = courses.filter((c) => {
    return (
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleGenerateCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!traineeName || !enrolledCourseTitle) return;

    const certId = `CERT-AHD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: TrainingCertificate = {
      certificateId: certId,
      traineeName,
      familyId: familyId || 'FID-883921',
      courseTitle: enrolledCourseTitle,
      issueDate: new Date().toISOString().split('T')[0],
      grade: 'Grade A (Passed with Distinction)',
      qrCodeData: `https://ahd.portal.gov.in/verify-cert/${certId}`,
    };

    setCertificates([newCert, ...certificates]);
    setSelectedCert(newCert);
    setShowCertGenerateModal(false);
    setActiveTab('certificates');
  };

  const handleEvaluateQuiz = () => {
    let score = 0;
    if (ans1 === 'FMD') score += 50;
    if (ans2 === '1962') score += 50;
    setQuizScore(score);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight">
            <GraduationCap className="w-6 h-6 text-[#14532D]" />
            <span>{isHi ? 'प्रशिक्षण एवं ई-लर्निंग पोर्टल (डिजिटल प्रमाणपत्र)' : 'Training Management & E-Learning Portal'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isHi
              ? 'पशुपालक प्रशिक्षण कार्यक्रम, ई-लर्निंग वीडियो/मैनुअल, ऑनलाइन क्विज़ एवं डिजिटल सत्यापन प्रमाणपत्र'
              : 'Farmer Training Courses, E-Learning Video Manuals, Interactive Evaluation & Digital Certificates'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium flex space-x-1">
            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'courses' ? 'bg-[#14532D] text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isHi ? 'प्रशिक्षण कोर्स' : 'Courses Catalog'}
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'quiz' ? 'bg-[#14532D] text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isHi ? 'ई-क्विज़' : 'E-Quiz Evaluation'}
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'certificates' ? 'bg-[#14532D] text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {isHi ? 'ई-प्रमाणपत्र' : 'Verify Certificates'}
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredCourses.map((crs) => (
            <div key={crs.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="bg-emerald-100 text-[#14532D] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
                  {crs.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">{isHi ? crs.titleHindi : crs.title}</h3>
                <p className="text-xs text-slate-500">{crs.description}</p>
                <div className="text-xs text-slate-600 pt-2 border-t border-slate-100 font-medium">
                  Duration: {crs.durationDays} Days • Enrolled Farmers: <strong className="text-[#14532D]">{crs.enrolledCount}</strong>
                </div>
              </div>

              <button
                onClick={() => {
                  setEnrolledCourseTitle(crs.title);
                  setShowCertGenerateModal(true);
                }}
                className="w-full bg-[#14532D] hover:bg-[#0f3e21] text-white py-2 rounded-lg text-xs font-semibold shadow-sm mt-3"
              >
                Enroll & Take Assessment
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-4 text-xs text-slate-900">
          <h3 className="font-bold text-[#14532D] text-base border-b border-slate-200 pb-3">
            Farmer Knowledge Evaluation E-Quiz
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block font-semibold">Q1: Which major viral disease causes lesions on feet and mouth in cattle?</label>
              <div className="space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="q1" value="FMD" onChange={(e) => setAns1(e.target.value)} />
                  <span>Foot & Mouth Disease (FMD / खुरपका-मुंहपका)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="q1" value="Rabies" onChange={(e) => setAns1(e.target.value)} />
                  <span>Rabies</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-semibold">Q2: What is the toll-free emergency ambulance helpline number for Mobile Veterinary Units?</label>
              <div className="space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="q2" value="1962" onChange={(e) => setAns2(e.target.value)} />
                  <span>1962</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="q2" value="108" onChange={(e) => setAns2(e.target.value)} />
                  <span>108</span>
                </label>
              </div>
            </div>

            <button
              onClick={handleEvaluateQuiz}
              className="bg-[#14532D] text-white px-5 py-2.5 rounded-lg font-semibold shadow-sm"
            >
              Submit E-Quiz Answers
            </button>

            {quizScore !== null && (
              <div className="bg-emerald-100 border border-emerald-300 p-4 rounded-lg text-[#14532D] font-bold text-center">
                Score: {quizScore}% Passed! Eligible for QR E-Certificate.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'certificates' && selectedCert && (
        <div className="bg-white p-6 rounded-xl border-2 border-[#14532D] shadow-sm max-w-xl mx-auto space-y-4 text-xs text-slate-900 text-center">
          <div className="border-b border-slate-200 pb-3">
            <GraduationCap className="w-10 h-10 text-[#14532D] mx-auto mb-2" />
            <h3 className="font-bold text-[#14532D] text-lg uppercase tracking-wide">Government E-Certificate of Completion</h3>
            <p className="text-[11px] text-slate-500 font-mono">Department of Animal Husbandry & Dairying</p>
          </div>

          <div className="space-y-2 py-2">
            <div className="text-slate-600">This is to certify that</div>
            <div className="text-lg font-bold text-slate-900">{selectedCert.traineeName}</div>
            <div className="text-slate-600 font-mono text-[11px]">Family ID: {selectedCert.familyId}</div>
            <div className="text-slate-600">has successfully completed the training course</div>
            <div className="text-sm font-bold text-[#14532D]">{selectedCert.courseTitle}</div>
            <div className="text-xs font-semibold text-[#16A34A]">{selectedCert.grade}</div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between font-mono text-[10px]">
            <div>Cert ID: <strong>{selectedCert.certificateId}</strong></div>
            <div>Issue Date: <strong>{selectedCert.issueDate}</strong></div>
          </div>
        </div>
      )}

      {/* Enroll Modal */}
      {showCertGenerateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4 text-xs text-slate-900">
            <h3 className="font-bold text-[#14532D] text-base border-b border-slate-200 pb-3">
              Trainee Enrollment for Course Assessment
            </h3>

            <form onSubmit={handleGenerateCertificate} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Trainee / Farmer Name</label>
                <input
                  type="text"
                  required
                  value={traineeName}
                  onChange={(e) => setTraineeName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg p-2.5"
                />
              </div>

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

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button type="button" onClick={() => setShowCertGenerateModal(false)} className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-[#14532D] text-white font-semibold rounded-lg shadow-sm">
                  Complete Assessment & Generate Cert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
