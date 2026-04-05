import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { votingService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Alert from '../components/Alert';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSpinner from '../components/LoadingSpinner';

interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
}

const VotingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (user?.has_voted) {
      setError('You have already voted');
      setTimeout(() => navigate('/vote-done'), 2000);
    }

    const fetchCandidates = async () => {
      try {
        const response = await votingService.getCandidates();
        setCandidates(response.data);
      } catch (err) {
        setError('Failed to load candidates');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [user, navigate]);

  const handleVoteClick = (candidateId: number) => {
    setSelectedCandidateId(candidateId);
    setShowConfirm(true);
  };

  const handleConfirmVote = async () => {
    if (!selectedCandidateId) return;

    try {
      setLoading(true);
      await votingService.submitVote(selectedCandidateId);
      setSuccess('✅ Vote submitted successfully!');
      setShowConfirm(false);

      setTimeout(() => {
        navigate('/vote-done');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to submit vote');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="neomorph-container min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-text mb-3 flex items-center justify-center gap-3">
            <span className="text-6xl">🗳️</span> Cast Your Vote
          </h1>
          <p className="text-dark text-lg">Select your preferred candidate and submit your vote</p>
        </div>

        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="neomorph-card group hover:shadow-lg transition-all duration-300 hover:-translate-y-3 overflow-hidden"
            >
              {/* Candidate Symbol */}
              <div className="text-center mb-6 transform group-hover:scale-110 transition-transform">
                <div className="text-7xl mb-4">{candidate.symbol || '🎭'}</div>
              </div>

              {/* Candidate Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-text mb-2">{candidate.name}</h3>
                <p className="text-dark font-semibold text-lg">{candidate.party}</p>
              </div>

              {/* Vote Button */}
              <button
                onClick={() => handleVoteClick(candidate.id)}
                className="neomorph-btn w-full text-text hover:text-accent font-bold text-lg transform hover:scale-105 transition-all duration-300 bg-gradient-to-br from-green-200 to-emerald-200 mt-4"
              >
                Vote for {candidate.name}
              </button>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        <ConfirmModal
          isOpen={showConfirm}
          title="Confirm Your Vote"
          message={`Are you sure you want to vote for ${
            candidates.find((c) => c.id === selectedCandidateId)?.name
          }? You can only vote once.`}
          onConfirm={handleConfirmVote}
          onCancel={() => setShowConfirm(false)}
          confirmText="Yes, Vote"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default VotingPage;
