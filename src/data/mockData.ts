import {
  LargeAnimal,
  SmallAnimalFlock,
  PoultryFarm,
  TrainingCourse,
  TrainingCertificate,
  SchemeBudget,
  FundRequest,
  Beneficiary,
  OfficerProfile,
  DepartmentAsset,
  MVUUnit
} from '../types';

export const INITIAL_LARGE_ANIMALS: LargeAnimal[] = [
  {
    id: 'la-101',
    tagNumber: 'TAG-IN-889012',
    species: 'Buffalo',
    breed: 'Murrah',
    ageYears: 4,
    gender: 'Female',
    ownerName: 'Ramesh Singh',
    ownerFamilyId: 'FID-883921',
    ownerContact: '+91 98765 43210',
    district: 'Karnal',
    block: 'Nilokheri',
    milkYieldLitersDay: 16.5,
    fatPercentage: 7.2,
    snfPercentage: 9.1,
    vaccinations: [
      { disease: 'Foot & Mouth Disease (FMD)', date: '2026-02-10', doseNumber: 3, nextDueDate: '2026-08-10', batchNumber: 'FMD-2026-X9' },
      { disease: 'Hemorrhagic Septicemia (HS)', date: '2025-11-15', doseNumber: 2, nextDueDate: '2026-11-15', batchNumber: 'HS-2025-B2' },
      { disease: 'Brucellosis', date: '2025-05-20', doseNumber: 1, nextDueDate: '2027-05-20', batchNumber: 'BRU-882' }
    ],
    breedingRecords: [
      { aiDate: '2026-03-12', semenStrawNo: 'STRAW-MUR-881', bullBreed: 'Pure Murrah Elite Bull #108', pregnancyStatus: 'Confirmed Positive', expectedCalvingDate: '2026-12-18' }
    ],
    healthHistory: [
      { date: '2026-01-14', diagnosis: 'Mild Deworming Needed', vetName: 'Dr. Suresh Verma (VAS)', treatmentGiven: 'Albendazole 3000mg orally' }
    ]
  },
  {
    id: 'la-102',
    tagNumber: 'TAG-IN-992031',
    species: 'Cattle',
    breed: 'Sahiwal',
    ageYears: 3,
    gender: 'Female',
    ownerName: 'Sunita Devi',
    ownerFamilyId: 'FID-774102',
    ownerContact: '+91 98123 77654',
    district: 'Hisar',
    block: 'Hansi',
    milkYieldLitersDay: 12.8,
    fatPercentage: 4.8,
    snfPercentage: 8.7,
    vaccinations: [
      { disease: 'Foot & Mouth Disease (FMD)', date: '2026-03-01', doseNumber: 2, nextDueDate: '2026-09-01', batchNumber: 'FMD-2026-A1' },
      { disease: 'Black Quarter (BQ)', date: '2025-10-05', doseNumber: 1, nextDueDate: '2026-10-05', batchNumber: 'BQ-991' }
    ],
    breedingRecords: [
      { aiDate: '2026-04-20', semenStrawNo: 'STRAW-SAH-554', bullBreed: 'Sahiwal Pedigree Bull', pregnancyStatus: 'Pending' }
    ],
    healthHistory: [
      { date: '2026-04-02', diagnosis: 'Routine Health Check', vetName: 'Dr. Anjali Sharma (VAS)', treatmentGiven: 'Multivitamin Infusion' }
    ]
  },
  {
    id: 'la-103',
    tagNumber: 'TAG-IN-771029',
    species: 'Cattle',
    breed: 'Gir',
    ageYears: 5,
    gender: 'Female',
    ownerName: 'Mahipal Yadava',
    ownerFamilyId: 'FID-551982',
    ownerContact: '+91 94160 88291',
    district: 'Rohtak',
    block: 'Sampla',
    milkYieldLitersDay: 14.2,
    fatPercentage: 5.0,
    snfPercentage: 8.9,
    vaccinations: [
      { disease: 'Foot & Mouth Disease (FMD)', date: '2026-01-18', doseNumber: 4, nextDueDate: '2026-07-18', batchNumber: 'FMD-2026-X1' }
    ],
    breedingRecords: [],
    healthHistory: []
  }
];

