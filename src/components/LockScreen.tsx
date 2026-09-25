import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, KeyRound, Check, AlertCircle } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsSubmitting(true);
    setError(false);

    // Matching the Squarespace password verification
    setTimeout(() => {
      if (password.trim() === 'build-with-agents') {
        onUnlock();
      } else {
        setError(true);
        setShake(true);
        setIsSubmitting(false);
        setTimeout(() => setShake(false), 600);
      }
    }, 250);
  };

  const handleQuickUnlock = () => {
    setPassword('build-with-agents');
    setTimeout(() => {
      onUnlock();
    }, 200);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between items-center px-4 py-8 select-none transition-colors duration-300">
      {/* Top hint banner for reviewers & testers */}
      <div className="w-full max-w-md mx-auto">
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-full px-4 py-1.5 flex items-center justify-between text-xs text-amber-900 shadow-xs">
          <div className="flex items-center gap-1.5 truncate">
            <KeyRound className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="font-medium text-amber-950">Password:</span>
            <code className="bg-amber-100/90 px-1.5 py-0.5 rounded font-mono font-semibold text-amber-900 select-all">
              build-with-agents
            </code>
          </div>
          <button
            type="button"
            onClick={handleQuickUnlock}
            className="ml-2 font-medium text-amber-700 hover:text-amber-950 hover:underline shrink-0 text-[11px] cursor-pointer"
          >
            Autofill & Unlock
          </button>
        </div>
      </div>

      {/* Main Lock Screen Card replicating talktoroh.com Squarespace lock screen */}
      <div className="w-full max-w-sm mx-auto flex flex-col items-center my-auto">
        {/* Circular Lock Icon */}
        <div className="mb-10 relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50 shadow-xs">
            <Lock className="w-8 h-8 text-zinc-700 stroke-[1.75]" />
          </div>
        </div>

        {/* Password Form */}
        <form 
          onSubmit={handleSubmit} 
          className={`w-full relative transition-transform ${shake ? 'animate-shake' : ''}`}
        >
          <div className="relative flex items-center">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              placeholder="Password"
              autoFocus
              className={`w-full px-4 py-3 pr-12 text-center text-sm border rounded-none tracking-wide text-zinc-900 bg-white placeholder-zinc-400 focus:outline-none transition-all duration-200 ${
                error
                  ? 'border-red-400 focus:border-red-500 ring-1 ring-red-400'
                  : 'border-zinc-300 focus:border-zinc-900'
              }`}
            />
            <button
              type="submit"
              disabled={isSubmitting || !password}
              aria-label="Submit"
              className="absolute right-0 top-0 bottom-0 px-3.5 flex items-center justify-center text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Error Message */}
          <div className="min-h-6 mt-2 text-center">
            {error && (
              <p className="text-xs text-red-600 font-medium tracking-wide flex items-center justify-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Incorrect password. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Footer Branding */}
      <div className="text-center text-xs text-zinc-400 tracking-wider font-light">
        <p>SMU Academy &middot; Autonomous AI Agents 2026</p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};
