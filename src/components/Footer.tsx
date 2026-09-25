import React from 'react';
import { Linkedin, Mail, GraduationCap, Lock, Shield } from 'lucide-react';

interface FooterProps {
  onLock: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLock }) => {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white py-12 mt-16 text-zinc-600">
      <div className="max-w-3xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-xs">
          <span>Copyright &copy; {new Date().getFullYear()} Sungjong Roh</span>
          <span className="hidden sm:inline text-zinc-300">&middot;</span>
          <span className="text-zinc-500">Singapore Management University</span>
        </div>

        {/* Social Icons matching Squarespace SVG icon list */}
        <div className="flex items-center space-x-4">
          <a
            href="https://www.linkedin.com/in/talktoroh/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 hover:bg-zinc-50 transition"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="mailto:sroh@smu.edu.sg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Prof. Roh"
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 hover:bg-zinc-50 transition"
          >
            <Mail className="w-4 h-4" />
          </a>

          <a
            href="https://masters.smu.edu.sg/programme/msc-in-business-ai#overview-tab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SMU Master of Science in Business AI"
            className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 hover:bg-zinc-50 transition"
            title="SMU MSc in Business AI"
          >
            <GraduationCap className="w-4 h-4" />
          </a>

          <div className="h-4 w-px bg-zinc-200 mx-1" />

          {/* Quick Lock Action Button */}
          <button
            onClick={onLock}
            className="text-xs text-zinc-400 hover:text-zinc-800 flex items-center gap-1 cursor-pointer transition"
            title="Lock application (Password: build-with-agents)"
          >
            <Lock className="w-3 h-3" />
            <span>Lock</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
