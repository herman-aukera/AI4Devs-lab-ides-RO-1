import { Request, Response, NextFunction } from 'express';
import * as candidateService from '../services/candidate.service.memory';
import { CandidateCreateInput, CandidateUpdateInput } from '../types/candidate.types';

export const addCandidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Basic validation (more robust validation should be added)
    const { firstName, lastName, email }: CandidateCreateInput = req.body;
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ 
        message: 'First name, last name, and email are required',
        error: 'MISSING_REQUIRED_FIELDS'
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please provide a valid email address',
        error: 'INVALID_EMAIL_FORMAT'
      });
    }

    // Check for email uniqueness
    const existingCandidates = await candidateService.getAllCandidates();
    const emailExists = existingCandidates.some(c => c.email === email);
    if (emailExists) {
      return res.status(409).json({ 
        message: 'Candidate with this email already exists.',
        error: 'EMAIL_ALREADY_EXISTS'
      });
    }

    const candidate = await candidateService.createCandidate(req.body as CandidateCreateInput);
    res.status(201).json({ 
      message: 'Candidate added successfully', 
      candidate 
    });
  } catch (error: any) {
    next(error);
  }
};

export const getCandidates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const candidates = await candidateService.getAllCandidates();
    res.json(candidates);
  } catch (error) {
    next(error);
  }
};

export const getCandidateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        message: 'Invalid candidate ID',
        error: 'INVALID_ID'
      });
    }

    const candidate = await candidateService.getCandidateById(id);
    if (!candidate) {
      return res.status(404).json({ 
        message: 'Candidate not found',
        error: 'CANDIDATE_NOT_FOUND'
      });
    }

    res.json(candidate);
  } catch (error) {
    next(error);
  }
};

export const updateCandidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        message: 'Invalid candidate ID',
        error: 'INVALID_ID'
      });
    }

    // Check if candidate exists
    const existingCandidate = await candidateService.getCandidateById(id);
    if (!existingCandidate) {
      return res.status(404).json({ 
        message: 'Candidate not found',
        error: 'CANDIDATE_NOT_FOUND'
      });
    }

    // Email format validation if email is being updated
    if (req.body.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(req.body.email)) {
        return res.status(400).json({ 
          message: 'Please provide a valid email address',
          error: 'INVALID_EMAIL_FORMAT'
        });
      }

      // Check for email uniqueness (excluding current candidate)
      const allCandidates = await candidateService.getAllCandidates();
      const emailExists = allCandidates.some(c => c.email === req.body.email && c.id !== id);
      if (emailExists) {
        return res.status(409).json({ 
          message: 'Candidate with this email already exists.',
          error: 'EMAIL_ALREADY_EXISTS'
        });
      }
    }

    const candidate = await candidateService.updateCandidate(id, req.body as CandidateUpdateInput);
    res.json({ 
      message: 'Candidate updated successfully', 
      candidate 
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteCandidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ 
        message: 'Invalid candidate ID',
        error: 'INVALID_ID'
      });
    }

    // Check if candidate exists
    const existingCandidate = await candidateService.getCandidateById(id);
    if (!existingCandidate) {
      return res.status(404).json({ 
        message: 'Candidate not found',
        error: 'CANDIDATE_NOT_FOUND'
      });
    }

    await candidateService.deleteCandidate(id);
    res.json({ 
      message: 'Candidate deleted successfully' 
    });
  } catch (error) {
    next(error);
  }
};