export const INITIAL_SMALL_ANIMALS: SmallAnimalFlock[] = [
  {
    id: 'sa-201',
    flockTagId: 'FLOCK-G-881',
    species: 'Goat',
    breed: 'Beetal',
    count: 15,
    ownerName: 'Manohar Lal',
    ownerFamilyId: 'FID-339281',
    district: 'Ambala',
    schemeAssigned: 'National Livestock Mission - Goatry Unit',
    subsidyAmount: 50000,
    vaccinationStatus: 'Fully Vaccinated',
    lastDewormingDate: '2026-03-10',
    breedImprovementAllotment: 'Beetal Breeding Buck #B-99'
  },
  {
    id: 'sa-202',
    flockTagId: 'FLOCK-P-442',
    species: 'Pig',
    breed: 'Large White Yorkshire',
    count: 8,
    ownerName: 'Kuldeep Kumar',
    ownerFamilyId: 'FID-112093',
    district: 'Bhiwani',
    schemeAssigned: 'Commercial Piggery Development Scheme',
    subsidyAmount: 75000,
    vaccinationStatus: 'Fully Vaccinated',
    lastDewormingDate: '2026-02-28',
    breedImprovementAllotment: 'Certified Yorkshire Boar #Y-12'
  },
  {
    id: 'sa-203',
    flockTagId: 'FLOCK-S-109',
    species: 'Sheep',
    breed: 'Nali Sheep',
    count: 22,
    ownerName: 'Harish Chander',
    ownerFamilyId: 'FID-448102',
    district: 'Sirsa',
    schemeAssigned: 'Nali Breed Preservation Scheme',
    subsidyAmount: 30000,
    vaccinationStatus: 'Partial',
    lastDewormingDate: '2026-01-15'
  }
];

export const INITIAL_POULTRY_FARMS: PoultryFarm[] = [
  {
    id: 'pf-301',
    farmName: 'Maa Vaishno Poultry Farm',
    type: 'Commercial Layer',
    ownerName: 'Rajinder Prasad',
    ownerFamilyId: 'FID-662910',
    district: 'Sonipat',
    totalChicksDistributed: 5000,
    currentBirdCount: 4890,
    dailyEggProduction: 4450,
    diseaseSurveillanceStatus: 'Clear',
    biosecurityAuditScore: 94,
    schemeStatus: 'Approved'
  },
  {
    id: 'pf-302',
    farmName: 'Gramin Backyard Poultry Unit #44',
    type: 'Backyard',
    ownerName: 'Kamla Rani',
    ownerFamilyId: 'FID-991203',
    district: 'Jhajjar',
    totalChicksDistributed: 50,
    currentBirdCount: 48,
    dailyEggProduction: 32,
    diseaseSurveillanceStatus: 'Clear',
    biosecurityAuditScore: 88,
    schemeStatus: 'Approved'
  }
];

export const INITIAL_TRAINING_COURSES: TrainingCourse[] = [
  {
    id: 'tc-401',
    title: 'Modern Scientific Dairy Farming & Clean Milk Production',
    titleHindi: 'आधुनिक वैज्ञानिक डेयरी पालन एवं स्वच्छ दूध उत्पादन',
    category: 'Dairy',
    mode: 'Hybrid',
    durationDays: 5,
    instructor: 'Dr. Vikramaditya, Chief Training Officer',
    enrolledCount: 342,
    description: 'Covers Murrah & Sahiwal breed selection, TMR feeding, silage making, mastitis prevention, and digital milk testing.'
  },
  {
    id: 'tc-402',
    title: 'Commercial Goatry & Sheep Farming Management',
    titleHindi: 'व्यावसायिक बकरी एवं भेड़ पालन प्रबंधन',
    category: 'Goatry',
    mode: 'Online E-Learning',
    durationDays: 3,
    instructor: 'Dr. Meenakshi Saini, Specialist Veterinary Officer',
    enrolledCount: 512,
    description: 'Housing design, stall-feeding technique, PPR vaccination protocol, and direct market linkages.'
  },
  {
    id: 'tc-403',
    title: 'MVU First Responder & Livestock Emergency Care',
    titleHindi: 'एमवीयू प्रथम प्रतिक्रिया एवं पशु आपातकालीन देखभाल',
    category: 'MVU Responder',
    mode: 'Offline Institutional',
    durationDays: 7,
    instructor: 'Dr. Harvinder Singh, Joint Director MVU',
    enrolledCount: 180,
    description: 'Comprehensive training for Paravets and MVU technicians on GPS emergency dispatch, field triage, and sample collection.'
  }
];

