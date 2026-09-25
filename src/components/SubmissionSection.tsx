import React, { useState, useEffect } from 'react';
import { UploadCloud, CheckCircle2, FileJson, AlertCircle, Sparkles, ExternalLink, Trash2, Download, Copy, Check } from 'lucide-react';

interface Submission {
  id: string;
  teamName: string;
  members: string;
  appUrl: string;
  githubUrl: string;
  submittedAt: string;
  rawJson?: string;
}

export const SubmissionSection: React.FC = () => {
  // Form fields
  const [teamMembers, setTeamMembers] = useState('');
  const [teamName, setTeamName] = useState('');
  const [appUrl, setAppUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  
  // States
  const [isDragging, setIsDragging] = useState(false);
  const [dropFeedback, setDropFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [submittedList, setSubmittedList] = useState<Submission[]>([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load submissions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('smu_ai_agents_submissions');
      if (saved) {
        setSubmittedList(JSON.parse(saved));
      } else {
        // Pre-populate with a showcase sample submission
        const initialSample: Submission = {
          id: 'demo-sample-1',
          teamName: 'Agentic Architects Alpha',
          members: 'Marcus Loy, Keziah Tan, Stephen Lee',
          appUrl: 'https://ais-dev-pvkptlk3234akpelxjglhk-211017759403.asia-southeast1.run.app',
          githubUrl: 'https://github.com/talktoroh/autonomous-ai-agents-2026',
          submittedAt: '2026-09-25 09:30 AM',
        };
        setSubmittedList([initialSample]);
      }
    } catch {
      // fallback
    }
  }, []);

  const saveSubmissions = (newList: Submission[]) => {
    setSubmittedList(newList);
    try {
      localStorage.setItem('smu_ai_agents_submissions', JSON.stringify(newList));
    } catch {}
  };

  const handleJsonUpload = (file: File) => {
    if (!file.name.endsWith('.json') && file.type !== 'application/json') {
      setDropFeedback({ type: 'error', message: 'Please upload a valid .json file' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text);

        // Autofill matching fields if present in JSON
        if (parsed.teamName || parsed.team_name || parsed.team) {
          setTeamName(parsed.teamName || parsed.team_name || parsed.team);
        }
        if (parsed.members || parsed.teamMembers || parsed.team_members || parsed.names) {
          const m = parsed.members || parsed.teamMembers || parsed.team_members || parsed.names;
          setTeamMembers(Array.isArray(m) ? m.join(', ') : m);
        }
        if (parsed.appUrl || parsed.app_url || parsed.url || parsed.liveUrl) {
          setAppUrl(parsed.appUrl || parsed.app_url || parsed.url || parsed.liveUrl);
        }
        if (parsed.githubUrl || parsed.github_url || parsed.repo || parsed.github) {
          setGithubUrl(parsed.githubUrl || parsed.github_url || parsed.repo || parsed.github);
        }

        setDropFeedback({
          type: 'success',
          message: `Loaded "${file.name}" successfully! Form fields populated below.`,
        });
      } catch (err) {
        setDropFeedback({
          type: 'error',
          message: 'Failed to parse JSON file. Ensure it is valid JSON syntax.',
        });
      }
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleJsonUpload(e.dataTransfer.files[0]);
    }
  };

  const handleLoadSampleJson = () => {
    const sample = {
      teamName: 'Team Syntropy',
      members: ['David Wong', 'Sarah Lim', 'Eugene Goh'],
      appUrl: 'https://syntropy-agents.vercel.app',
      githubUrl: 'https://github.com/syntropy-ai/autonomous-orchestrator',
      description: 'Multi-agent customer routing system with LangGraph & Supabase Postgres',
    };
    setTeamName(sample.teamName);
    setTeamMembers(sample.members.join(', '));
    setAppUrl(sample.appUrl);
    setGithubUrl(sample.githubUrl);
    setDropFeedback({
      type: 'success',
      message: 'Sample JSON payload loaded into the form fields!',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() && !teamMembers.trim()) return;

    const newSub: Submission = {
      id: 'sub-' + Date.now(),
      teamName: teamName.trim() || 'Untitled Team',
      members: teamMembers.trim() || 'Not specified',
      appUrl: appUrl.trim() || 'https://',
      githubUrl: githubUrl.trim() || 'https://github.com/',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    saveSubmissions([newSub, ...submittedList]);
    setFormSuccess(true);
    setTeamName('');
    setTeamMembers('');
    setAppUrl('');
    setGithubUrl('');
    setTimeout(() => setFormSuccess(false), 4000);
  };

  const handleDeleteSubmission = (id: string) => {
    saveSubmissions(submittedList.filter((s) => s.id !== id));
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submittedList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'smu_ai_agents_submissions.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-8 my-8">
      {/* Drop Zone Box (Corresponding to Day 2 "Drop your JSON file here") */}
      <div className="border border-zinc-200 rounded-lg p-5 bg-zinc-50/60 shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileJson className="w-4 h-4 text-zinc-700" />
            <h4 className="text-sm font-semibold text-zinc-900">
              End-to-End AI Products/Services Submissions Contest
            </h4>
          </div>
          <button
            type="button"
            onClick={handleLoadSampleJson}
            className="text-xs text-zinc-600 hover:text-zinc-950 font-medium flex items-center gap-1 cursor-pointer bg-white px-2 py-1 rounded border border-zinc-200 hover:border-zinc-300 shadow-2xs"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Load Sample JSON</span>
          </button>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
            isDragging
              ? 'border-zinc-900 bg-zinc-100/90 scale-[1.01]'
              : 'border-zinc-300 hover:border-zinc-400 bg-white'
          }`}
        >
          <UploadCloud className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-zinc-800">
            Drop your JSON file here
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            or{' '}
            <label className="text-zinc-900 underline underline-offset-2 cursor-pointer font-medium hover:text-black">
              browse from computer
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleJsonUpload(e.target.files[0]);
                  }
                }}
              />
            </label>
          </p>
        </div>

        {dropFeedback && (
          <div
            className={`mt-3 p-3 rounded text-xs flex items-center gap-2 ${
              dropFeedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {dropFeedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            )}
            <span>{dropFeedback.message}</span>
          </div>
        )}
      </div>

      {/* Squarespace Replicated Form: autonomous_ai_agents_2026_c2 Form 5 */}
      <div id="submission-portal" className="border-t border-zinc-200 pt-8">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-zinc-900">Submission Portal</h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Submit your team's live deployment URL, GitHub repository, and member roster.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          {/* Names of Team Members */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
              Names of Team Members
            </label>
            <input
              type="text"
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              placeholder="e.g. Alice Chen, Bob Lee, Charlie Tan"
              className="w-full px-3.5 py-2 text-sm border border-zinc-300 rounded focus:outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800 transition bg-white"
            />
          </div>

          {/* Name of Your Team */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
              Name of Your Team
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. Agentic Pioneers"
              className="w-full px-3.5 py-2 text-sm border border-zinc-300 rounded focus:outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800 transition bg-white"
            />
          </div>

          {/* App URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
              App URL
            </label>
            <input
              type="url"
              value={appUrl}
              onChange={(e) => setAppUrl(e.target.value)}
              placeholder="https://your-project.vercel.app"
              className="w-full px-3.5 py-2 text-sm border border-zinc-300 rounded focus:outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800 transition bg-white"
            />
          </div>

          {/* Github URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 mb-1">
              Github URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-org/your-repo"
              className="w-full px-3.5 py-2 text-sm border border-zinc-300 rounded focus:outline-none focus:border-zinc-800 focus:ring-1 focus:ring-zinc-800 transition bg-white"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded text-sm font-medium transition cursor-pointer shadow-xs active:scale-[0.99]"
            >
              Submit Application
            </button>
            {formSuccess && (
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Submission received! Saved to showcase below.
              </span>
            )}
          </div>
        </form>

        {/* Showcase of Submitted Teams */}
        {submittedList.length > 0 && (
          <div className="mt-8 pt-6 border-t border-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-zinc-900 flex items-center gap-2">
                <span>Submitted Cohort Projects ({submittedList.length})</span>
              </h4>
              <button
                onClick={handleExportJson}
                className="text-xs text-zinc-600 hover:text-zinc-950 font-medium flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Submissions (.json)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {submittedList.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white border border-zinc-200 rounded-lg p-4 shadow-2xs hover:border-zinc-300 transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-semibold text-sm text-zinc-900">
                        {sub.teamName}
                      </h5>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        <span className="text-zinc-400">Team: </span>
                        {sub.members}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteSubmission(sub.id)}
                      className="text-zinc-300 hover:text-red-500 transition p-1"
                      title="Remove from local list"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-zinc-100 flex flex-wrap items-center gap-2 text-xs">
                    {sub.appUrl && sub.appUrl !== 'https://' && (
                      <a
                        href={sub.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-medium transition"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Live App</span>
                      </a>
                    )}
                    {sub.githubUrl && sub.githubUrl !== 'https://github.com/' && (
                      <a
                        href={sub.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 hover:bg-zinc-200 font-medium transition"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>GitHub</span>
                      </a>
                    )}
                    <span className="text-[11px] text-zinc-400 ml-auto">
                      {sub.submittedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
