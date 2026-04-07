import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

interface VerificationResult {
  verified: boolean;
  candidate_name?: string;
  candidate_party?: string;
  candidate_symbol?: string;
  voted_at?: string;
  token?: string;
  message?: string;
  error?: string;
}

export default function VerifyVotePage() {
  const navigate = useNavigate();
  const [verificationToken, setVerificationToken] = useState('');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{ type: 'error' | 'success' | 'info'; text: string } | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationToken.trim()) {
      setAlertMessage({ type: 'error', text: '❌ Please enter your verification token' });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/voting/verify?token=${verificationToken}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
        setAlertMessage({ type: 'success', text: '✅ Vote verified successfully!' });
      } else {
        setAlertMessage({ type: 'error', text: `❌ ${data.error || 'Verification failed'}` });
        setResult(null);
      }
    } catch (error) {
      setAlertMessage({ type: 'error', text: '❌ Unable to verify vote. Please try again.' });
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(verificationToken);
    setAlertMessage({ type: 'info', text: '📋 Token copied to clipboard' });
  };

  return (
    <div className="min-h-screen dark-container pt-20">
      <div className="max-w-2xl mx-auto px-4">
        {alertMessage && (
          <Alert
            type={alertMessage.type}
            message={alertMessage.text}
            onClose={() => setAlertMessage(null)}
          />
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-cyan-400">🔍</span> Verify Your Vote
          </h1>
          <p className="text-slate-400 text-lg">
            Use your verification token to confirm your vote was recorded correctly
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Verification Form */}
          <div className="dark-card p-8 h-fit">
            <h2 className="text-2xl font-bold text-white mb-6">🔐 Enter Token</h2>
            
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-slate-300 font-semibold mb-2">
                  Verification Token
                </label>
                <input
                  type="text"
                  value={verificationToken}
                  onChange={(e) => setVerificationToken(e.target.value)}
                  placeholder="Paste your verification token here"
                  className="dark-input w-full"
                  disabled={loading}
                />
                <p className="text-xs text-slate-400 mt-2">
                  💡 You received this token after voting. It's a unique identifier for your vote.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !verificationToken.trim()}
                className="dark-btn w-full py-3 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
              >
                {loading ? '⏳ Verifying...' : '✨ Verify Vote'}
              </button>

              {verificationToken && (
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition text-sm"
                >
                  📋 Copy Token
                </button>
              )}
            </form>

            {/* FAQ Section */}
            <div className="mt-8 pt-8 border-t border-slate-700">
              <h3 className="text-white font-semibold mb-4">❓ FAQ</h3>
              <div className="space-y-4 text-sm text-slate-400">
                <div>
                  <p className="text-white font-semibold mb-1">Where do I find my token?</p>
                  <p>You received it on the confirmation screen after voting.</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Is my token confidential?</p>
                  <p>Yes! Keep it private. Only use it to verify your own vote.</p>
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Can I verify multiple times?</p>
                  <p>Yes, you can verify your vote as many times as you need.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Result */}
          <div>
            {result && result.verified ? (
              <div className="dark-card p-8 border-2 border-emerald-500 bg-gradient-to-br from-emerald-950 to-slate-900">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-3xl font-bold text-emerald-400 mb-2">Vote Verified!</h2>
                  <p className="text-slate-300">Your vote has been successfully recorded</p>
                </div>

                <div className="space-y-4 bg-slate-800 bg-opacity-50 p-6 rounded-lg">
                  <div className="border-l-4 border-emerald-400 pl-4">
                    <p className="text-slate-400 text-sm">Candidate</p>
                    <p className="text-2xl font-bold text-white">
                      {result.candidate_symbol} {result.candidate_name}
                    </p>
                  </div>

                  <div className="border-l-4 border-cyan-400 pl-4">
                    <p className="text-slate-400 text-sm">Party</p>
                    <p className="text-xl font-semibold text-cyan-400">{result.candidate_party}</p>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-4">
                    <p className="text-slate-400 text-sm">Voted At</p>
                    <p className="text-white font-semibold">
                      {result.voted_at
                        ? new Date(result.voted_at).toLocaleString()
                        : 'Unknown'}
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-4">
                    <p className="text-slate-400 text-sm mb-1">Token</p>
                    <p className="text-purple-400 font-mono text-xs break-all bg-slate-900 p-2 rounded">
                      {result.token}
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-emerald-900 bg-opacity-30 border border-emerald-500 rounded-lg">
                  <p className="text-emerald-300 text-sm font-semibold">
                    🔒 Your vote is secure, encrypted, and counted. Thank you for participating!
                  </p>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => navigate('/results')}
                    className="dark-btn flex-1 py-3 font-semibold hover:opacity-90 transition"
                  >
                    📊 View Results
                  </button>
                  <button
                    onClick={() => navigate('/')}
                    className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-semibold"
                  >
                    🏠 Home
                  </button>
                </div>
              </div>
            ) : (
              <div className="dark-card p-8 text-center">
                <div className="text-6xl mb-4">🔎</div>
                <p className="text-slate-400">
                  Enter your verification token above to confirm your vote was counted correctly
                </p>
                <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg text-blue-300 text-sm">
                  <p>💡 Each vote gets a unique verification token for transparency and security.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How It Works section */}
        <div className="mt-12 dark-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">⚙️ How Verification Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">1️⃣</div>
              <h3 className="font-semibold text-white mb-2">Cast Your Vote</h3>
              <p className="text-slate-400 text-sm">
                Select your candidate and confirm your vote
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">2️⃣</div>
              <h3 className="font-semibold text-white mb-2">Get Your Token</h3>
              <p className="text-slate-400 text-sm">
                Receive a unique verification token immediately
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">3️⃣</div>
              <h3 className="font-semibold text-white mb-2">Verify Anytime</h3>
              <p className="text-slate-400 text-sm">
                Use your token to verify your vote was recorded correctly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
