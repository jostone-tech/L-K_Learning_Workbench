"use client";

import { useState, useMemo } from "react";
import promptsData from "@/data/prompts.json";
import type { Prompt } from "@/types/prompt";
import PromptCard from "@/components/PromptCard";
import FilterBar from "@/components/FilterBar";

const allPrompts = promptsData as Prompt[];

export default function Home() {
  const [phase, setPhase]   = useState("");
  const [role, setRole]     = useState("");
  const [search, setSearch] = useState("");

  const filteredPrompts = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allPrompts.filter((p) => {
      if (phase && p.phase !== phase) return false;
      if (role  && p.role  !== role)  return false;
      if (q && !p.title.toLowerCase().includes(q) && !p.prompt.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [phase, role, search]);

  return (
    <>
      {/* Top bar */}
      <header className="bg-[#1f2328] text-white px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#adb5bd] mb-1">
            IBM Consulting · Learning &amp; Knowledge
          </p>
          <h1 className="text-xl font-semibold leading-tight">
            L&amp;K Prompt Library
          </h1>
          <p className="text-[13px] text-[#adb5bd] mt-1">
            AI prompts for every role across the ADDIE learning development lifecycle.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 py-6">
        <div className="max-w-6xl mx-auto">

          {/* Instructions banner */}
          <div className="bg-[#f7f8fa] border border-[#e5e7eb] rounded px-4 py-3 mb-4 text-[13px] text-[#57606a] leading-relaxed">
            Use the drop-down menus to search for prompts by ADDIE phase, EdDev development role, or keyword. If you would like to add or have suggestions on improving a prompt, please contact the{" "}
            <a href="mailto:jostone@us.ibm.com" className="text-[#0f62fe] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0f62fe] rounded">administrator</a>.
          </div>

          <FilterBar
            phase={phase}
            role={role}
            search={search}
            onPhaseChange={setPhase}
            onRoleChange={setRole}
            onSearchChange={setSearch}
            totalCount={allPrompts.length}
            filteredCount={filteredPrompts.length}
          />

          {filteredPrompts.length === 0 ? (
            <div className="text-center py-16 text-[#57606a]">
              <p className="text-base font-semibold text-[#1f2328] mb-1">No prompts found</p>
              <p className="text-[13px]">Try adjusting your filters or search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrompts.map((p) => (
                <PromptCard key={p.id} prompt={p} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] px-6 py-4 text-center text-[11px] text-[#adb5bd]">
        IBM Consulting · Learning &amp; Knowledge · L&amp;K Prompt Library
      </footer>
    </>
  );
}
