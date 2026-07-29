"use client";

import { useState } from "react";
import type { Prompt, ADDIEPhase, Role } from "@/types/prompt";

const VALID_PHASES: ADDIEPhase[] = [
  "Analysis", "Design", "Development", "Implementation", "Evaluation",
];
const VALID_ROLES: Role[] = [
  "Instructional Designer", "Iteration Manager", "Programmer", "Visual Designer", "QA",
];

interface ParsedRow {
  row: number;
  data: Partial<Prompt>;
  errors: string[];
}

function parseRows(raw: string): ParsedRow[] {
  const lines = raw.trim().split("\n").filter((l) => l.trim() !== "");
  return lines.map((line, i) => {
    // Split on tab (Excel/Sheets copy) — fall back to comma
    const cells = line.includes("\t") ? line.split("\t") : line.split(",");
    const [id, title, phase, role, ...promptParts] = cells.map((c) => c.trim());
    const prompt = promptParts.join(line.includes("\t") ? "\t" : ",").trim();

    const errors: string[] = [];
    if (!title)  errors.push("title is empty");
    if (!phase)  errors.push("phase is empty");
    else if (!VALID_PHASES.includes(phase as ADDIEPhase))
      errors.push(`phase "${phase}" is not valid — must be one of: ${VALID_PHASES.join(", ")}`);
    if (!role)   errors.push("role is empty");
    else if (!VALID_ROLES.includes(role as Role))
      errors.push(`role "${role}" is not valid — must be one of: ${VALID_ROLES.join(", ")}`);
    if (!prompt) errors.push("prompt text is empty");

    return {
      row: i + 1,
      data: { id: id || undefined, title, phase: phase as ADDIEPhase, role: role as Role, prompt },
      errors,
    };
  });
}

const PHASE_COLOURS: Record<string, string> = {
  Analysis: "#0f62fe", Design: "#8a3ffc", Development: "#198038",
  Implementation: "#ff832b", Evaluation: "#da1e28",
};

