import React, { useEffect, useState } from 'react';
import { resultsService } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

interface Result {
  id: number;
  name: string;
  party: string;
  symbol: string;
  votes: number;
}

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [winner, setWinner] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await resultsService.getResults();
        setResults(response.data.results || []);
        setWinner(response.data.winner || null);
      } catch (err) {
        setError('❌ Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
    const interval = setInterval(fetchResults, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  const totalVotes = results.reduce((sum, r) => sum + r.votes, 0);

  return (
    <div className="dark-container min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 flex items-center justify-center gap-4">
            <span className="text-8xl">📊</span>
            <span className="neon-accent">Election Results</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium">Real-time voting results - Updated every 5 seconds 🔄</p>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {/* Winner Announcement */}
        {winner && (
          <div className="dark-card bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-2 border-yellow-400/50 mb-16 transform animate-pulse shadow-neon-lg">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 mb-8 shadow-neon-lg">
                <span className="text-7xl">🏆</span>
              </div>
              <h2 className="text-5xl font-bold text-yellow-300 mb-4 neon-accent">{winner.name}</h2>
              <p className="text-2xl text-yellow-200 font-bold mb-2">🎉 CURRENT LEADER 🎉</p>
              <p className="text-xl text-yellow-100 font-semibold">
                {winner.party} • <span className="text-3xl text-yellow-300">{winner.votes} votes</span>
              </p>
            </div>
          </div>
        )}

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {results.map((result) => {
            const percentage = totalVotes > 0 ? ((result.votes / totalVotes) * 100).toFixed(1) : '0';

            return (
              <div
                key={result.id}
                className={`dark-card transition-all duration-300 hover:-translate-y-2 ${
                  winner?.id === result.id
                    ? 'bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border-yellow-400/50 ring-2 ring-yellow-400'
                    : 'hover:border-cyan-400/50'
                }`}
              >
                {/* Candidate Info */}
                <div className="text-center mb-8">
                  <div className="text-8xl mb-6 filter drop-shadow-lg">{result.symbol || '🎭'}</div>
                  <h3 className="text-3xl font-bold text-white mb-3">{result.name}</h3>
                  <div className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                    <p className="text-cyan-300 font-bold text-lg">🏛️ {result.party}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="h-4 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 shadow-neon flex items-center justify-center text-white font-bold text-xs"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 10 && `${percentage}%`}
                    </div>
                  </div>
                </div>

                {/* Vote Stats */}
                <div className="text-center">
                  <p className="text-5xl font-bold text-cyan-400 mb-2">{result.votes}</p>
                  <p className="text-slate-300 font-semibold text-lg">votes • <span className="text-cyan-300">{percentage}%</span></p>
                </div>

                {/* Winner Badge */}
                {winner?.id === result.id && (
                  <div className="mt-6 text-center text-yellow-300 font-bold text-xl animate-pulse">
                    ⭐ LEADING ⭐
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats Footer */}
        <div className="dark-card border-cyan-400/50">
          <h3 className="text-3xl font-bold text-white mb-10 text-center">📈 Election Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-lg p-6 border border-cyan-500/30">
              <p className="text-5xl font-bold text-cyan-400 mb-2">{totalVotes}</p>
              <p className="text-slate-300 font-semibold">Total Votes</p>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-lg p-6 border border-purple-500/30">
              <p className="text-5xl font-bold text-purple-400 mb-2">{results.length}</p>
              <p className="text-slate-300 font-semibold">Candidates</p>
            </div>
            <div className="text-center bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-lg p-6 border border-green-500/30">
              <p className="text-5xl font-bold text-green-400 mb-2">
                {winner ? winner.votes : 0}
              </p>
              <p className="text-slate-300 font-semibold">Leading Votes</p>
            </div>
            <div className="text-center bg-gradient-to-br from-yellow-900/20 to-amber-900/20 rounded-lg p-6 border border-yellow-500/30">
              <p className="text-5xl font-bold text-yellow-400 mb-2">
                {winner ? ((winner.votes / totalVotes) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-slate-300 font-semibold">Leading %</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
