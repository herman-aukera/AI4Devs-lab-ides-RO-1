export interface Education {
  degree?: string;
  university?: string;
  year?: number;
  [key: string]: any;
}

export interface WorkExperience {
  company?: string;
  position?: string;
  years?: number;
  startDate?: string;
  endDate?: string;
  [key: string]: any;
}

export interface CandidateCreateInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: Education;
  workExperience?: WorkExperience;
  cvPath?: string;
}

export interface CandidateResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: Education;
  workExperience?: WorkExperience;
  cvPath?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CandidateFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  general?: string;
}