export const INITIAL_CERTIFICATES: TrainingCertificate[] = [
  {
    certificateId: 'CERT-AHD-2026-8819',
    traineeName: 'Ramesh Singh',
    familyId: 'FID-883921',
    courseTitle: 'Modern Scientific Dairy Farming & Clean Milk Production',
    issueDate: '2026-03-15',
    grade: 'A+ (Passed with Distinction)',
    qrCodeData: 'https://ahd.portal.gov.in/verify-cert/CERT-AHD-2026-8819'
  }
];

export const INITIAL_BUDGETS: SchemeBudget[] = [
  {
    id: 'bg-501',
    schemeName: 'Rashtriya Gokul Mission (Indigenous Breed Development)',
    schemeCode: 'RGM-2026',
    totalAllocatedCr: 45.0,
    expenditureCr: 31.4,
    pendingUcCr: 4.2,
    districtAllocations: [
      { district: 'Karnal', allocatedLakhs: 450, spentLakhs: 380, ucSubmittedLakhs: 350 },
      { district: 'Hisar', allocatedLakhs: 500, spentLakhs: 410, ucSubmittedLakhs: 390 },
      { district: 'Rohtak', allocatedLakhs: 350, spentLakhs: 290, ucSubmittedLakhs: 260 },
      { district: 'Ambala', allocatedLakhs: 300, spentLakhs: 210, ucSubmittedLakhs: 180 }
    ]
  },
  {
    id: 'bg-502',
    schemeName: 'Mobile Veterinary Unit (MVU) Operations & GPS Tracking',
    schemeCode: 'MVU-1962',
    totalAllocatedCr: 28.5,
    expenditureCr: 22.1,
    pendingUcCr: 1.8,
    districtAllocations: [
      { district: 'Karnal', allocatedLakhs: 280, spentLakhs: 240, ucSubmittedLakhs: 230 },
      { district: 'Hisar', allocatedLakhs: 320, spentLakhs: 280, ucSubmittedLakhs: 270 },
      { district: 'Sirsa', allocatedLakhs: 300, spentLakhs: 250, ucSubmittedLakhs: 240 }
    ]
  },
  {
    id: 'bg-503',
    schemeName: 'National Animal Disease Control Programme (NADCP - FMD/Brucellosis)',
    schemeCode: 'NADCP-2026',
    totalAllocatedCr: 60.0,
    expenditureCr: 48.2,
    pendingUcCr: 3.5,
    districtAllocations: [
      { district: 'Karnal', allocatedLakhs: 600, spentLakhs: 520, ucSubmittedLakhs: 500 },
      { district: 'Hisar', allocatedLakhs: 650, spentLakhs: 590, ucSubmittedLakhs: 580 }
    ]
  }
];

export const INITIAL_FUND_REQUESTS: FundRequest[] = [
  {
    id: 'fr-901',
    district: 'Jhajjar',
    schemeCode: 'MVU-1962',
    requestedLakhs: 25.0,
    purpose: 'Procurement of emergency medicine replenishment & fuel maintenance for 4 MVU ambulances.',
    requestedBy: 'Dr. Narender Yadav (DVO Jhajjar)',
    requestDate: '2026-04-01',
    status: 'Pending Directorate'
  },
  {
    id: 'fr-902',
    district: 'Bhiwani',
    schemeCode: 'RGM-2026',
    requestedLakhs: 40.0,
    purpose: 'AI Semen Bank storage tank expansion and liquid nitrogen containers.',
    requestedBy: 'Dr. S.K. Malik (DVO Bhiwani)',
    requestDate: '2026-03-25',
    status: 'Approved'
  }
];

