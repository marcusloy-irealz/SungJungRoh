import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Terminal, Sparkles, BookOpen, Layers, FileCode } from 'lucide-react';
import { SubmissionSection } from './SubmissionSection';

interface MainContentProps {
  searchTerm: string;
  onOpenModal: (pageKey: 'day1_slides' | 'sg_apis' | 'api_keys') => void;
}

export const MainContent: React.FC<MainContentProps> = ({ searchTerm, onOpenModal }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  const highlightMatches = (text: string) => {
    if (!searchTerm.trim()) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={i} className="bg-amber-200 text-zinc-900 rounded px-0.5 font-medium">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-10 content-prose text-zinc-800 text-[15px] leading-relaxed selection:bg-zinc-200">
      {/* Top Banner / Cohort Title */}
      <div className="mb-10 text-center">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 leading-snug">
          {highlightMatches('SMU Academy | Building Autonomous AI Agents Without Coding: LangChain, LangGraph, & MCP | 2026 Cohort')}
        </h1>
        <p className="text-xs uppercase tracking-widest text-zinc-400 mt-2 font-medium">
          Lee Kong Chian School of Business &middot; Singapore Management University
        </p>
      </div>

      {/* Opening Letter Quote Block */}
      <blockquote className="my-8 pl-5 border-l-2 border-zinc-900 italic text-zinc-700 space-y-3.5 bg-zinc-50/50 py-3 rounded-r-lg">
        <p className="font-medium text-zinc-900 not-italic">
          Good morning, Team 🤗
        </p>
        <p>
          Welcome to your first session on LangChain, LangGraph, and MCP.
        </p>
        <p>
          This module is part of my open-enrollment public lecture series on action-oriented artificial intelligence. The goal is to help you move beyond generative AI and become builders of agentic AI systems. This is your first step toward becoming what I call an AA—Agentic Architect.
        </p>
        <p>
          In this module, you will engage in both conceptual and hands-on learning. As the starting point of your journey, you’ll learn how to model context protocols through a learn-by-doing, task-oriented, and group-based approach.
        </p>
        <p>
          This open lecture series emphasizes hands-on experimentation, collaboration, and real-world application—while also helping you understand the core concepts of AI from a 360-degree perspective.
        </p>
        <p className="font-medium text-zinc-950 not-italic pt-1">
          Let’s go. Vamos. Allez. 파이팅. <code className="bg-zinc-200/70 text-zinc-900 px-1.5 py-0.5 rounded font-mono text-xs font-semibold">agent.activate()</code> 🙌
        </p>
      </blockquote>

      {/* ======================================================== */}
      {/* DAY 2 SECTION */}
      {/* ======================================================== */}
      <div className="mt-12 pt-8 border-t border-zinc-200">
        <h2 className="text-xl font-bold text-zinc-950 tracking-tight flex items-center gap-2">
          <span>Day 2 | 2026-09-25-Friday</span>
        </h2>

        <div className="mt-4 pl-0 sm:pl-6 space-y-4 text-zinc-800">
          <p className="font-semibold text-zinc-900">
            Good morning, Team 👋 ☀️
          </p>
          <p>
            Yesterday we built out the full-stack apps—so that's where we'll pick up this morning. Working with the same teams and the same projects, our first sprint is to get the API keys wired into your application. The guiding document is below, and Keziah will run a quick demo to get everyone up to speed. We're aiming to wrap the sprint by the morning snack break.
          </p>
          <p className="bg-zinc-50 p-4 rounded-lg border border-zinc-200/70 text-sm leading-relaxed text-zinc-700">
            <strong className="text-zinc-900">AI Studio Build</strong> generates the app from one prompt. <strong className="text-zinc-900">GitHub</strong> saves it with the API keys protected. <strong className="text-zinc-900">Vercel</strong> ships it to a public URL. <strong className="text-zinc-900">Supabase</strong> gives it a real Postgres database. Each block has roughly five numbered steps; you can pause at any step, take notes, and resume. The whole morning is one app we build together, layer by layer.
          </p>
          <p>
            This afternoon the AI moves into your laptop. We install <strong className="text-zinc-900">Antigravity</strong>, an AI-native IDE that reads your project on every prompt. We equip it with <strong className="text-zinc-900">Model Context Protocol (MCP)</strong> servers so the AI can reach your filesystem, your GitHub, and the database you built before lunch. We end with custom Skills, the moment when your most-used prompts compress into one keystroke and become shareable across your team. The capstone in the final block is your team's chance to combine all of it on an app you actually want at work.
          </p>
          <p className="font-medium text-zinc-900">
            Let’s continue to build, experiment, and ship 🙌 Yay!
          </p>

          {/* Day 2 Nested Resources List */}
          <ul className="list-disc pl-5 space-y-2 mt-4 text-zinc-800">
            <li>
              <span className="font-semibold text-zinc-900">Model Context Protocol (MCP) without coding</span>
              <ul className="list-[circle] pl-5 mt-1 space-y-1 text-zinc-700">
                <li>Prof. Roh’s Guide Document</li>
              </ul>
            </li>

            <li>
              <span className="font-semibold text-zinc-900">Smithery.ai</span>
              <ul className="list-[circle] pl-5 mt-1 space-y-1">
                <li>
                  <a
                    href="https://smithery.ai/console/toolbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:underline text-indigo-700 flex items-center gap-1 inline-flex"
                  >
                    <span>There's no “limit” to what you can do, Team 😊</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </li>

            <li>
              <span className="font-semibold text-zinc-900">End-to-End AI Products/Services</span>
              <ul className="list-[circle] pl-5 mt-1 space-y-1 text-zinc-700">
                <li>Submissions</li>
                <li>Contest</li>
                <li className="font-medium text-zinc-900">Drop your JSON file here</li>
              </ul>
            </li>
          </ul>

          {/* Interactive JSON File Drop Zone & Contest Submissions */}
          <SubmissionSection />

          {/* Supabase details */}
          <ul className="list-disc pl-5 space-y-2 mt-6 text-zinc-800">
            <li>
              <span className="font-semibold text-zinc-900">Supabase</span>
              <ul className="list-[circle] pl-5 mt-1.5 space-y-2 text-sm">
                <li>
                  <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 inline-flex">
                    https://supabase.com/
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </li>
                <li>
                  <a href="https://supabase.com/docs/reference/cli/introduction" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 inline-flex">
                    https://supabase.com/docs/reference/cli/introduction
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </li>
                <li>
                  <span>API Key Guide: </span>
                  <a href="https://supabase.com/docs/guides/api/api-keys" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 inline-flex">
                    https://supabase.com/docs/guides/api/api-keys
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </li>
                <li>
                  <span>Token needed for running DB queries: </span>
                  <a href="https://supabase.com/dashboard/account/tokens" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 inline-flex">
                    https://supabase.com/dashboard/account/tokens
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DAY 1 SECTION */}
      {/* ======================================================== */}
      <div className="mt-14 pt-8 border-t border-zinc-200">
        <h2 className="text-xl font-bold text-zinc-950 tracking-tight flex items-center gap-2">
          <span>Day 1 | 2026-09-24-Thursday</span>
        </h2>

        <div className="mt-4 pl-0 sm:pl-6 space-y-4 text-zinc-800">
          <p className="font-semibold text-zinc-900">
            Welcome, Team 👋 Today we’ll begin with building your AI products by connecting your front-end to backend APIs.
          </p>
          <p>
            First, we’ll migrate your front-end from plain HTML/CSS/JavaScript to <strong className="text-zinc-900">React (Vite)</strong>. Language-wise, we’ll also move to <strong className="text-zinc-900">TypeScript</strong>—a widely adopted language across modern product teams, and especially common in today’s AI-product stack. Then you’ll add analytics—Google Analytics and Microsoft Clarity—so you can track user behavior and learn what people actually do inside your app (not just what you <em>think</em> they do). <span className="underline decoration-zinc-400 font-medium">Note: if your team wants to revisit your project and change the path/direction, you’re free to do that—just be clear about what you’re changing and why.</span>
          </p>
          <p>
            One exciting thing to note: even if you didn’t realize it, you’ve already been using MCP while building your AI products with Firebase Studio—especially when working alongside tools like Gemini CLI and/or Claude CLI (like Stephen’s team, who is burning cash with pure passion).
          </p>
          <p className="bg-zinc-50 p-4 rounded-lg border border-zinc-200/70 text-sm leading-relaxed text-zinc-700">
            When you used an AI assistant in your dev environment and it could “do things” like interact with your project, call services, or run tool-driven actions, it wasn’t just chatting—it was invoking tool functions through a standard interface. <strong className="text-zinc-900">MCP (Model Context Protocol)</strong> is essentially the “universal connector” that lets an AI assistant talk to external tools (like Firebase operations, project resources, scripts, and other utilities) in a structured way: the assistant requests an action, an MCP server executes it, and returns results back to the assistant. That’s why your AI workflow could feel “hands-on” and integrated rather than purely conversational.
          </p>
          <p>
            Once you’ve added more tools to your product, we’ll connect to free APIs as well as the OpenAI API—so user queries in your app can be sent to the model and answered dynamically via your backend.
          </p>
          <p className="font-medium text-zinc-900">
            Let’s continue to build, experiment, and ship 🙌 Yay!
          </p>

          {/* Essentials of Building with AI Agents */}
          <div className="mt-8 space-y-6">
            <div>
              <h3 className="text-base font-bold text-zinc-950 uppercase tracking-wider mb-3">
                Essentials of Building with AI Agents
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { title: 'Google AI Studio', category: 'End-to-End Agentic Building', url: 'https://aistudio.google.com/apps' },
                  { title: 'Antigravity', category: 'IDE & Environment', url: 'https://antigravity.google/' },
                  { title: 'Github', category: 'Codebase', url: 'https://github.com/' },
                  { title: 'Vercel', category: 'Deployment', url: 'https://vercel.com/' },
                  { title: 'Stitch', category: 'Agentic Design', url: 'https://stitch.withgoogle.com/' },
                  { title: 'Miro', category: 'RAG-able Ideation Platform', url: 'https://miro.com/' },
                  { title: 'Disqus', category: 'User Feedback', url: 'https://disqus.com/' },
                  { title: 'Supabase', category: 'Server + Database', url: 'https://supabase.com/' },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white border border-zinc-200 rounded-lg hover:border-zinc-400 hover:shadow-xs transition group flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[11px] text-zinc-400 font-medium block">
                        {item.category}
                      </span>
                      <span className="text-sm font-semibold text-zinc-900 group-hover:text-black">
                        {item.title}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-600 transition" />
                  </a>
                ))}
              </div>
            </div>

            {/* Slides & Guides Cards with Interactive Reader buttons */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Course Materials & Field References
              </h4>

              <div className="space-y-2">
                <div className="p-3 bg-white rounded-lg border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-zinc-500 font-medium">Lecture Slides</span>
                    <h5 className="text-sm font-semibold text-zinc-900">
                      Full-Stack (End-to-End) AI Product Development without Coding
                    </h5>
                  </div>
                  <button
                    onClick={() => onOpenModal('day1_slides')}
                    className="px-3 py-1.5 rounded bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition shadow-2xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Slides</span>
                  </button>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-zinc-500 font-medium">API Field Guide</span>
                    <h5 className="text-sm font-semibold text-zinc-900">
                      Connecting Your UI to API Services: How to Connect with JSON
                    </h5>
                  </div>
                  <button
                    onClick={() => onOpenModal('sg_apis')}
                    className="px-3 py-1.5 rounded bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition shadow-2xs"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>View Guide</span>
                  </button>
                </div>

                <div className="p-3 bg-white rounded-lg border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-zinc-500 font-medium">Live Reference</span>
                    <h5 className="text-sm font-semibold text-zinc-900">
                      Singapore Government APIs & Free Google Keys Card
                    </h5>
                  </div>
                  <button
                    onClick={() => onOpenModal('api_keys')}
                    className="px-3 py-1.5 rounded bg-zinc-900 text-white hover:bg-zinc-800 text-xs font-medium flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition shadow-2xs"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>View API Cards</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Day 1 Group Work */}
            <div className="border-l-2 border-zinc-300 pl-4 py-1">
              <h4 className="text-sm font-semibold text-zinc-900">Day 1 Group Work</h4>
              <p className="text-xs text-zinc-600 mt-0.5">
                Showcase Each of the Groups’ Submissions (see submission portal below)
              </p>
            </div>

            {/* MCP Marketplace & Claude Code CLI */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-zinc-900">
                Connect to the largest marketplace of MCPs and Agent Skills
              </h4>

              <div className="space-y-2">
                <div className="bg-zinc-900 text-zinc-100 p-3 rounded-lg text-xs font-mono relative flex items-center justify-between">
                  <div className="overflow-x-auto">
                    <span className="text-zinc-400"># Smithery CLI</span>
                    <p className="text-emerald-400 mt-0.5">npm install -g @smithery/cli@latest</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('npm install -g @smithery/cli@latest')}
                    className="ml-3 p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded transition cursor-pointer"
                    title="Copy command"
                  >
                    {copiedCmd === 'npm install -g @smithery/cli@latest' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="bg-zinc-900 text-zinc-100 p-3 rounded-lg text-xs font-mono relative flex items-center justify-between">
                  <div className="overflow-x-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-400"># Claude Code from Anthropic</span>
                      <a
                        href="https://code.claude.com/docs/en/setup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-zinc-400 underline hover:text-white"
                      >
                        docs
                      </a>
                    </div>
                    <p className="text-emerald-400 mt-0.5">npm install -g @anthropic-ai/claude-code</p>
                    <p className="text-zinc-300 mt-0.5">claude</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard('npm install -g @anthropic-ai/claude-code && claude')}
                    className="ml-3 p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded transition cursor-pointer"
                    title="Copy command"
                  >
                    {copiedCmd === 'npm install -g @anthropic-ai/claude-code && claude' ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* AI Development Tools & LLM CLIs */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-zinc-900">
                AI Development Tools &amp; LLM CLIs
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {/* Gemini CLI */}
                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-zinc-900">Gemini CLI</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                      Most Generous
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mb-2">
                    <a href="https://geminicli.com/" target="_blank" rel="noopener noreferrer" className="underline">
                      https://geminicli.com/
                    </a>
                  </p>
                  <pre className="bg-zinc-900 text-zinc-100 p-2 rounded text-[11px] overflow-x-auto flex justify-between items-center">
                    <code>npm install -g @google/gemini-cli<br />gemini</code>
                    <button
                      onClick={() => copyToClipboard('npm install -g @google/gemini-cli')}
                      className="ml-2 p-1 text-zinc-400 hover:text-white"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </pre>
                </div>

                {/* OpenAI Codex CLI */}
                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-zinc-900">OpenAI Codex CLI</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mb-2">
                    <a href="https://developers.openai.com/codex/cli/" target="_blank" rel="noopener noreferrer" className="underline">
                      developers.openai.com/codex/cli/
                    </a>
                  </p>
                  <pre className="bg-zinc-900 text-zinc-100 p-2 rounded text-[11px] overflow-x-auto flex justify-between items-center">
                    <code>npm i -g @openai/codex<br />codex login --device-auth<br />codex</code>
                    <button
                      onClick={() => copyToClipboard('npm i -g @openai/codex')}
                      className="ml-2 p-1 text-zinc-400 hover:text-white"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </pre>
                </div>

                {/* Claude Code */}
                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-zinc-900">Claude Code (Anthropic)</span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded font-medium">
                      Best-Performing
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mb-2">
                    <a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noopener noreferrer" className="underline">
                      code.claude.com/docs/en/setup
                    </a>
                  </p>
                  <pre className="bg-zinc-900 text-zinc-100 p-2 rounded text-[11px] overflow-x-auto flex justify-between items-center">
                    <code>npm install -g @anthropic-ai/claude-code<br />claude</code>
                    <button
                      onClick={() => copyToClipboard('npm install -g @anthropic-ai/claude-code')}
                      className="ml-2 p-1 text-zinc-400 hover:text-white"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </pre>
                </div>

                {/* OpenCode */}
                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-zinc-900">OpenCode</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 mb-2">Open-source agentic coding</p>
                  <a
                    href="https://opencode.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-zinc-800 underline"
                  >
                    https://opencode.ai/
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Vibe Design & External Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600">Vibe Design</h4>
                <ul className="space-y-1.5 text-xs text-zinc-700">
                  <li>&bull; <a href="https://getbootstrap.com/" target="_blank" rel="noreferrer">Bootstrap (getbootstrap.com)</a></li>
                  <li>&bull; <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind CSS (tailwindcss.com)</a></li>
                  <li>&bull; <a href="https://ui.shadcn.com/" target="_blank" rel="noreferrer">shadcn/ui (ui.shadcn.com)</a></li>
                  <li>&bull; <a href="https://motion.dev/docs/react" target="_blank" rel="noreferrer">Motion for React (motion.dev)</a></li>
                  <li>&bull; <a href="https://mobbin.com/" target="_blank" rel="noreferrer">Mobbin UI Inspiration (mobbin.com)</a></li>
                </ul>
              </div>

              <div className="bg-white border border-zinc-200 rounded-lg p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-600">External Services &amp; Monetization</h4>
                <ul className="space-y-1.5 text-xs text-zinc-700">
                  <li>&bull; Comments: <a href="https://disqus.com/" target="_blank" rel="noreferrer">Disqus</a></li>
                  <li>&bull; AI Vision: <a href="https://teachablemachine.withgoogle.com/" target="_blank" rel="noreferrer">Teachable Machine</a></li>
                  <li>&bull; Ads: <a href="https://adsense.google.com/intl/en/start/" target="_blank" rel="noreferrer">Google AdSense</a> (<a href="https://support.google.com/adsense/answer/10162" target="_blank" rel="noreferrer">Guide</a>, <a href="https://support.google.com/adsense/answer/23921?hl=en" target="_blank" rel="noreferrer">Quality</a>)</li>
                  <li>&bull; Social: <a href="https://www.addtoany.com/" target="_blank" rel="noreferrer">AddToAny</a></li>
                  <li>&bull; Feedback: <a href="https://userback.io/" target="_blank" rel="noreferrer">Userback</a></li>
                </ul>
              </div>
            </div>

            {/* Analytics, Clarity, SEO & GEO */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-2.5 text-xs">
              <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">
                Analytics, Clarity, SEO &amp; GEO (Generative Engine Optimization)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-zinc-700">
                <div>
                  <span className="font-semibold text-zinc-900 block mb-1">Analytics</span>
                  <a href="https://analytics.google.com/analytics/web/provision/?hl=ko#/provision" target="_blank" rel="noreferrer" className="block text-zinc-600 hover:underline">Google Analytics</a>
                  <a href="http://clarity.microsoft.com/" target="_blank" rel="noreferrer" className="block text-zinc-600 hover:underline">Microsoft Clarity</a>
                  <a href="https://clarity.microsoft.com/google-analytics" target="_blank" rel="noreferrer" className="block text-zinc-600 hover:underline">Clarity + GA Integration</a>
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 block mb-1">Search &amp; Audit</span>
                  <a href="https://developers.google.com/search/docs/beginner/seo-starter-guide?hl=ko" target="_blank" rel="noreferrer" className="block text-zinc-600 hover:underline">Google Search Starter</a>
                  <a href="https://search.google.com/search-console/about" target="_blank" rel="noreferrer" className="block text-zinc-600 hover:underline">Google Search Console</a>
                  <a href="https://seositecheckup.com/" target="_blank" rel="noreferrer" className="block text-zinc-600 hover:underline">SEO Site Checkup</a>
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 block mb-1">AI SEO &amp; GEO</span>
                  <a href="https://www.semrush.com/" target="_blank" rel="noreferrer" className="block text-zinc-600 hover:underline">Semrush AI SEO</a>
                  <a href="https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search" target="_blank" rel="noreferrer" className="block text-zinc-600 hover:underline">Google AI Search Blog</a>
                  <a href="https://www.tosspayments.com/blog/articles/39461" target="_blank" rel="noreferrer" className="block text-zinc-600 hover:underline">Toss Payments Guide</a>
                </div>
              </div>
            </div>

            {/* Cloudflare Pages Functions Prompt Snippet */}
            <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs">
              <span className="font-semibold text-amber-950 block mb-1">
                Cloudflare Pages Functions Prompt Pattern
              </span>
              <p className="text-amber-900 italic mb-2">
                “I want to use Cloudflare Pages Functions to receive a style consulting report via OpenAI's API. Write the code.”
              </p>
              <a
                href="https://developers.cloudflare.com/workers/wrangler/install-and-update/"
                target="_blank"
                rel="noreferrer"
                className="text-amber-800 underline font-medium"
              >
                Wrangler CLI Installation Guide &rarr;
              </a>
            </div>

            {/* Model APIs & Global Payments */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white border border-zinc-200 rounded-lg p-3.5 space-y-1.5">
                <span className="font-bold text-zinc-900 block">OpenAI &amp; Replicate APIs</span>
                <p><a href="https://platform.openai.com/docs/overview" target="_blank" rel="noreferrer">OpenAI Documentation</a></p>
                <p><a href="https://openai.com/ko-KR/api/pricing/" target="_blank" rel="noreferrer">OpenAI Pricing</a></p>
                <p><a href="https://platform.openai.com/tokenizer" target="_blank" rel="noreferrer">OpenAI Token Calculator</a></p>
                <p><a href="https://replicate.com/" target="_blank" rel="noreferrer">Replicate Models (replicate.com)</a></p>
              </div>

              <div className="bg-white border border-zinc-200 rounded-lg p-3.5 space-y-1.5">
                <span className="font-bold text-zinc-900 block">Global Payments (Polar)</span>
                <p><a href="https://polar.sh/docs/merchant-of-record/acceptable-use" target="_blank" rel="noreferrer">Polar Acceptable Use Policy</a></p>
                <p><a href="https://polar.sh/" target="_blank" rel="noreferrer">Polar Platform</a></p>
                <p><a href="https://sandbox.polar.sh/" target="_blank" rel="noreferrer">Polar Sandbox Environment</a></p>
                <p><a href="https://polar.sh/docs/integrate/sandbox#sandbox-environment" target="_blank" rel="noreferrer">Sandbox Integration Docs</a></p>
              </div>
            </div>

            {/* Local LLMs (Ollama) */}
            <div className="bg-zinc-900 text-zinc-100 p-4 rounded-lg text-xs font-mono space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-white">Local LLMs: Ollama (developed by Meta AI)</span>
                </div>
                <a
                  href="https://ollama.com/download"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 underline hover:text-white"
                >
                  Download Ollama
                </a>
              </div>
              <div className="flex items-center justify-between bg-zinc-800/80 px-3 py-2 rounded">
                <code className="text-emerald-400">ollama run llama3.1:8b</code>
                <button
                  onClick={() => copyToClipboard('ollama run llama3.1:8b')}
                  className="text-zinc-400 hover:text-white ml-2 cursor-pointer"
                  title="Copy command"
                >
                  {copiedCmd === 'ollama run llama3.1:8b' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
