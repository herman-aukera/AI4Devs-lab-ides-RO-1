import React, { useState, useEffect } from 'react';
import { CandidateResponse } from '../types/candidate';
import { CandidateService } from '../services/candidateService';
import './CandidateList.css';

interface CandidateListProps {
  refreshTrigger: number;
}

const CandidateList: React.FC<CandidateListProps> = ({ refreshTrigger }) => {
  const [candidates, setCandidates] = useState<CandidateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCandidates = async () => {
    try {
      setLoading(true);
      setError('');
      const candidateList = await CandidateService.getAllCandidates();
      setCandidates(candidateList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [refreshTrigger]);

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownloadCV = async (candidateId: number, candidateName: string) => {
    try {
      const response = await fetch(`http://localhost:3010/api/candidates/download-cv/${candidateId}`);
      
      if (!response.ok) {
        throw new Error('Failed to download CV');
      }

      // Create blob and download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `CV_${candidateName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download CV. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="candidate-list-container">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Loading candidates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="candidate-list-container">
        <div className="error-container">
          <span className="error-icon">⚠</span>
          <p>{error}</p>
          <button onClick={fetchCandidates} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="candidate-list-container">
      <div className="list-header">
        <h2>Candidate Database</h2>
        <p>{candidates.length} candidate{candidates.length !== 1 ? 's' : ''} in the system</p>
      </div>

      {candidates.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <h3>No candidates yet</h3>
          <p>Start by adding your first candidate to the system</p>
        </div>
      ) : (
        <div className="candidates-grid">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate-card">
              <div className="candidate-header">
                <div className="candidate-avatar">
                  {candidate.firstName[0]}{candidate.lastName[0]}
                </div>
                <div className="candidate-name">
                  <h3>{candidate.firstName} {candidate.lastName}</h3>
                  <p className="candidate-email">{candidate.email}</p>
                </div>
              </div>

              <div className="candidate-details">
                {candidate.phone && (
                  <div className="detail-item">
                    <span className="detail-label">Phone:</span>
                    <span className="detail-value">{candidate.phone}</span>
                  </div>
                )}

                {candidate.address && (
                  <div className="detail-item">
                    <span className="detail-label">Address:</span>
                    <span className="detail-value">{candidate.address}</span>
                  </div>
                )}

                {candidate.education && (
                  <div className="detail-item">
                    <span className="detail-label">Education:</span>
                    <span className="detail-value">
                      {candidate.education.degree && candidate.education.university
                        ? `${candidate.education.degree} at ${candidate.education.university}`
                        : candidate.education.degree || candidate.education.university || 'Not specified'
                      }
                      {candidate.education.year && ` (${candidate.education.year})`}
                    </span>
                  </div>
                )}

                {candidate.workExperience && (
                  <div className="detail-item">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">
                      {candidate.workExperience.position && candidate.workExperience.company
                        ? `${candidate.workExperience.position} at ${candidate.workExperience.company}`
                        : candidate.workExperience.position || candidate.workExperience.company || 'Not specified'
                      }
                      {candidate.workExperience.years && ` (${candidate.workExperience.years} years)`}
                    </span>
                  </div>
                )}

                <div className="detail-item">
                  <span className="detail-label">CV:</span>
                  <span className="detail-value">
                    {candidate.cvPath ? (
                      <button 
                        className="download-cv-button"
                        onClick={() => handleDownloadCV(candidate.id, `${candidate.firstName}_${candidate.lastName}`)}
                      >
                        📄 Download CV
                      </button>
                    ) : (
                      <span className="no-cv">No CV uploaded</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="candidate-footer">
                <span className="date-added">
                  Added {formatDate(candidate.createdAt)}
                </span>
                <div className="candidate-actions">
                  <button className="action-button edit">Edit</button>
                  <button className="action-button view">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CandidateList;
