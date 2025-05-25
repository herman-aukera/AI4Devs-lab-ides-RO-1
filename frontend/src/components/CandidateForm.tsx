import React, { useState } from 'react';
import { CandidateCreateInput, CandidateFormErrors } from '../types/candidate';
import { validateCandidateForm, hasErrors } from '../utils/validation';
import { CandidateService } from '../services/candidateService';
import FileUpload from './FileUpload';
import './CandidateForm.css';

interface CandidateFormProps {
  onSuccess: () => void;
}

const CandidateForm: React.FC<CandidateFormProps> = ({ onSuccess }) => {
  const [candidate, setCandidate] = useState<CandidateCreateInput>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: { degree: '', university: '', year: undefined },
    workExperience: { company: '', position: '', years: undefined }
  });

  const [errors, setErrors] = useState<CandidateFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [createdCandidateId, setCreatedCandidateId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCandidate(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name as keyof CandidateFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCandidate(prev => ({
      ...prev,
      education: {
        ...prev.education,
        [name]: name === 'year' ? (value ? parseInt(value) : undefined) : value
      }
    }));
  };

  const handleWorkExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCandidate(prev => ({
      ...prev,
      workExperience: {
        ...prev.workExperience,
        [name]: name === 'years' ? (value ? parseInt(value) : undefined) : value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    // Validate form
    const formErrors = validateCandidateForm(candidate);
    setErrors(formErrors);
    
    if (hasErrors(formErrors)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await CandidateService.createCandidate(candidate);
      setSuccessMessage(result.message || 'Candidate added successfully!');
      setCreatedCandidateId(result.candidate.id);
      setShowFileUpload(true);
      
      // Reset form
      setCandidate({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        education: { degree: '', university: '', year: undefined },
        workExperience: { company: '', position: '', years: undefined }
      });
      
      onSuccess();
    } catch (error) {
      setErrors({ general: error instanceof Error ? error.message : 'An error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUploadSuccess = (filePath: string) => {
    setSuccessMessage('Candidate and CV uploaded successfully!');
    // Hide file upload after successful upload
    setTimeout(() => {
      setShowFileUpload(false);
      setCreatedCandidateId(null);
    }, 3000);
  };

  return (
    <div className="candidate-form-container">
      <div className="candidate-form-card">
        <div className="form-header">
          <h2>Add New Candidate</h2>
          <p>Fill in the candidate information to add them to the system</p>
        </div>

        {successMessage && (
          <div className="success-message">
            <span className="success-icon">✓</span>
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="candidate-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Personal Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={candidate.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Enter first name"
                />
                {errors.firstName && <span className="field-error">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={candidate.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Enter last name"
                />
                {errors.lastName && <span className="field-error">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={candidate.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="candidate@example.com"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={candidate.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={candidate.address}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="form-section">
            <h3>Education</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="degree">Degree</label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={candidate.education?.degree || ''}
                  onChange={handleEducationChange}
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className="form-group">
                <label htmlFor="university">University</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={candidate.education?.university || ''}
                  onChange={handleEducationChange}
                  placeholder="e.g., MIT"
                />
              </div>

              <div className="form-group">
                <label htmlFor="year">Graduation Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={candidate.education?.year || ''}
                  onChange={handleEducationChange}
                  placeholder="2023"
                  min="1950"
                  max="2030"
                />
              </div>
            </div>
          </div>

          {/* Work Experience Section */}
          <div className="form-section">
            <h3>Work Experience</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={candidate.workExperience?.company || ''}
                  onChange={handleWorkExperienceChange}
                  placeholder="e.g., Google"
                />
              </div>

              <div className="form-group">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={candidate.workExperience?.position || ''}
                  onChange={handleWorkExperienceChange}
                  placeholder="e.g., Software Engineer"
                />
              </div>

              <div className="form-group">
                <label htmlFor="years">Years of Experience</label>
                <input
                  type="number"
                  id="years"
                  name="years"
                  value={candidate.workExperience?.years || ''}
                  onChange={handleWorkExperienceChange}
                  placeholder="3"
                  min="0"
                  max="50"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Adding Candidate...
                </>
              ) : (
                'Add Candidate'
              )}
            </button>
          </div>
        </form>

        {/* File Upload Section - Shows after successful candidate creation */}
        {showFileUpload && createdCandidateId && (
          <div className="file-upload-section">
            <hr className="section-divider" />
            <FileUpload 
              candidateId={createdCandidateId}
              onUploadSuccess={handleFileUploadSuccess}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateForm;