export default function AdminPage() {
  const [raw, setRaw]         = useState("");
  const [parsed, setParsed]   = useState<ParsedRow[] | null>(null);
  const [json, setJson]       = useState("");
  const [copied, setCopied]   = useState(false);

  function handleParse() {
    if (!raw.trim()) return;
    setParsed(parseRows(raw));
    setJson("");
    setCopied(false);
  }

  function handleGenerate() {
    if (!parsed) return;
    const valid = parsed.filter((r) => r.errors.length === 0).map((r) => r.data);
    setJson(JSON.stringify(valid, null, 2));
  }

  function handleCopy() {
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleReset() {
    setRaw("");
    setParsed(null);
    setJson("");
    setCopied(false);
  }

  const validCount   = parsed ? parsed.filter((r) => r.errors.length === 0).length : 0;
  const invalidCount = parsed ? parsed.filter((r) => r.errors.length >  0).length : 0;

  return (
    <>
      {/* Top bar */}
      <header className="bg-[#1f2328] text-white px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#adb5bd] mb-1">
            IBM Consulting · Learning &amp; Knowledge
          </p>
          <h1 className="text-xl font-semibold leading-tight">
            L&amp;K Prompt Library — Admin Import
          </h1>
          <p className="text-[13px] text-[#adb5bd] mt-1">
            Paste spreadsheet rows to convert them to JSON for import into <code className="text-[#adb5bd] font-mono text-[11px]">data/prompts.json</code>
          </p>
        </div>
      </header>

      <main className="flex-1 px-6 py-6">
        <div className="max-w-4xl mx-auto">

          {/* Instructions */}
          <div className="bg-[#f7f8fa] border border-[#e5e7eb] border-l-4 border-l-[#0f62fe] rounded px-4 py-3 mb-6 text-[13px] text-[#57606a] leading-relaxed">
            <p className="font-semibold text-[#1f2328] mb-1">How to use this tool</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open your intake spreadsheet in Excel or Google Sheets</li>
              <li>Select all rows (excluding the header row) and copy (<kbd className="bg-[#e5e7eb] px-1 rounded text-[11px]">Ctrl+C</kbd>)</li>
              <li>Paste into the box below and click <strong>Parse rows</strong></li>
              <li>Review the preview — fix any errors in your spreadsheet and re-paste if needed</li>
              <li>Click <strong>Generate JSON</strong> then <strong>Copy JSON</strong></li>
              <li>Go to <code className="font-mono text-[11px]">data/prompts.json</code> on GitHub, click edit, and paste the new entries inside the array</li>
            </ol>
          </div>

          {/* Column order reminder */}
          <div className="bg-white border border-[#e5e7eb] rounded px-4 py-3 mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#57606a] mb-2">Expected column order</p>
            <div className="flex flex-wrap gap-2">
              {["1. id (optional)", "2. title", "3. phase", "4. role", "5. prompt"].map((col) => (
                <span key={col} className="text-[11px] font-mono bg-[#f7f8fa] border border-[#e5e7eb] px-2 py-1 rounded">
                  {col}
                </span>
              ))}
            </div>
          </div>

          {/* Paste area */}
          <div className="mb-4">
            <label htmlFor="paste-area" className="block text-[10px] font-semibold uppercase tracking-wider text-[#57606a] mb-1">
              Paste spreadsheet rows here
            </label>
            <textarea
              id="paste-area"
              value={raw}
              onChange={(e) => { setRaw(e.target.value); setParsed(null); setJson(""); }}
              placeholder={"id-analysis-4\tWrite a Stakeholder Interview Guide\tAnalysis\tInstructional Designer\tYou are an instructional designer…"}
              rows={8}
              className="w-full rounded border border-[#e5e7eb] bg-white px-3 py-2 text-[12px] font-mono text-[#1f2328] placeholder-[#adb5bd] focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:border-[#0f62fe] resize-y"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handleParse}
              disabled={!raw.trim()}
              className="px-4 py-2 text-[13px] font-semibold bg-[#1f2328] text-white rounded hover:bg-[#2d3340] disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-1"
            >
              Parse rows
            </button>
            {parsed && validCount > 0 && (
              <button
                onClick={handleGenerate}
                className="px-4 py-2 text-[13px] font-semibold bg-[#0f62fe] text-white rounded hover:bg-[#0353e9] focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-1"
              >
                Generate JSON ({validCount} prompt{validCount !== 1 ? "s" : ""})
              </button>
            )}
            {(raw || parsed) && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-[13px] font-medium text-[#57606a] border border-[#e5e7eb] bg-white rounded hover:bg-[#f7f8fa] focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-1"
              >
                Reset
              </button>
            )}
          </div>

          {/* Parse preview */}
          {parsed && (
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#57606a]">
                  Preview — {parsed.length} row{parsed.length !== 1 ? "s" : ""} parsed
                </p>
                {validCount > 0 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#defbe6] text-[#198038]">
                    {validCount} valid
                  </span>
                )}
                {invalidCount > 0 && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#fff1f1] text-[#da1e28]">
                    {invalidCount} with errors
                  </span>
                )}
              </div>

              <div className="space-y-2">
                {parsed.map((r) => (
                  <div
                    key={r.row}
                    className="bg-white border rounded px-4 py-3"
                    style={{ borderColor: r.errors.length > 0 ? "#da1e28" : "#e5e7eb" }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-[#57606a]">Row {r.row}</span>
                          {r.data.phase && PHASE_COLOURS[r.data.phase] && (
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded text-white" style={{ background: PHASE_COLOURS[r.data.phase] }}>
                              {r.data.phase}
                            </span>
                          )}
                          {r.data.role && (
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded text-white bg-[#1f2328]">
                              {r.data.role}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] font-semibold text-[#1f2328]">
                          {r.data.title || <span className="text-[#da1e28]">— no title —</span>}
                        </p>
                        {r.data.prompt && (
                          <p className="text-[11px] text-[#57606a] mt-1 line-clamp-2">
                            {r.data.prompt.slice(0, 120)}{r.data.prompt.length > 120 ? "…" : ""}
                          </p>
                        )}
                      </div>
                      {r.errors.length === 0 ? (
                        <span className="text-[11px] font-semibold text-[#198038] shrink-0">✓ Valid</span>
                      ) : (
                        <span className="text-[11px] font-semibold text-[#da1e28] shrink-0">✗ Error</span>
                      )}
                    </div>
                    {r.errors.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {r.errors.map((e, i) => (
                          <li key={i} className="text-[11px] text-[#da1e28]">· {e}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* JSON output */}
          {json && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#57606a]">
                  Generated JSON — paste into <code className="font-mono">data/prompts.json</code>
                </p>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:ring-offset-1"
                  style={copied
                    ? { background: "#198038", color: "#fff", borderColor: "#198038" }
                    : { background: "#fff", color: "#1f2328", borderColor: "#e5e7eb" }}
                >
                  {copied ? "✓ Copied!" : "Copy JSON"}
                </button>
              </div>
              <textarea
                readOnly
                value={json}
                rows={14}
                className="w-full rounded border border-[#e5e7eb] bg-[#f7f8fa] px-3 py-2 text-[11px] font-mono text-[#1f2328] focus:outline-none focus:ring-2 focus:ring-[#0f62fe] resize-y"
              />
              <p className="mt-2 text-[11px] text-[#57606a]">
                Paste these entries inside the <code className="font-mono text-[11px]">[&nbsp;]</code> array in <code className="font-mono text-[11px]">data/prompts.json</code> on GitHub. Add a comma after the last existing entry before pasting.
              </p>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e5e7eb] px-6 py-4 text-center text-[11px] text-[#adb5bd]">
        IBM Consulting · Learning &amp; Knowledge · L&amp;K Prompt Library Admin
      </footer>
    </>
  );
}
