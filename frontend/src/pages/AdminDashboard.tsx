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
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCandidate.name || !newCandidate.party) {
      setError('Name and Party are required');
      return;
    }

    try {
      await adminService.addCandidate(newCandidate);
      setSuccess('Candidate added successfully');
      setNewCandidate({ name: '', party: '', symbol: '' });
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add candidate');
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
      setSuccess('Candidate deleted successfully');
      setShowDeleteConfirm(false);
      setDeleteCandidate(null);
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete candidate');
    }
  };

  const handleStartElection = async () => {
    try {
      await adminService.startElection();
      setSuccess('Election started');
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to start election');
    }
  };

  const handleStopElection = async () => {
    try {
      await adminService.stopElection();
      setSuccess('Election stopped');
      fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to stop election');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="neomorph-container min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-text mb-3 flex items-center justify-center gap-3">
            <span className="text-6xl neomorph-badge p-3 rounded-2xl">👨‍💼</span> Admin Dashboard
          </h1>
          <p className="text-dark text-lg">Manage election, candidates, and monitoring</p>
        </div>

        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}
        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Election Control Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Election Status Card */}
          <div className={`neomorph-card transform transition-all duration-300 hover:scale-105 ${
            electionStatus.is_active ? 'bg-gradient-to-br from-green-200 to-emerald-200' : 'bg-gradient-to-br from-red-200 to-rose-200'
          }`}>
            <div className="text-center">
              <p className="text-sm text-dark uppercase tracking-wide font-semibold mb-2">Election Status</p>
              <p className="text-6xl mb-4">{electionStatus.is_active ? '🟢' : '🔴'}</p>
              <p className="text-2xl font-bold text-text mb-6">{electionStatus.is_active ? 'LIVE' : 'CLOSED'}</p>

              <div className="space-y-3">
                <button
                  onClick={handleStartElection}
                  disabled={electionStatus.is_active}
                  className={`neomorph-btn w-full font-bold text-lg transition-all ${
                    electionStatus.is_active
                      ? 'opacity-50 cursor-not-allowed bg-gray-300'
                      : 'bg-gradient-to-br from-emerald-200 to-teal-200 text-text hover:text-accent transform hover:scale-105'
                  }`}
                >
                  Start Election
                </button>
                <button
                  onClick={handleStopElection}
                  disabled={!electionStatus.is_active}
                  className={`neomorph-btn w-full font-bold text-lg transition-all ${
                    !electionStatus.is_active
                      ? 'opacity-50 cursor-not-allowed bg-gray-300'
                      : 'bg-gradient-to-br from-rose-200 to-pink-200 text-text hover:text-accent transform hover:scale-105'
                  }`}
                >
                  Stop Election
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="neomorph-card p-8">
            <h3 className="text-3xl font-bold text-text mb-8">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-text text-sm uppercase font-semibold tracking-wide text-dark mb-2">Total Candidates</p>
                <p className="text-5xl font-bold text-accent">{candidates.length}</p>
              </div>
              <div className="text-center">
                <p className="text-text text-sm uppercase font-semibold tracking-wide text-dark mb-2">Status</p>
                <p className={`text-2xl font-bold ${
                  electionStatus.is_active ? 'text-green-600' : 'text-red-600'
                }`}>
                  {electionStatus.status}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Candidate Form */}
        <div className="neomorph-card mb-12">
          <h3 className="text-3xl font-bold text-text mb-8 flex items-center gap-3">
            <span className="text-4xl">➕</span> Add New Candidate
          </h3>

          <form onSubmit={handleAddCandidate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-text font-semibold mb-3 text-sm uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  className="neomorph-input text-text"
                  placeholder="Candidate name"
                  required
                />
              </div>

              <div>
                <label className="block text-text font-semibold mb-3 text-sm uppercase tracking-wide">Party</label>
                <input
                  type="text"
                  value={newCandidate.party}
                  onChange={(e) => setNewCandidate({ ...newCandidate, party: e.target.value })}
                  className="neomorph-input text-text"
                  placeholder="Party name"
                  required
                />
              </div>

              <div>
                <label className="block text-text font-semibold mb-3 text-sm uppercase tracking-wide">Symbol</label>
                <input
                  type="text"
                  value={newCandidate.symbol}
                  onChange={(e) => setNewCandidate({ ...newCandidate, symbol: e.target.value })}
                  className="neomorph-input text-text"
                  placeholder="e.g., 🎭"
                />
              </div>
            </div>

            <button
              type="submit"
              className="neomorph-btn w-full text-text hover:text-accent font-bold text-lg bg-gradient-to-br from-blue-200 to-cyan-200 transform hover:scale-105 transition-all"
            >
              Add Candidate
            </button>
          </form>
        </div>

        {/* Candidates List */}
        <div className="neomorph-card mt-12">
          <h3 className="text-3xl font-bold text-text mb-8 flex items-center gap-3">
            <span className="text-4xl">🗳️</span> Candidates
          </h3>
          
          {candidates.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No candidates added yet</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{candidate.symbol || '🎭'}</div>
                    <h4 className="text-xl font-bold text-gray-800">{candidate.name}</h4>
                    <p className="text-gray-600">{candidate.party}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteClick(candidate)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={showDeleteConfirm}
          title="Delete Candidate"
          message={`Are you sure you want to delete ${deleteCandidate?.name}? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
          confirmText="Delete"
          cancelText="Cancel"
          isDangerous={true}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
