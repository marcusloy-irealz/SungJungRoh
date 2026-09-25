import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Maximize2,
  Minimize2,
  BookOpen,
  Layers,
  RotateCcw,
  Search,
  Copy,
  Check,
  Code2,
  Terminal,
  AlertCircle,
  FileText,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { slidesDetailList, SlideDetail } from '../slidesDetailData';

interface Day1LectureViewProps {
  onNavigateHome: () => void;
  onNavigateSubpage: (path: string) => void;
}

export const Day1LectureView: React.FC<Day1LectureViewProps> = ({
  onNavigateHome,
  onNavigateSubpage,
}) => {
  const [viewMode, setViewMode] = useState<'deck' | 'notes' | 'split'>('split');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [expandedSlide, setExpandedSlide] = useState<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleReloadDeck = () => {
    if (iframeRef.current) {
      iframeRef.current.src = '/lecture-deck.html';
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(null), 1500);
  };

  const sections = [
    { id: 'all', label: 'All Slides (32)' },
    { id: 'overview', label: 'Welcome & Overview' },
    { id: 'gap', label: 'I · The Missing Half' },
    { id: 'api', label: 'II · What an API is' },
    { id: 'lta', label: 'III · LTA DataMall' },
    { id: 'key', label: 'IV · Secrets & API Keys' },
    { id: 'build', label: 'V · Toolchain & Build' },
    { id: 'wiring', label: 'VI · Status & Verification' },
    { id: 'group', label: 'VII · Group Build' },
    { id: 'wrap', label: 'Wrap-Up & Day 2 Prep' },
  ];

  const filteredSlides = slidesDetailList.filter((slide) => {
    const matchesSection =
      selectedSection === 'all' ||
      (selectedSection === 'overview' && (slide.section === 'overview' || slide.slideNumber <= 2)) ||
      (selectedSection === 'gap' && slide.section === 'gap') ||
      (selectedSection === 'api' && slide.section === 'api') ||
      (selectedSection === 'lta' && slide.section === 'lta') ||
      (selectedSection === 'key' && slide.section === 'key') ||
      (selectedSection === 'build' && slide.section === 'build') ||
      (selectedSection === 'wiring' && slide.section === 'wiring') ||
      (selectedSection === 'group' && slide.section === 'group') ||
      (selectedSection === 'wrap' && (slide.section === 'wrap' || slide.slideNumber >= 30));

    const matchesSearch =
      !searchQuery ||
      slide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slide.takeaway.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slide.prompts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      slide.codes.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesSection && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* Toast Notification for Copied Code */}
      {copiedPrompt && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 text-white text-xs font-mono px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Copied prompt to clipboard!</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-white border-b border-zinc-200 px-4 py-3 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium transition cursor-pointer border border-zinc-200 shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-zinc-600" />
              <span>Course Main</span>
            </button>

            <div className="h-4 w-px bg-zinc-200 hidden sm:block" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">
                  Day 1 Lecture
                </span>
                <span className="text-zinc-400 hidden sm:inline">&middot;</span>
                <h1 className="text-sm font-bold text-zinc-900 truncate max-w-[280px] sm:max-w-md">
                  Full End-to-End Building with AI Agents
                </h1>
              </div>
              <p className="text-[11px] text-zinc-500 hidden md:block">
                Singapore Management University &middot; Prof. Sungjong Roh
              </p>
            </div>
          </div>

          {/* View switcher & Action controls */}
          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <div className="bg-zinc-100 p-0.5 rounded-lg flex items-center text-xs border border-zinc-200">
              <button
                onClick={() => setViewMode('split')}
                className={`px-2.5 py-1 rounded font-medium transition cursor-pointer ${
                  viewMode === 'split' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
                title="View presentation deck and curriculum notes side by side"
              >
                Split View
              </button>
              <button
                onClick={() => setViewMode('deck')}
                className={`px-2.5 py-1 rounded font-medium transition cursor-pointer ${
                  viewMode === 'deck' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
                title="View interactive slides full-width"
              >
                Slides Deck
              </button>
              <button
                onClick={() => setViewMode('notes')}
                className={`px-2.5 py-1 rounded font-medium transition cursor-pointer ${
                  viewMode === 'notes' ? 'bg-white text-zinc-900 shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
                }`}
                title="Read all detailed takeaway notes, prompts and explanations"
              >
                Detailed Notes
              </button>
            </div>

            <div className="h-4 w-px bg-zinc-200" />

            <button
              onClick={handleReloadDeck}
              title="Reset slide deck"
              className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <a
              href="/lecture-deck.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded transition cursor-pointer"
              title="Open presentation standalone in new tab"
            >
              <span>Full Tab</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </a>

            <button
              onClick={handleToggleFullscreen}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded font-medium transition cursor-pointer shadow-xs"
              title="Toggle fullscreen mode"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col lg:flex-row bg-white overflow-hidden">
        {/* Presentation Slide Deck Pane */}
        {(viewMode === 'deck' || viewMode === 'split') && (
          <div
            className={`flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-zinc-200 relative ${
              viewMode === 'split' ? 'lg:w-3/5 w-full min-h-[550px] lg:min-h-[820px]' : 'w-full min-h-[750px] lg:min-h-[850px]'
            }`}
          >
            <div className="w-full flex-1 relative bg-white">
              <iframe
                ref={iframeRef}
                src="/lecture-deck.html"
                title="Day 1 · Full End-to-End Building with AI Agents Lecture Slides"
                className="w-full h-full absolute inset-0 border-0 bg-white"
                allow="fullscreen"
              />
            </div>

            {/* Deck Keyboard navigation hint bar */}
            <div className="bg-zinc-50 border-t border-zinc-200 px-4 py-2 flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>32 Interactive D3 Presentation Slides</span>
              </span>
              <span>
                Use <kbd className="bg-white px-1.5 py-0.5 rounded border border-zinc-300 font-mono shadow-2xs">←</kbd>{' '}
                <kbd className="bg-white px-1.5 py-0.5 rounded border border-zinc-300 font-mono shadow-2xs">→</kbd> or{' '}
                <kbd className="bg-white px-1.5 py-0.5 rounded border border-zinc-300 font-mono shadow-2xs">Space</kbd>
              </span>
            </div>
          </div>
        )}

        {/* Detailed Curriculum & Takeaways Pane */}
        {(viewMode === 'notes' || viewMode === 'split') && (
          <div
            className={`flex flex-col bg-zinc-50/60 overflow-y-auto ${
              viewMode === 'split' ? 'lg:w-2/5 w-full max-h-[850px]' : 'w-full max-w-4xl mx-auto py-6 px-4'
            }`}
          >
            {/* Search & Filter Header */}
            <div className="p-4 bg-white border-b border-zinc-200 sticky top-0 z-20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span>Complete Lecture Details &amp; Notes</span>
                  </h2>
                  <p className="text-[11px] text-zinc-500">
                    Showing {filteredSlides.length} of {slidesDetailList.length} slides with full curriculum notes
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search slides, takeaways, prompts, or codes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              {/* Section Filters */}
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => setSelectedSection(sec.id)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer border ${
                      selectedSection === sec.id
                        ? 'bg-zinc-900 text-white border-zinc-900'
                        : 'bg-white text-zinc-600 hover:text-zinc-900 border-zinc-200 hover:bg-zinc-50'
                    }`}
                  >
                    {sec.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slide Details List */}
            <div className="p-4 space-y-4">
              {filteredSlides.map((slide) => {
                const isExpanded = expandedSlide === slide.slideNumber || viewMode === 'notes';

                return (
                  <div
                    key={slide.slideNumber}
                    className="bg-white border border-zinc-200 rounded-xl p-4 shadow-2xs hover:border-zinc-300 transition"
                  >
                    {/* Slide Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold border border-indigo-100">
                            Slide {slide.slideNumber}
                          </span>
                          {slide.section && (
                            <span className="text-[11px] text-zinc-500 font-medium capitalize">
                              {slide.section}
                            </span>
                          )}
                        </div>
                        <h3 className="text-sm font-bold text-zinc-900">{slide.title}</h3>
                      </div>

                      <button
                        onClick={() =>
                          setExpandedSlide(isExpanded ? null : slide.slideNumber)
                        }
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition cursor-pointer"
                        title={isExpanded ? 'Collapse' : 'Expand'}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Detailed Takeaway Note */}
                    {slide.takeaway && (
                      <div className="mt-3 text-xs leading-relaxed text-zinc-700 bg-zinc-50 p-3 rounded-lg border border-zinc-200/80">
                        <span className="font-semibold text-zinc-900 block mb-1">
                          Takeaway &amp; Explanation:
                        </span>
                        {slide.takeaway}
                      </div>
                    )}

                    {/* Prompts */}
                    {slide.prompts.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <span className="text-[11px] font-semibold text-indigo-700 flex items-center gap-1">
                          <Terminal className="w-3 h-3" />
                          <span>AI Studio Prompt / Instruction:</span>
                        </span>
                        {slide.prompts.map((p, idx) => (
                          <div
                            key={idx}
                            className="relative group bg-zinc-900 text-zinc-100 font-mono text-[11px] p-3 rounded-lg border border-zinc-800"
                          >
                            <button
                              onClick={() => handleCopy(p)}
                              className="absolute top-2 right-2 p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer shadow-xs"
                              title="Copy prompt"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <pre className="whitespace-pre-wrap break-words pr-8">{p}</pre>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Code Snippets */}
                    {slide.codes.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                          <Code2 className="w-3 h-3" />
                          <span>Code / Terminal Command:</span>
                        </span>
                        {slide.codes.map((c, idx) => (
                          <div
                            key={idx}
                            className="relative group bg-zinc-900 text-emerald-300 font-mono text-[11px] p-2.5 rounded-lg border border-zinc-800"
                          >
                            <button
                              onClick={() => handleCopy(c)}
                              className="absolute top-2 right-2 p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer"
                              title="Copy code"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <pre className="whitespace-pre-wrap break-words pr-8">{c}</pre>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Callouts */}
                    {slide.callouts.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {slide.callouts.map((call, idx) => (
                          <div
                            key={idx}
                            className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-2.5 rounded-lg flex items-start gap-2"
                          >
                            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span>{call}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredSlides.length === 0 && (
                <div className="text-center py-12 text-zinc-500 text-xs">
                  No slides match your search query. Try resetting filters.
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 py-4 px-6 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Copyright &copy; {new Date().getFullYear()} Sungjong Roh &middot; Singapore Management University</span>
          <div className="flex items-center gap-4">
            <button onClick={onNavigateHome} className="hover:text-zinc-800 underline cursor-pointer">
              Course Home
            </button>
            <a href="https://www.linkedin.com/in/talktoroh/" target="_blank" rel="noreferrer" className="hover:text-zinc-800">
              LinkedIn
            </a>
            <a href="mailto:sroh@smu.edu.sg" className="hover:text-zinc-800">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
