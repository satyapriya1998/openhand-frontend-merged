export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: string;
  department: string;
  designation: string;
  status: 'active' | 'inactive';
  employeeId: string;
  phone?: string;
  joinDate?: string;
}

export interface UserProfile extends User {
  personalInfo: PersonalInfo;
  passportInfo?: PassportInfo;
  otherInfo?: Record<string, any>;
}

export interface PersonalInfo {
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  bloodGroup?: string;
}

export interface PassportInfo {
  passportNumber?: string;
  issuedDate?: string;
  expiryDate?: string;
  issuedPlace?: string;
}
