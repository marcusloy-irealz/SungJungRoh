import React from 'react';
import { X, ExternalLink, BookOpen, Layers, FileCode, Check, Copy } from 'lucide-react';
import subpagesData from '../subpagesData.json';

interface SubpageModalProps {
  pageKey: 'day1_slides' | 'sg_apis' | 'api_keys' | null;
  onClose: () => void;
}

export const SubpageModal: React.FC<SubpageModalProps> = ({ pageKey, onClose }) => {
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  if (!pageKey) return null;

  const page = subpagesData[pageKey];
  if (!page) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const getBadge = () => {
    if (pageKey === 'day1_slides') {
      return {
        label: 'Lecture Presentation & Curriculum',
        icon: <BookOpen className="w-4 h-4 text-indigo-600" />,
        url: 'https://www.talktoroh.com/autonomousaiagents2026september-day1-lecture',
      };
    }
    if (pageKey === 'sg_apis') {
      return {
        label: 'API Keys & JSON Field Guide',
        icon: <Layers className="w-4 h-4 text-emerald-600" />,
        url: 'https://www.talktoroh.com/autonomousaiagents2026cday2-sg-apis',
      };
    }
    return {
      label: 'Singapore Government Live APIs Reference',
      icon: <FileCode className="w-4 h-4 text-red-600" />,
      url: 'https://www.talktoroh.com/autonomousaiagents2026cday2-api-keys',
    };
  };

  const badge = getBadge();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-xl shadow-2xl border border-zinc-200 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/80">
          <div className="flex items-center gap-2.5">
            {badge.icon}
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-zinc-500">
                {badge.label}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-zinc-900 line-clamp-1">
                {page.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={badge.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 px-2.5 py-1 rounded border border-zinc-200 hover:bg-zinc-100 transition"
              title="Open original page in new tab"
            >
              <span>Original</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-lg transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="px-6 py-6 overflow-y-auto space-y-4 text-sm text-zinc-800 leading-relaxed font-sans">
          {page.blocks.map((block, idx) => {
            const isHeading = block.tag.startsWith('h');
            const isPre = block.tag === 'pre' || block.tag === 'code';
            const isBlockquote = block.tag === 'blockquote';

            if (block.tag === 'h1' || block.tag === 'h2') {
              return (
                <h3
                  key={idx}
                  className="text-lg sm:text-xl font-bold text-zinc-900 mt-6 pt-4 border-t border-zinc-100 first:mt-0 first:pt-0"
                >
                  {block.text}
                </h3>
              );
            }

            if (block.tag === 'h3' || block.tag === 'h4') {
              return (
                <h4 key={idx} className="text-base font-semibold text-zinc-900 mt-4">
                  {block.text}
                </h4>
              );
            }

            if (isPre) {
              return (
                <div key={idx} className="relative group my-2">
                  <pre className="bg-zinc-900 text-zinc-100 p-3.5 rounded-lg text-xs font-mono overflow-x-auto border border-zinc-800">
                    <code>{block.text}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(block.text, idx)}
                    className="absolute top-2 right-2 px-2 py-1 text-[11px] bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 opacity-90 transition flex items-center gap-1"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              );
            }

            if (isBlockquote) {
              return (
                <blockquote
                  key={idx}
                  className="pl-4 border-l-2 border-zinc-300 italic text-zinc-700 my-3 bg-zinc-50/50 py-1.5 rounded-r"
                >
                  {block.text}
                </blockquote>
              );
            }

            return (
              <p key={idx} className="text-zinc-700 leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs text-zinc-500">
          <span>Singapore Management University &middot; Prof. Sungjong Roh</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded text-xs font-medium transition cursor-pointer"
          >
            Close Reader
          </button>
        </div>
      </div>
    </div>
  );
};
