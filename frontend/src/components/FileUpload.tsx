import React, { useState } from 'react';
import { CandidateService } from '../services/candidateService';
import './FileUpload.css';

interface FileUploadProps {
  candidateId: number;
  onUploadSuccess: (filePath: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ candidateId, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
    setError('');
    setSuccess('');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setError('');
        setSuccess('');
      } else {
        setError('Only PDF files are allowed');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    if (selectedFile.type !== 'application/pdf') {
      setError('Only PDF files are allowed');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('cv', selectedFile);

      const response = await fetch(`http://localhost:3010/api/candidates/upload-cv/${candidateId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      setSuccess('CV uploaded successfully!');
      onUploadSuccess(result.cvPath);
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('cv-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <h4>Upload CV</h4>
      
      <div className="upload-area"
           onDrop={handleDrop}
           onDragOver={handleDragOver}
           onDragEnter={handleDragEnter}>
        <input
          id="cv-upload"
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="file-input"
        />
        
        <div className="file-info">
          {selectedFile ? (
            <div className="selected-file">
              <span className="file-icon">📄</span>
              <div className="file-details">
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="upload-placeholder">
              <span className="upload-icon">📁</span>
              <p>Drag & drop a PDF file here or click to select</p>
              <p className="file-hint">(max 5MB)</p>
            </div>
          )}
        </div>

        {selectedFile && (
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="upload-button"
          >
            {uploading ? (
              <>
                <span className="spinner-small"></span>
                Uploading...
              </>
            ) : (
              'Upload CV'
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="upload-error">
          <span className="error-icon">⚠</span>
          {error}
        </div>
      )}

      {success && (
        <div className="upload-success">
          <span className="success-icon">✓</span>
          {success}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
