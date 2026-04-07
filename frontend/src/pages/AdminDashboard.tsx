import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { adminService, votingService, resultsService } from '../services/api';
import Alert from '../components/Alert';
import ConfirmModal from '../components/ConfirmModal';
import LoadingSpinner from '../components/LoadingSpinner';

interface Candidate {
  id: number;
  name: string;
  party: string;
  symbol: string;
  votes: number;
}

interface ElectionStatus {
  is_active: boolean;
  status: string;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [electionStatus, setElectionStatus] = useState<ElectionStatus>({ is_active: false, status: 'Closed' });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Add candidate form
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    party: '',
    symbol: '',
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
    }

    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [candidatesRes] = await Promise.all([
        votingService.getCandidates(),
        resultsService.getResults(),
      ]);

      setCandidates(candidatesRes.data);

      // Get election status
      const statusResponse = await fetch('http://localhost:5000/api/election/status');
      const statusData: ElectionStatus = await statusResponse.json();
      setElectionStatus(statusData);
    } catch (err) {
      setError('❌ Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCandidate.name || !newCandidate.party) {
      setError('❌ Name and Party are required');
      return;
    }

    try {
      await adminService.addCandidate(newCandidate);
      setSuccess('✅ Candidate added successfully');
      setNewCandidate({ name: '', party: '', symbol: '' });
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || '❌ Failed to add candidate');
    }
  };

  const handleDeleteClick = (candidate: Candidate) => {
    setDeleteCandidate(candidate);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteCandidate) return;

    try {
      await adminService.deleteCandidate(deleteCandidate.id);
      setSuccess('✅ Candidate deleted successfully');
      setShowDeleteConfirm(false);
      setDeleteCandidate(null);
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || '❌ Failed to delete candidate');
    }
  };

  const handleStartElection = async () => {
    try {
      await adminService.startElection();
      setSuccess('✅ Election started');
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || '❌ Failed to start election');
    }
  };

  const handleStopElection = async () => {
    try {
      await adminService.stopElection();
      setSuccess('✅ Election stopped');
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || '❌ Failed to stop election');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dark-container min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <span className="inline-flex items-center justify-center w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-neon">
              👑
            </span>
            <span className="neon-accent">Admin Panel</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium">Manage election, candidates, and monitoring 🛠️</p>
        </div>

        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Election Control Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Election Status Card */}
          <div className={`dark-card transform transition-all duration-300 hover:scale-105 ${
            electionStatus.is_active ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50' : 'bg-gradient-to-br from-red-900/30 to-rose-900/30 border-red-500/50'
          } border`}>
            <div className="text-center py-8">
              <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-4">⚡ Election Status</p>
              <p className="text-8xl mb-6 animate-pulse">{electionStatus.is_active ? '🟢' : '🔴'}</p>
              <p className={`text-4xl font-bold mb-8 ${electionStatus.is_active ? 'text-green-300 neon-accent' : 'text-red-300'}`}>
                {electionStatus.is_active ? '🔴 LIVE' : '⏸️ CLOSED'}
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleStartElection}
                  disabled={electionStatus.is_active}
                  className={`dark-btn w-full font-bold text-lg transition-all shadow-neon ${
                    electionStatus.is_active
                      ? 'opacity-40 cursor-not-allowed'
                      : 'text-slate-900 hover:shadow-neon-lg transform hover:scale-105'
                  }`}
                >
                  ▶️ Start Election
                </button>
                <button
                  onClick={handleStopElection}
                  disabled={!electionStatus.is_active}
                  className={`w-full font-bold text-lg transition-all px-6 py-3 rounded-xl ${
                    !electionStatus.is_active
                      ? 'opacity-40 cursor-not-allowed bg-slate-700'
                      : 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  ⏹️ Stop Election
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="dark-card p-8 border-cyan-400/50">
            <h3 className="text-3xl font-bold text-white mb-10">📊 Quick Stats</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-lg p-6 border border-cyan-500/30">
                <p className="text-5xl font-bold text-cyan-400 mb-2">{candidates.length}</p>
                <p className="text-slate-300 text-sm font-semibold uppercase">Total Candidates</p>
              </div>
              <div className="text-center bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg p-6 border border-purple-500/30">
                <p className={`text-5xl font-bold mb-2 ${
                  electionStatus.is_active ? 'text-green-400' : 'text-red-400'
                }`}>
                  {electionStatus.is_active ? '✅' : '❌'}
                </p>
                <p className="text-slate-300 text-sm font-semibold uppercase">{electionStatus.status}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Candidate Form */}
        <div className="dark-card mb-16 border-cyan-400/50">
          <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
            <span className="text-4xl">➕</span> Add New Candidate
          </h3>

          <form onSubmit={handleAddCandidate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">👤 Candidate Name</label>
                <input
                  type="text"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  className="dark-input"
                  placeholder="Enter candidate name"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">🏛️ Party Name</label>
                <input
                  type="text"
                  value={newCandidate.party}
                  onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
                  className="dark-input"
                  placeholder="Enter party name"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">😊 Symbol Emoji</label>
                <input
                  type="text"
                  value={newCandidate.symbol}
                  onChange={(e) => setNewCandidate({ ...newCandidate, symbol: e.target.value })}
                  className="dark-input"
                  placeholder="e.g., 🎭 🌟 ⚡"
                  maxLength={2}
                />
              </div>
            </div>

            <button
              type="submit"
              className="dark-btn w-full text-slate-900 font-bold text-lg transform hover:scale-105 transition-all shadow-neon hover:shadow-neon-lg"
            >
              ✅ Add Candidate
            </button>
          </form>
        </div>

        {/* Candidates List */}
        <div className="dark-card mt-16 border-cyan-400/50">
          <h3 className="text-3xl font-bold text-white mb-10 flex items-center gap-3">
            <span className="text-4xl">🗳️</span> Registered Candidates
          </h3>
          
          {candidates.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl text-slate-400 mb-4">📭</p>
              <p className="text-slate-400 text-lg">No candidates added yet. Create one above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="dark-card border-cyan-400/30 hover:border-cyan-400/60 transition-all hover:-translate-y-2">
                  <div className="text-center mb-8">
                    <div className="text-8xl mb-4">{candidate.symbol || '🎭'}</div>
                    <h4 className="text-2xl font-bold text-white mb-2">{candidate.name}</h4>
                    <div className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                      <p className="text-cyan-300 font-bold">🏛️ {candidate.party}</p>
                    </div>
                    {candidate.votes > 0 && (
                      <p className="text-green-300 font-bold mt-4 text-lg">
                        ✅ {candidate.votes} <span className="text-sm">votes</span>
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteClick(candidate)}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    🗑️ Delete Candidate
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={showDeleteConfirm}
          title="⚠️ Delete Candidate"
          message={`Are you sure you want to delete ${deleteCandidate?.name}? This action cannot be undone. All votes for this candidate will be lost.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmText="🗑️ Delete"
          cancelText="❌ Cancel"
          isDangerous={true}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
