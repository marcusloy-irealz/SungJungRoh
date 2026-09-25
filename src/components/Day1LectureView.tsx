import React, { useState, useRef } from 'react';
import { ArrowLeft, ExternalLink, Maximize2, Minimize2, BookOpen, Layers, Monitor, RotateCcw } from 'lucide-react';

interface Day1LectureViewProps {
  onNavigateHome: () => void;
  onNavigateSubpage: (path: string) => void;
}

export const Day1LectureView: React.FC<Day1LectureViewProps> = ({
  onNavigateHome,
  onNavigateSubpage,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
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

  const slideTopics = [
    { num: 1, title: 'Day 1 · Full End-to-End Building with AI Agents' },
    { num: 2, title: 'A note before we start' },
    { num: 3, title: 'I · Why your screen accepts input and gives nothing real back' },
    { num: 4, title: 'What Singapore publishes, free, right now' },
    { num: 5, title: 'II · An API is an address that answers in a format a program can read' },
    { num: 6, title: 'Which way the request travels, and why only one way works' },
    { num: 7, title: 'III · What LTA DataMall gives you, and what it asks in return' },
    { num: 8, title: 'Requesting the key: what you click, in order' },
    { num: 9, title: 'The endpoint, and six stops you can walk to' },
    { num: 10, title: 'The error that will cost you an hour, and the one that saves it' },
    { num: 11, title: 'IV · What a key actually is, and why anyone would want yours' },
    { num: 12, title: 'Where a key leaks, and who ends up holding it' },
    { num: 13, title: 'The rules that keep a key private, and the one people get backwards' },
    { num: 14, title: 'V · The same toolchain, with one new folder inside it' },
    { num: 15, title: 'Station A · Google AI Studio: what you click, in order' },
    { num: 16, title: 'The prompt that writes it · copy this, then fill the one bracket' },
    { num: 17, title: 'Stations B and C at 09:15: the first push and the first deploy' },
    { num: 18, title: 'Station C · Vercel: where the key lives, and the step everyone forgets' },
    { num: 19, title: 'VI · What came back, and what it is telling you' },
    { num: 20, title: 'Build a second address whose only job is to answer "is it working?"' },
    { num: 21, title: 'Where to look when it breaks, in the order that saves time' },
    { num: 22, title: 'Why you cache, and why twenty seconds is the right number' },
    { num: 23, title: 'VII · Group build: make the screen tell the truth' },
    { num: 24, title: 'Pick a second service, and turn a readout into a product' },
    { num: 25, title: 'The sequence, and the proof at each step' },
    { num: 26, title: 'Calling the endpoint once, from Terminal or PowerShell' },
    { num: 27, title: 'What you are aiming at, by 15:40' },
    { num: 28, title: 'When it breaks, part one: the failures of wiring' },
    { num: 29, title: 'When it breaks, part two: the failures of data and of time' },
    { num: 30, title: 'What to take away' },
    { num: 31, title: 'Tonight, before Day 2' },
    { num: 32, title: 'Thank You for Being Curious' },
    { num: 33, title: 'Navigation & shortcuts' },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* Top Navigation & Breadcrumb Header */}
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

          {/* Quick Deck Controls */}
          <div className="flex items-center gap-2">
            {/* Direct Link to other guides */}
            <button
              onClick={() => onNavigateSubpage('/autonomousaiagents2026cday2-sg-apis')}
              className="text-xs text-zinc-700 hover:text-zinc-900 px-2.5 py-1.5 rounded bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 transition hidden lg:inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Keys &amp; JSON Guide</span>
            </button>

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

      {/* Slide Deck Container (Interactive 33-slide presentation) */}
      <main className="flex-1 w-full flex flex-col bg-white relative">
        <div className="w-full flex-1 min-h-[750px] lg:min-h-[850px] relative bg-white">
          <iframe
            ref={iframeRef}
            src="/lecture-deck.html"
            title="Day 1 · Full End-to-End Building with AI Agents Lecture Slides"
            className="w-full h-full absolute inset-0 border-0 bg-white"
            allow="fullscreen"
          />
        </div>

        {/* Slide Table of Contents / Quick Jump Drawer */}
        <div className="bg-zinc-50 border-t border-zinc-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-600">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span className="font-medium text-zinc-800">
                33 Interactive Presentation Slides with D3 Diagrams &amp; Architecture Flow
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-zinc-500">
              <span>Tip: Use <kbd className="bg-white text-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 shadow-2xs font-mono">←</kbd> <kbd className="bg-white text-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 shadow-2xs font-mono">→</kbd> or <kbd className="bg-white text-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 shadow-2xs font-mono">Space</kbd> to navigate</span>
            </div>
          </div>
        </div>
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