export const INITIAL_BENEFICIARIES: Beneficiary[] = [
  {
    id: 'ben-601',
    familyId: 'FID-883921',
    aadhaarMasked: 'XXXX-XXXX-4921',
    fullName: 'Ramesh Singh',
    gender: 'Male',
    district: 'Karnal',
    block: 'Nilokheri',
    village: 'Taraori',
    mobile: '+91 98765 43210',
    landHoldingAcres: 2.1,
    category: 'General',
    verifiedFamilyId: true,
    verifiedAadhaarOtp: true,
    schemesEnrolled: [
      {
        schemeName: 'Murrah High Yielding Buffalo Subsidy Scheme',
        sanctionDate: '2026-01-20',
        subsidyAmount: 60000,
        dbtStatus: 'Disbursed',
        bankAccountMasked: 'SBI - XXXX8812'
      }
    ]
  },
  {
    id: 'ben-602',
    familyId: 'FID-774102',
    aadhaarMasked: 'XXXX-XXXX-8812',
    fullName: 'Sunita Devi',
    gender: 'Female',
    district: 'Hisar',
    block: 'Hansi',
    village: 'Sisar',
    mobile: '+91 98123 77654',
    landHoldingAcres: 1.0,
    category: 'Women Farmer',
    verifiedFamilyId: true,
    verifiedAadhaarOtp: true,
    schemesEnrolled: [
      {
        schemeName: 'Women Dairy Entrepreneurship Scheme',
        sanctionDate: '2026-02-14',
        subsidyAmount: 75000,
        dbtStatus: 'Disbursed',
        bankAccountMasked: 'PNB - XXXX3391'
      }
    ]
  }
];

export const INITIAL_OFFICERS: OfficerProfile[] = [
  {
    id: 'off-701',
    employeeId: 'EMP-AHD-001',
    name: 'Dr. Lokesh Kumar (IAS)',
    designation: 'Director General & Secretary',
    level: 'State Directorate',
    officeLocation: 'Pashudhan Bhawan, Sector 17, State Capital',
    district: 'State HQ',
    email: 'director.ahd@gov.in',
    mobile: '+91 94161 00001',
    status: 'Active',
    postingDate: '2024-06-01',
    sanctionedPost: 'Sanctioned - Filled'
  },
  {
    id: 'off-702',
    employeeId: 'EMP-AHD-045',
    name: 'Dr. Prem Chand',
    designation: 'District Veterinary Officer (DVO)',
    level: 'District',
    officeLocation: 'Civil Veterinary Hospital Complex, Karnal',
    district: 'Karnal',
    email: 'dvo.karnal@gov.in',
    mobile: '+91 98960 11223',
    status: 'Active',
    postingDate: '2025-01-15',
    sanctionedPost: 'Sanctioned - Filled'
  },
  {
    id: 'off-703',
    employeeId: 'EMP-AHD-112',
    name: 'Dr. Suresh Verma',
    designation: 'Veterinary Assistant Surgeon (VAS)',
    level: 'Block / Veterinary Hospital',
    officeLocation: 'Govt Veterinary Hospital, Nilokheri',
    district: 'Karnal',
    email: 'vas.nilokheri@gov.in',
    mobile: '+91 94662 33445',
    status: 'Active',
    postingDate: '2023-09-10',
    sanctionedPost: 'Sanctioned - Filled'
  }
];

