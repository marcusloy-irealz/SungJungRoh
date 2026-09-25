import React, { useState } from 'react';
import { Menu, X, Lock, Search, BookOpen, Layers, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onLock: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onOpenModal: (pageKey: 'day1_slides' | 'sg_apis' | 'api_keys') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLock,
  searchTerm,
  onSearchChange,
  onOpenModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('AI');

  const navItems = [
    { label: 'AI', path: '/agentic-ai', active: true },
    { label: 'python', path: '/python' },
    { label: 'org', path: '/organizational' },
    { label: 'CXUX', path: '/cxux' },
    { label: 'r', path: '/rrr' },
    { label: 'ABS', path: '/abs202401' },
    { label: 'pub', path: '/pub' },
  ];

  return (
    <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-30 transition-all">
      <div className="max-w-4xl mx-auto px-6 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Top bar with Logo & Mobile Menu Toggle */}
        <div className="flex items-center justify-between">
          <a
            href="#top"
            className="text-2xl md:text-[26px] font-semibold tracking-tight text-zinc-900 hover:text-zinc-700 transition-colors"
          >
            Sungjong Roh
          </a>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onLock}
              title="Lock page"
              className="p-2 text-zinc-500 hover:text-zinc-900 transition-colors"
              aria-label="Lock screen"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-700 hover:text-zinc-950 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-sm">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveCategory(item.label)}
                className={`transition-colors capitalize ${
                  item.label === activeCategory
                    ? 'font-medium text-zinc-950 underline decoration-zinc-900 underline-offset-4'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="h-4 w-px bg-zinc-200" />

          {/* Quick Lock Button */}
          <button
            onClick={onLock}
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 px-2 py-1 rounded border border-zinc-200 hover:border-zinc-400 transition-all"
            title="Lock page (use password 'build-with-agents' to unlock)"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-zinc-50/90 px-6 py-4 space-y-3">
          <div className="grid grid-cols-4 gap-2 pb-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveCategory(item.label);
                  setMobileMenuOpen(false);
                }}
                className={`py-1.5 text-sm text-center rounded transition-colors ${
                  item.label === activeCategory
                    ? 'font-semibold bg-zinc-900 text-white'
                    : 'text-zinc-700 bg-white border border-zinc-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Autonomous AI Agents 2026</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLock();
              }}
              className="flex items-center gap-1 text-xs text-zinc-700 font-medium px-2.5 py-1 bg-white border border-zinc-300 rounded shadow-xs"
            >
              <Lock className="w-3 h-3" />
              <span>Lock Page</span>
            </button>
          </div>
        </div>
      )}

      {/* Sub-header Quick Tools bar: Search & Lecture notes modal triggers */}
      <div className="bg-zinc-50/70 border-t border-zinc-100 px-6 py-2.5">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tools, commands, topics..."
                className="w-full pl-8 pr-3 py-1 bg-white border border-zinc-200 rounded text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400 transition"
              />
              {searchTerm && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
            {searchTerm && (
              <span className="text-zinc-500 text-[11px] whitespace-nowrap">
                Filtering by "{searchTerm}"
              </span>
            )}
          </div>

          {/* Quick Reader shortcuts */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto overflow-x-auto max-w-full">
            <span className="text-zinc-400 text-[11px] uppercase tracking-wider mr-1 hidden lg:inline">
              Lecture Notes:
            </span>
            <button
              onClick={() => onOpenModal('day1_slides')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-medium cursor-pointer transition shadow-2xs whitespace-nowrap"
            >
              <BookOpen className="w-3 h-3 text-indigo-600" />
              <span>Day 1 Slides</span>
            </button>
            <button
              onClick={() => onOpenModal('sg_apis')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-medium cursor-pointer transition shadow-2xs whitespace-nowrap"
            >
              <Layers className="w-3 h-3 text-emerald-600" />
              <span>Keys & JSON Guide</span>
            </button>
            <button
              onClick={() => onOpenModal('api_keys')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 text-xs font-medium cursor-pointer transition shadow-2xs whitespace-nowrap"
            >
              <ExternalLink className="w-3 h-3 text-red-600" />
              <span>SG APIs Reference</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
