import React, { useEffect, useRef, useState } from 'react';
import { rawPageHtml } from '../rawContent';
import { SubmissionSection } from './SubmissionSection';
import { ExternalLink, Copy, Check, BookOpen, Layers, FileCode } from 'lucide-react';

interface OriginalPageRendererProps {
  onOpenSubpage: (pageKey: 'day1_slides' | 'sg_apis' | 'api_keys') => void;
}

export const OriginalPageRenderer: React.FC<OriginalPageRendererProps> = ({ onOpenSubpage }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Attach interactive click handlers and copy buttons to rendered HTML
  useEffect(() => {
    if (!containerRef.current) return;

    // Handle internal subpage links so they open within the applet
    const links = containerRef.current.querySelectorAll('a');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        if (href.includes('autonomousaiagents2026september-day1-lecture')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            onOpenSubpage('day1_slides');
          });
          link.classList.add('cursor-pointer', 'font-semibold', 'text-indigo-600', 'hover:text-indigo-800');
        } else if (href.includes('autonomousaiagents2026cday2-sg-apis')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            onOpenSubpage('sg_apis');
          });
          link.classList.add('cursor-pointer', 'font-semibold', 'text-emerald-600', 'hover:text-emerald-800');
        } else if (href.includes('autonomousaiagents2026cday2-api-keys')) {
          link.addEventListener('click', (e) => {
            e.preventDefault();
            onOpenSubpage('api_keys');
          });
          link.classList.add('cursor-pointer', 'font-semibold', 'text-red-600', 'hover:text-red-800');
        } else if (href.startsWith('http')) {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
      }
    });

    // Enhance code blocks with copy action
    const codeBlocks = containerRef.current.querySelectorAll('pre code, li > p > code');
    codeBlocks.forEach((codeEl) => {
      const parent = codeEl.parentElement;
      if (!parent) return;

      // Add copyable cursor
      codeEl.classList.add('hover:bg-zinc-100', 'transition-colors', 'rounded', 'px-1', 'cursor-pointer');
      codeEl.setAttribute('title', 'Click to copy command');

      codeEl.addEventListener('click', () => {
        const text = codeEl.textContent || '';
        if (text) {
          navigator.clipboard.writeText(text);
          setCopiedCode(text);
          setTimeout(() => setCopiedCode(null), 1500);
        }
      });
    });
  }, [onOpenSubpage]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8">
      {/* Toast Notification for Copied Code */}
      {copiedCode && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white text-xs font-mono px-3.5 py-2 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Copied: {copiedCode.slice(0, 30)}</span>
        </div>
      )}

      {/* Quick Action Navigation bar for the 3 key subpages */}
      <div className="mb-8 p-4 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-zinc-700 uppercase tracking-wider text-[11px]">
          Direct Course Readers:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenSubpage('day1_slides')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 font-medium hover:bg-zinc-100 hover:border-zinc-300 transition shadow-2xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Day 1 Slides</span>
          </button>

          <button
            onClick={() => onOpenSubpage('sg_apis')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 font-medium hover:bg-zinc-100 hover:border-zinc-300 transition shadow-2xs cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>API Keys & JSON Guide</span>
          </button>

          <button
            onClick={() => onOpenSubpage('api_keys')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-200 text-zinc-800 font-medium hover:bg-zinc-100 hover:border-zinc-300 transition shadow-2xs cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-red-600" />
            <span>Singapore Government APIs</span>
          </button>
        </div>
      </div>

      {/* The verbatim HTML content matching talktoroh.com */}
      <div 
        ref={containerRef}
        className="talktoroh-body-content text-[15px] leading-relaxed text-zinc-800"
        dangerouslySetInnerHTML={{ __html: rawPageHtml }}
      />

      {/* Interactive Submission Portal Form and File Drop Contest Section */}
      <div className="mt-8 border-t border-zinc-200 pt-8">
        <SubmissionSection />
      </div>

      {/* Squarespace list & layout styling */}
      <style>{`
        .talktoroh-body-content blockquote {
          margin-left: 20px !important;
          border-left: 2px solid #222222;
          padding-left: 16px;
          margin-top: 1.5rem;
          margin-bottom: 1.5rem;
          font-style: italic;
          color: #4b5563;
        }
        @media (min-width: 640px) {
          .talktoroh-body-content blockquote {
            margin-left: 40px !important;
          }
        }
        .talktoroh-body-content p {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }
        .talktoroh-body-content ul[data-rte-list="default"] {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 0.5rem;
          margin-bottom: 0.75rem;
        }
        .talktoroh-body-content ul[data-rte-list="default"] ul {
          list-style-type: circle;
          padding-left: 1.5rem;
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
        }
        .talktoroh-body-content ul[data-rte-list="default"] ul ul {
          list-style-type: square;
          padding-left: 1.5rem;
        }
        .talktoroh-body-content li {
          margin-bottom: 0.35rem;
        }
        .talktoroh-body-content a {
          color: #111827;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: #9ca3af;
          transition: all 0.15s ease-in-out;
        }
        .talktoroh-body-content a:hover {
          text-decoration-color: #111827;
          color: #000000;
        }
        .talktoroh-body-content pre {
          background-color: #18181b;
          color: #f4f4f5;
          padding: 0.6rem 0.8rem;
          border-radius: 0.375rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8125rem;
          overflow-x: auto;
          margin-top: 0.35rem;
          margin-bottom: 0.35rem;
          display: inline-block;
          max-width: 100%;
        }
        .talktoroh-body-content code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8125rem;
          background-color: #f4f4f5;
          color: #18181b;
          padding: 0.15rem 0.35rem;
          border-radius: 0.25rem;
        }
        .talktoroh-body-content pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
        .talktoroh-body-content strong {
          color: #09090b;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};
