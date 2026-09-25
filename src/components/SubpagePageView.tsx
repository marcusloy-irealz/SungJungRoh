import React from 'react';
import { ArrowLeft, BookOpen, Layers, FileCode, ExternalLink } from 'lucide-react';
import { sgApisFullHtml, apiKeysFullHtml } from '../subpagesFullHtml';

interface SubpagePageViewProps {
  pageType: 'sg_apis' | 'api_keys';
  onNavigateHome: () => void;
  onNavigateSubpage: (path: string) => void;
}

export const SubpagePageView: React.FC<SubpagePageViewProps> = ({
  pageType,
  onNavigateHome,
  onNavigateSubpage,
}) => {
  const isSgApis = pageType === 'sg_apis';
  const htmlContent = isSgApis ? sgApisFullHtml : apiKeysFullHtml;
  const title = isSgApis
    ? 'Building Autonomous AI Agents 2026 — API Keys & JSON, a Field Guide'
    : 'Building Autonomous AI Agents 2026 — Singapore Government API Reference';

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium transition cursor-pointer border border-zinc-200 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Course Main</span>
            </button>

            <div className="h-4 w-px bg-zinc-200" />

            <h1 className="text-sm font-semibold text-zinc-900 truncate max-w-sm sm:max-w-md">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateSubpage('/autonomousaiagents2026september-day1-lecture')}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded border border-indigo-200 font-medium transition cursor-pointer"
            >
              <BookOpen className="w-3 h-3 text-indigo-600" />
              <span>Day 1 Slides</span>
            </button>

            <button
              onClick={() =>
                onNavigateSubpage(
                  isSgApis ? '/autonomousaiagents2026cday2-api-keys' : '/autonomousaiagents2026cday2-sg-apis'
                )
              }
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-zinc-100 text-zinc-700 hover:bg-zinc-200 rounded border border-zinc-200 font-medium transition cursor-pointer"
            >
              {isSgApis ? <FileCode className="w-3 h-3 text-red-600" /> : <Layers className="w-3 h-3 text-emerald-600" />}
              <span>{isSgApis ? 'SG APIs Card' : 'Keys & JSON'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Render */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <div
          className="subpage-rendered-content text-[15px] leading-relaxed text-zinc-800"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 py-6 px-6 text-center text-xs text-zinc-500">
        <p>Copyright &copy; {new Date().getFullYear()} Sungjong Roh &middot; Singapore Management University</p>
      </footer>

      <style>{`
        .subpage-rendered-content h1,
        .subpage-rendered-content h2,
        .subpage-rendered-content h3,
        .subpage-rendered-content h4 {
          font-weight: 700;
          color: #111827;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .subpage-rendered-content h1 { font-size: 1.5rem; }
        .subpage-rendered-content h2 { font-size: 1.25rem; }
        .subpage-rendered-content h3 { font-size: 1.1rem; }
        .subpage-rendered-content p {
          margin-bottom: 0.85rem;
          line-height: 1.7;
        }
        .subpage-rendered-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .subpage-rendered-content li {
          margin-bottom: 0.35rem;
        }
        .subpage-rendered-content pre {
          background-color: #18181b;
          color: #f4f4f5;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.825rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        .subpage-rendered-content code {
          font-family: 'JetBrains Mono', monospace;
          background-color: #f4f4f5;
          color: #18181b;
          padding: 0.15rem 0.35rem;
          border-radius: 0.25rem;
          font-size: 0.825rem;
        }
        .subpage-rendered-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
        .subpage-rendered-content a {
          color: #111827;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .subpage-rendered-content blockquote {
          border-left: 3px solid #222;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #4b5563;
        }
      `}</style>
    </div>
  );
};
