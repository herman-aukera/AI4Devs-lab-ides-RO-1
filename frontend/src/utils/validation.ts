import { CandidateCreateInput, CandidateFormErrors } from '../types/candidate';

export const validateCandidateForm = (candidate: CandidateCreateInput): CandidateFormErrors => {
  const errors: CandidateFormErrors = {};

  // Required fields validation
  if (!candidate.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!candidate.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!candidate.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(candidate.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Optional field validation
  if (candidate.phone && !isValidPhone(candidate.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  return errors;
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Simple phone validation - adjust based on requirements
  const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-()]/g, ''));
};

export const hasErrors = (errors: CandidateFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
