"use client";

import type { ADDIEPhase, Role, LearningType, DeliveryType } from "@/types/prompt";

const PHASES: ADDIEPhase[] = [
  "Analysis",
  "Design",
  "Development",
  "Implementation",
  "Evaluation",
];

const ROLES: Role[] = [
  "Instructional Designer",
  "Iteration Manager",
  "Programmer",
  "Visual Designer",
  "QA",
];

const LEARNING_TYPES: LearningType[] = [
  "ILT",
  "Self-Paced eLearning",
  "Microlearning",
  "Scenario-based",
  "Experiential",
  "Social and Collaborative",
  "Coaching and Mentoring",
  "Performance Support",
  "Assessment and Practice",
  "Adaptive and Personalized",
  "Blended Learning",
  "Other",
];

const DELIVERY_TYPES: DeliveryType[] = [
  "iSPO",
  "Video",
  "AI-Assisted Review",
  "Podcast",
  "Chatbot",
  "Job Aid",
  "Workshop Activity",
  "Other",
];

interface FilterBarProps {
  phase: string;
  role: string;
  learningType: string;
  deliveryType: string;
  search: string;
  onPhaseChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onLearningTypeChange: (value: string) => void;
  onDeliveryTypeChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  totalCount: number;
  filteredCount: number;
}

const selectClass =
  "w-full rounded border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] text-[#1f2328] focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:border-[#0f62fe] appearance-none cursor-pointer";

export default function FilterBar({
  phase,
  role,
  learningType,
  deliveryType,
  search,
  onPhaseChange,
  onRoleChange,
  onLearningTypeChange,
  onDeliveryTypeChange,
  onSearchChange,
  totalCount,
  filteredCount,
}: FilterBarProps) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded px-4 py-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* ADDIE Phase */}
        <div>
          <label htmlFor="filter-phase" className="block text-[10px] font-semibold uppercase tracking-wider text-[#57606a] mb-1">
            ADDIE Phase
          </label>
          <div className="relative">
            <select id="filter-phase" value={phase} onChange={(e) => onPhaseChange(e.target.value)} className={selectClass}>
              <option value="">All Phases</option>
              {PHASES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Role */}
        <div>
          <label htmlFor="filter-role" className="block text-[10px] font-semibold uppercase tracking-wider text-[#57606a] mb-1">
            Role
          </label>
          <div className="relative">
            <select id="filter-role" value={role} onChange={(e) => onRoleChange(e.target.value)} className={selectClass}>
              <option value="">All Roles</option>
              {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Learning Type */}
        <div>
          <label htmlFor="filter-learning-type" className="block text-[10px] font-semibold uppercase tracking-wider text-[#57606a] mb-1">
            Learning Type
          </label>
          <div className="relative">
            <select id="filter-learning-type" value={learningType} onChange={(e) => onLearningTypeChange(e.target.value)} className={selectClass}>
              <option value="">All Learning Types</option>
              {LEARNING_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Delivery Type */}
        <div>
          <label htmlFor="filter-delivery-type" className="block text-[10px] font-semibold uppercase tracking-wider text-[#57606a] mb-1">
            Delivery Type
          </label>
          <div className="relative">
            <select id="filter-delivery-type" value={deliveryType} onChange={(e) => onDeliveryTypeChange(e.target.value)} className={selectClass}>
              <option value="">All Delivery Types</option>
              {DELIVERY_TYPES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <ChevronIcon />
          </div>
        </div>

        {/* Search — spans remaining columns */}
        <div className="sm:col-span-2 lg:col-span-2">
          <label htmlFor="filter-search" className="block text-[10px] font-semibold uppercase tracking-wider text-[#57606a] mb-1">
            Search
          </label>
          <input
            id="filter-search"
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search prompts..."
            className="w-full rounded border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] text-[#1f2328] placeholder-[#adb5bd] focus:outline-none focus:ring-2 focus:ring-[#0f62fe] focus:border-[#0f62fe]"
          />
        </div>
      </div>

      {/* Result count */}
      <p className="mt-3 text-[11px] text-[#57606a]">
        Showing <span className="font-semibold text-[#1f2328]">{filteredCount}</span> of{" "}
        <span className="font-semibold text-[#1f2328]">{totalCount}</span> prompts
      </p>
    </div>
  );
}

function ChevronIcon() {
  return (
    <span className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center" aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 4.5l3 3 3-3" stroke="#57606a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}
