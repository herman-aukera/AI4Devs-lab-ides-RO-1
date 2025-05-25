import React, { useState } from 'react';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'form' | 'list'>('form');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCandidateAdded = () => {
    setRefreshTrigger((prev: number) => prev + 1);
    setActiveTab('list');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>ATS - Applicant Tracking System</h1>
          <nav className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'form' ? 'active' : ''}`}
              onClick={() => setActiveTab('form')}
            >
              Add Candidate
            </button>
            <button 
              className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              View Candidates
            </button>
          </nav>
        </div>
      </header>
      
      <main className="App-main">
        {activeTab === 'form' ? (
          <CandidateForm onSuccess={handleCandidateAdded} />
        ) : (
          <CandidateList refreshTrigger={refreshTrigger} />
        )}
      </main>
    </div>
  );
}

export default App;
