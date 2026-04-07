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
      setError('❌ You have already voted');
      setTimeout(() => navigate('/vote-done'), 2000);
    }

    const fetchCandidates = async () => {
      try {
        const response = await votingService.getCandidates();
        setCandidates(response.data);
      } catch (err) {
        setError('❌ Failed to load candidates');
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
      setError(err.response?.data?.error || '❌ Failed to submit vote');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dark-container min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <span className="text-7xl md:text-8xl">🗳️</span>
            <span className="neon-accent">Cast Your Vote</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium">
            ✨ Select your preferred candidate and submit your vote ✨
          </p>
          <p className="text-sm text-slate-500 mt-3">Remember: You can only vote once!</p>
        </div>

        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="dark-card group hover:shadow-neon hover:border-cyan-400/50 transition-all duration-300 hover:-translate-y-3 overflow-hidden cursor-pointer"
              onClick={() => handleVoteClick(candidate.id)}
            >
              {/* Candidate Symbol */}
              <div className="text-center mb-8 transform group-hover:scale-125 transition-transform duration-300">
                <div className="text-8xl md:text-9xl filter group-hover:drop-shadow-lg">
                  {candidate.symbol || '🎭'}
                </div>
              </div>

              {/* Candidate Info */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-3 group-hover:neon-accent transition-colors">
                  {candidate.name}
                </h3>
                <div className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                  <p className="text-cyan-300 font-bold text-lg">🏛️ {candidate.party}</p>
                </div>
              </div>

              {/* Vote Button */}
              <button
                onClick={() => handleVoteClick(candidate.id)}
                className="dark-btn w-full text-slate-900 font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-neon hover:shadow-neon-lg"
              >
                ✅ Vote for {candidate.name}
              </button>

              {/* Selection Indicator */}
              {selectedCandidateId === candidate.id && (
                <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl pointer-events-none">
                  <div className="absolute top-4 right-4 text-2xl animate-pulse">✨</div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="dark-card text-center">
          <p className="text-slate-300">
            🎯 You're selecting one of <span className="text-cyan-400 font-bold text-lg">{candidates.length}</span> candidates
          </p>
        </div>

        {/* Confirmation Modal */}
        <ConfirmModal
          isOpen={showConfirm}
          title="⚠️ Confirm Your Vote"
          message={`Are you sure you want to vote for ${
            candidates.find((c) => c.id === selectedCandidateId)?.name
          }? ✏️ Remember: You can only vote ONCE and cannot change your vote later.`}
          onConfirm={handleConfirmVote}
          onCancel={() => setShowConfirm(false)}
          confirmText="✅ Yes, Vote"
          cancelText="❌ Cancel"
        />
      </div>
    </div>
  );
};

export default VotingPage;
