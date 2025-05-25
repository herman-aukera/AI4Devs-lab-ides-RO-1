import { CandidateCreateInput, CandidateResponse } from '../types/candidate';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3010/api';

export class CandidateService {
  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  }

  static async getAllCandidates(): Promise<CandidateResponse[]> {
    const response = await fetch(`${API_BASE_URL}/candidates`);
    return this.handleResponse<CandidateResponse[]>(response);
  }

  static async getCandidateById(id: number): Promise<CandidateResponse> {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}`);
    return this.handleResponse<CandidateResponse>(response);
  }

  static async createCandidate(candidateData: CandidateCreateInput): Promise<{ message: string; candidate: CandidateResponse }> {
    const response = await fetch(`${API_BASE_URL}/candidates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(candidateData),
    });
    return this.handleResponse<{ message: string; candidate: CandidateResponse }>(response);
  }

  static async updateCandidate(id: number, candidateData: Partial<CandidateCreateInput>): Promise<{ message: string; candidate: CandidateResponse }> {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(candidateData),
    });
    return this.handleResponse<{ message: string; candidate: CandidateResponse }>(response);
  }

  static async deleteCandidate(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
      method: 'DELETE',
    });
    return this.handleResponse<{ message: string }>(response);
  }
}
