export type Language = 'hi' | 'en';

export type UserRole = 'CITIZEN' | 'VET_OFFICER' | 'DVO' | 'DIRECTOR';

export type ModuleTab =
  | 'overview'
  | 'large_animal'
  | 'small_animal'
  | 'poultry'
  | 'training'
  | 'budget'
  | 'beneficiary'
  | 'directory'
  | 'assets'
  | 'mvu'
  | 'dashboard'
  | 'mobile_app'
  | 'ai_assistant'
  | 'ai_disease_detector';

// FR-2.1 Large Animal
export interface LargeAnimal {
  id: string;
  tagNumber: string; // RFID / Ear Tag
  species: 'Cattle' | 'Buffalo';
  breed: string; // e.g. Sahiwal, Murrah, Gir, HF
  ageYears: number;
  gender: 'Female' | 'Male';
  ownerName: string;
  ownerFamilyId: string;
  ownerContact: string;
  district: string;
  block: string;
  milkYieldLitersDay: number;
  fatPercentage: number;
  snfPercentage: number;
  vaccinations: {
    disease: string;
    date: string;
    doseNumber: number;
    nextDueDate: string;
    batchNumber: string;
  }[];
  breedingRecords: {
    aiDate: string;
    semenStrawNo: string;
    bullBreed: string;
    pregnancyStatus: 'Pending' | 'Confirmed Positive' | 'Confirmed Negative';
    expectedCalvingDate?: string;
  }[];
  healthHistory: {
    date: string;
    diagnosis: string;
    vetName: string;
    treatmentGiven: string;
  }[];
}

// FR-2.2 Small Animal
export interface SmallAnimalFlock {
  id: string;
  flockTagId: string;
  species: 'Goat' | 'Sheep' | 'Pig';
  breed: string; // Beetal, Black Bengal, Nali Sheep, Landrace Pig
  count: number;
  ownerName: string;
  ownerFamilyId: string;
  district: string;
  schemeAssigned?: string;
  subsidyAmount?: number;
  vaccinationStatus: 'Fully Vaccinated' | 'Partial' | 'Overdue';
  lastDewormingDate: string;
  breedImprovementAllotment?: string;
}

// FR-2.3 Poultry Management
export interface PoultryFarm {
  id: string;
  farmName: string;
  type: 'Backyard' | 'Commercial Layer' | 'Commercial Broiler';
  ownerName: string;
  ownerFamilyId: string;
  district: string;
  totalChicksDistributed: number;
  currentBirdCount: number;
  dailyEggProduction?: number;
  diseaseSurveillanceStatus: 'Clear' | 'Under Monitoring' | 'Quarantine Alert';
  biosecurityAuditScore: number; // e.g. 92%
  schemeStatus: 'Approved' | 'In Process' | 'Not Applied';
}

// FR-2.4 Training Management
export interface TrainingCourse {
  id: string;
  title: string;
  titleHindi: string;
  category: 'Dairy' | 'Goatry' | 'Poultry' | 'Veterinary Care' | 'MVU Responder';
  mode: 'Online E-Learning' | 'Offline Institutional' | 'Hybrid';
  durationDays: number;
  instructor: string;
  enrolledCount: number;
  videoUrl?: string;
  pdfManualUrl?: string;
  description: string;
}

export interface TrainingCertificate {
  certificateId: string;
  traineeName: string;
  familyId: string;
  courseTitle: string;
  issueDate: string;
  grade: string;
  qrCodeData: string;
}

// FR-2.5 Budget & Finance
export interface SchemeBudget {
  id: string;
  schemeName: string;
  schemeCode: string;
  totalAllocatedCr: number; // In Crores
  expenditureCr: number;
  pendingUcCr: number;
  districtAllocations: {
    district: string;
    allocatedLakhs: number;
    spentLakhs: number;
    ucSubmittedLakhs: number;
  }[];
}

export interface FundRequest {
  id: string;
  district: string;
  schemeCode: string;
  requestedLakhs: number;
  purpose: string;
  requestedBy: string;
  requestDate: string;
  status: 'Pending DVO' | 'Pending Directorate' | 'Approved' | 'Disbursed';
}

// FR-2.6 Beneficiary
export interface Beneficiary {
  id: string;
  familyId: string;
  aadhaarMasked: string;
  fullName: string;
  gender: string;
  district: string;
  block: string;
  village: string;
  mobile: string;
  landHoldingAcres: number;
  category: 'SC' | 'ST' | 'OBC' | 'General' | 'Women Farmer';
  verifiedFamilyId: boolean;
  verifiedAadhaarOtp: boolean;
  schemesEnrolled: {
    schemeName: string;
    sanctionDate: string;
    subsidyAmount: number;
    dbtStatus: 'Disbursed' | 'Processing' | 'Pending Approval';
    bankAccountMasked: string;
  }[];
}

// FR-2.7 Departmental Directory
export interface OfficerProfile {
  id: string;
  employeeId: string;
  name: string;
  designation: string;
  level: 'State Directorate' | 'Divisional' | 'District' | 'Block / Veterinary Hospital';
  officeLocation: string;
  district: string;
  email: string;
  mobile: string;
  status: 'Active' | 'On Leave' | 'Transferred';
  postingDate: string;
  sanctionedPost: string;
}

// FR-2.8 Asset Management
export type AssetCategory = 'Building' | 'Vehicle' | 'Equipment' | 'Medicine/Vaccine Stock';

export interface DepartmentAsset {
  id: string;
  uniqueAssetId: string;
  name: string;
  category: AssetCategory;
  institutionName: string; // e.g. Government Veterinary Hospital, Karnal
  district: string;
  status: 'Operational' | 'Under Maintenance' | 'Requires Repair' | 'Marked for Disposal';
  purchaseDate: string;
  costInLakhs: number;
  amcExpiryDate?: string;
  lastInspectionDate: string;
  stockQuantity?: number;
  minimumThreshold?: number; // for alerts
  unit?: string;
  vehicleRegNo?: string;
  insuranceExpiry?: string;
  fitnessCertExpiry?: string;
  latitude?: number;
  longitude?: number;
}

// FR-2.9 MVU Tracking
export interface MVUUnit {
  id: string;
  mvuNumber: string; // e.g., MVU-1962-HR01
  vehicleRegNo: string;
  assignedVetName: string;
  assignedParavetName: string;
  district: string;
  currentLocationName: string;
  status: 'On Call Duty' | 'In Transit' | 'Available at Hub' | 'Maintenance';
  gpsLat: number;
  gpsLng: number;
  totalCallsToday: number;
  completedCallsToday: number;
  medicineStockStatus: 'Sufficient' | 'Low Stock Warning';
  activeEmergencyCall?: {
    callId: string;
    farmerName: string;
    farmerContact: string;
    location: string;
    animalIssue: string;
    bookingTime: string;
  };
}
