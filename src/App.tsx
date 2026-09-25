/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LockScreen } from './components/LockScreen';
import { Navbar } from './components/Navbar';
import { OriginalPageRenderer } from './components/OriginalPageRenderer';
import { MainContent } from './components/MainContent';
import { Footer } from './components/Footer';
import { SubpageModal } from './components/SubpageModal';
import { Day1LectureView } from './components/Day1LectureView';
import { SubpagePageView } from './components/SubpagePageView';
import { ShieldCheck, Lock } from 'lucide-react';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<'original' | 'enhanced'>('original');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<'day1_slides' | 'sg_apis' | 'api_keys' | null>(null);

  // Sync state with browser URL navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo(0, 0);
    }
  };

  const handleUnlock = () => {
    setIsLocked(false);
  };

  const handleLock = () => {
    setIsLocked(true);
  };

  // 1. If password lock screen is activated
  if (isLocked) {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  // 2. Specific Route: Day 1 Lecture Slides (/autonomousaiagents2026september-day1-lecture)
  if (
    currentPath.includes('autonomousaiagents2026september-day1-lecture') ||
    currentPath === '/day1-lecture'
  ) {
    return (
      <Day1LectureView
        onNavigateHome={() => navigateTo('/autonomousaiagents2026september')}
        onNavigateSubpage={(path) => navigateTo(path)}
      />
    );
  }

  // 3. Specific Route: API Keys & JSON Field Guide (/autonomousaiagents2026cday2-sg-apis)
  if (currentPath.includes('autonomousaiagents2026cday2-sg-apis')) {
    return (
      <SubpagePageView
        pageType="sg_apis"
        onNavigateHome={() => navigateTo('/autonomousaiagents2026september')}
        onNavigateSubpage={(path) => navigateTo(path)}
      />
    );
  }

  // 4. Specific Route: Singapore Government APIs (/autonomousaiagents2026cday2-api-keys)
  if (currentPath.includes('autonomousaiagents2026cday2-api-keys')) {
    return (
      <SubpagePageView
        pageType="api_keys"
        onNavigateHome={() => navigateTo('/autonomousaiagents2026september')}
        onNavigateSubpage={(path) => navigateTo(path)}
      />
    );
  }

  // 5. Default Route: Main Course Page (/ or /autonomousaiagents2026september)
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-zinc-200">
      {/* Top Banner / Session Controller */}
      <div className="bg-zinc-900 text-zinc-300 text-xs py-2 px-4 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-white">talktoroh.com/autonomousaiagents2026september</span>
            <span className="hidden sm:inline text-zinc-500">&middot;</span>
            <span className="hidden sm:inline text-zinc-400">
              Password: <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-[11px]">build-with-agents</code>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View switcher */}
            <div className="bg-zinc-800 p-0.5 rounded-lg flex items-center text-[11px]">
              <button
                onClick={() => setActiveView('original')}
                className={`px-2.5 py-1 rounded-md transition font-medium cursor-pointer ${
                  activeView === 'original'
                    ? 'bg-zinc-700 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Exact Page View
              </button>
              <button
                onClick={() => setActiveView('enhanced')}
                className={`px-2.5 py-1 rounded-md transition font-medium cursor-pointer ${
                  activeView === 'enhanced'
                    ? 'bg-zinc-700 text-white shadow-xs'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Interactive Guide View
              </button>
            </div>

            <div className="h-3 w-px bg-zinc-700" />

            {/* Test Lock Screen button */}
            <button
              onClick={handleLock}
              className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-800 transition cursor-pointer"
              title="Test the Squarespace password lock screen (Password: build-with-agents)"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Test Lock Screen</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header & Navbar */}
      <Navbar
        onLock={handleLock}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenModal={(modalKey) => {
          if (modalKey === 'day1_slides') {
            navigateTo('/autonomousaiagents2026september-day1-lecture');
          } else if (modalKey === 'sg_apis') {
            navigateTo('/autonomousaiagents2026cday2-sg-apis');
          } else if (modalKey === 'api_keys') {
            navigateTo('/autonomousaiagents2026cday2-api-keys');
          } else {
            setActiveModal(modalKey);
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'original' ? (
          <OriginalPageRenderer
            onOpenSubpage={(pageKey) => {
              if (pageKey === 'day1_slides') {
                navigateTo('/autonomousaiagents2026september-day1-lecture');
              } else if (pageKey === 'sg_apis') {
                navigateTo('/autonomousaiagents2026cday2-sg-apis');
              } else if (pageKey === 'api_keys') {
                navigateTo('/autonomousaiagents2026cday2-api-keys');
              }
            }}
          />
        ) : (
          <MainContent
            searchTerm={searchTerm}
            onOpenModal={(modalKey) => {
              if (modalKey === 'day1_slides') {
                navigateTo('/autonomousaiagents2026september-day1-lecture');
              } else if (modalKey === 'sg_apis') {
                navigateTo('/autonomousaiagents2026cday2-sg-apis');
              } else if (modalKey === 'api_keys') {
                navigateTo('/autonomousaiagents2026cday2-api-keys');
              } else {
                setActiveModal(modalKey);
              }
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onLock={handleLock} />

      {/* Slide / Curriculum Reader Modal */}
      <SubpageModal
        pageKey={activeModal}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}
