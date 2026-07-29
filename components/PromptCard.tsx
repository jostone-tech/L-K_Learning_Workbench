"use client";

import { useState } from "react";
import type { Prompt, ADDIEPhase, Role } from "@/types/prompt";

const PHASE_STYLES: Record<ADDIEPhase, { bg: string; text: string; label: string }> = {
  Analysis:       { bg: "#0f62fe", text: "#ffffff", label: "Analysis" },
  Design:         { bg: "#8a3ffc", text: "#ffffff", label: "Design" },
  Development:    { bg: "#198038", text: "#ffffff", label: "Development" },
  Implementation: { bg: "#ff832b", text: "#ffffff", label: "Implementation" },
  Evaluation:     { bg: "#da1e28", text: "#ffffff", label: "Evaluation" },
};

const ROLE_ABBR: Record<Role, string> = {
  "Instructional Designer": "ID",
  "Iteration Manager":      "IM",
  "Programmer":             "Prog",
  "Visual Designer":        "VD",
  "QA":                     "QA",
};

const PREVIEW_LENGTH = 150;

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied]     = useState(false);

  const isLong    = prompt.prompt.length > PREVIEW_LENGTH;
  const displayed = expanded || !isLong
    ? prompt.prompt
    : prompt.prompt.slice(0, PREVIEW_LENGTH).trimEnd() + "…";

  const phaseStyle = PHASE_STYLES[prompt.phase];

  function handleCopy() {
    navigator.clipboard.writeText(prompt.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleToggle() {
    setExpanded((prev) => !prev);
  }

  return (
    <article
      className="bg-white rounded border border-[#e5e7eb] flex flex-col transition-colors duration-150 hover:border-[#0f62fe]"
      style={{ boxShadow: "none" }}
    >
      {/* Card header */}
      <div className="px-4 pt-4 pb-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm"
            style={{ backgroundColor: phaseStyle.bg, color: phaseStyle.text }}
          >
            {phaseStyle.label}
          </span>
          <span
            className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-sm"
            style={{ backgroundColor: "#1f2328", color: "#ffffff" }}
          >
            {ROLE_ABBR[prompt.role]}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-[#1f2328] leading-snug mb-2">
          {prompt.title}
        </h2>

        {/* Prompt text */}
        <p className="text-[13px] text-[#57606a] leading-relaxed whitespace-pre-wrap">
          {displayed}
        </p>

        {/* Show more / less */}
        {isLong && (
          <button
            onClick={handleToggle}
            aria-expanded={expanded}
            className="mt-2 text-[12px] font-medium text-[#0f62fe] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-1 rounded"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {/* Card footer */}
      <div className="mt-auto px-4 pb-4 pt-2 border-t border-[#e5e7eb] flex items-center justify-between gap-2">
        <span className="text-[11px] text-[#adb5bd]">
          {prompt.role}
        </span>
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied!" : "Copy prompt to clipboard"}
          className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-1"
          style={
            copied
              ? { background: "#198038", color: "#ffffff", borderColor: "#198038" }
              : { background: "#ffffff", color: "#1f2328", borderColor: "#e5e7eb" }
          }
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="4" y="1" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M1 4h2M1 4v6a1 1 0 001 1h5v-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Copy prompt
            </>
          )}
        </button>
      </div>
    </article>
  );
}