export const INITIAL_ASSETS: DepartmentAsset[] = [
  {
    id: 'ast-801',
    uniqueAssetId: 'AST-BLD-001',
    name: 'Government Veterinary Hospital & Polyclinic Building',
    category: 'Building',
    institutionName: 'District Veterinary Polyclinic Karnal',
    district: 'Karnal',
    status: 'Operational',
    purchaseDate: '2018-05-10',
    costInLakhs: 185.0,
    lastInspectionDate: '2026-03-01',
    latitude: 29.6857,
    longitude: 76.9905
  },
  {
    id: 'ast-802',
    uniqueAssetId: 'AST-EQP-044',
    name: 'High-Frequency Digital Veterinary Color Doppler Ultrasound Machine',
    category: 'Equipment',
    institutionName: 'District Veterinary Polyclinic Karnal',
    district: 'Karnal',
    status: 'Operational',
    purchaseDate: '2024-11-20',
    costInLakhs: 14.5,
    amcExpiryDate: '2027-11-19',
    lastInspectionDate: '2026-02-15'
  },
  {
    id: 'ast-803',
    uniqueAssetId: 'AST-STK-109',
    name: 'FMD Vaccine Doses (Tissue Culture FMD Quadrivalent)',
    category: 'Medicine/Vaccine Stock',
    institutionName: 'District Cold Chain Depot, Hisar',
    district: 'Hisar',
    status: 'Operational',
    purchaseDate: '2026-01-05',
    costInLakhs: 8.2,
    lastInspectionDate: '2026-04-01',
    stockQuantity: 42000,
    minimumThreshold: 10000,
    unit: 'Doses'
  },
  {
    id: 'ast-804',
    uniqueAssetId: 'AST-STK-110',
    name: 'HS Vaccine Stock (Hemorrhagic Septicemia)',
    category: 'Medicine/Vaccine Stock',
    institutionName: 'District Cold Chain Depot, Ambala',
    district: 'Ambala',
    status: 'Operational',
    purchaseDate: '2026-02-10',
    costInLakhs: 3.5,
    lastInspectionDate: '2026-03-20',
    stockQuantity: 2400,
    minimumThreshold: 5000, // Trigger alert!
    unit: 'Doses'
  }
];

export const INITIAL_MVUS: MVUUnit[] = [
  {
    id: 'mvu-01',
    mvuNumber: 'MVU-1962-HR01',
    vehicleRegNo: 'HR 45 C 1962',
    assignedVetName: 'Dr. Vivek Sharma (VAS)',
    assignedParavetName: 'Satish Kumar (Paravet)',
    district: 'Karnal',
    currentLocationName: 'En route to Village Taraori (KM 14.2)',
    status: 'On Call Duty',
    gpsLat: 29.7021,
    gpsLng: 76.9812,
    totalCallsToday: 8,
    completedCallsToday: 6,
    medicineStockStatus: 'Sufficient',
    activeEmergencyCall: {
      callId: 'CALL-1962-8821',
      farmerName: 'Ramesh Singh',
      farmerContact: '+91 98765 43210',
      location: 'Village Taraori, House #12, Near Panchayat Ghar',
      animalIssue: 'High Fever (105°F) & Severe Bloat in Murrah Buffalo',
      bookingTime: '2026-04-12 10:15 AM'
    }
  },
  {
    id: 'mvu-02',
    mvuNumber: 'MVU-1962-HR02',
    vehicleRegNo: 'HR 20 D 1962',
    assignedVetName: 'Dr. Pinki Saini (VAS)',
    assignedParavetName: 'Anil Tyagi (Paravet)',
    district: 'Hisar',
    currentLocationName: 'Stationed at Civil Hospital Hub, Hansi',
    status: 'Available at Hub',
    gpsLat: 29.1492,
    gpsLng: 75.7217,
    totalCallsToday: 5,
    completedCallsToday: 5,
    medicineStockStatus: 'Sufficient'
  },
  {
    id: 'mvu-03',
    mvuNumber: 'MVU-1962-HR03',
    vehicleRegNo: 'HR 12 B 1962',
    assignedVetName: 'Dr. Rajesh Gill (VAS)',
    assignedParavetName: 'Dharampal (Paravet)',
    district: 'Rohtak',
    currentLocationName: 'Village Sampla Block B',
    status: 'In Transit',
    gpsLat: 28.8955,
    gpsLng: 76.6066,
    totalCallsToday: 7,
    completedCallsToday: 5,
    medicineStockStatus: 'Low Stock Warning'
  }
];
