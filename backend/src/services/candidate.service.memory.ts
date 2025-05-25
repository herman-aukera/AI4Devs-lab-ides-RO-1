import { CandidateCreateInput, CandidateUpdateInput, CandidateResponse } from '../types/candidate.types';

// Temporary in-memory storage for candidates
let candidates: CandidateResponse[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    education: {
      degree: 'Computer Science',
      university: 'Tech University',
      year: 2020
    },
    workExperience: {
      company: 'Tech Corp',
      position: 'Software Developer',
      years: 2
    },
    cvPath: undefined,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
];

let nextId = 2;

export const createCandidate = async (candidateData: CandidateCreateInput): Promise<CandidateResponse> => {
  const newCandidate: CandidateResponse = {
    id: nextId++,
    firstName: candidateData.firstName,
    lastName: candidateData.lastName,
    email: candidateData.email,
    phone: candidateData.phone || undefined,
    address: candidateData.address || undefined,
    education: candidateData.education || undefined,
    workExperience: candidateData.workExperience || undefined,
    cvPath: candidateData.cvPath || undefined,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  candidates.push(newCandidate);
  return newCandidate;
};

export const getAllCandidates = async (): Promise<CandidateResponse[]> => {
  return candidates.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getCandidateById = async (id: number): Promise<CandidateResponse | null> => {
  return candidates.find(c => c.id === id) || null;
};

export const updateCandidate = async (id: number, candidateData: CandidateUpdateInput): Promise<CandidateResponse | null> => {
  const index = candidates.findIndex(c => c.id === id);
  if (index === -1) return null;
  
  candidates[index] = {
    ...candidates[index],
    ...candidateData,
    updatedAt: new Date()
  };
  
  return candidates[index];
};

export const deleteCandidate = async (id: number): Promise<boolean> => {
  const index = candidates.findIndex(c => c.id === id);
  if (index === -1) return false;
  
  candidates.splice(index, 1);
  return true;
};
