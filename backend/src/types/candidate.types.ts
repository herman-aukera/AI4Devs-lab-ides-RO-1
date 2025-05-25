export interface CandidateCreateInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: any; // You might want to define a more specific type later
  workExperience?: any; // You might want to define a more specific type later
  cvPath?: string;
}

export interface CandidateUpdateInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  education?: any;
  workExperience?: any;
  cvPath?: string;
}

export interface CandidateResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: any;
  workExperience?: any;
  cvPath?: string;
  createdAt: Date;
  updatedAt: Date;
}
