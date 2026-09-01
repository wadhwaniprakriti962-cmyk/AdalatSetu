import { ArrowLeft, Check, ChevronDown, ChevronUp, Clock3, Eye, Gavel, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JudgeShell, BackButton } from "../components/layout";
import { AIChip, Badge, Modal, SuccessBanner } from "../components/common";
import { useApp } from "../context/AppContext";

function DocketCard({ caseItem, onOverride }) {
  const { expandedAIInsights, toggleAI, judgeOverrides, overrideReasons } = useApp();
  const expanded = expandedAIInsights[caseItem.id];
  const overridden = judgeOverrides[caseItem.id];
  return (
    <article className="card relative overflow-hidden">
      <div className="absolute left-0 top-0 h-full w-1 bg-[#a8370e]"/>
      <div className="p-6 pl-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-mono text-sm font-semibold text-[#a8370e]">{caseItem.id}</div>
            <h3 className="mt-1 text-xl font-semibold">{caseItem.title}</h3>
            <div className="mt-2 text-sm text-[#58423b]">{caseItem.type} · {caseItem.stage} · {caseItem.duration}</div>
          </div>
          <div className="flex items-center gap-2"><Clock3 size={17} className="text-[#8c7169]"/><span className="font-mono text-sm">{caseItem.time}</span></div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">{caseItem.tags.map(t=><Badge key={t}>{t}</Badge>)}{caseItem.aiRecommendation && <AIChip/>}</div>
        {caseItem.description && <p className="mt-4 text-sm leading-6 text-[#58423b]">{caseItem.description}</p>}
        {overridden && <div className="mt-5"><SuccessBanner><strong>Judge Override</strong><div className="mt-1 text-sm">AI recommendation manually overridden. Reason: {overrideReasons[caseItem.id]}</div></SuccessBanner></div>}
        {expanded && <div className="mt-5 rounded-lg border border-[#be6f5a]/20 bg-[#fff1df] p-4"><div className="flex items-center gap-2 font-semibold"><Sparkles size={16}/> Why this suggestion?</div><p className="mt-2 text-sm leading-6 text-[#58423b]">{caseItem.aiExplanation}</p><p className="mt-3 font-mono text-[11px] text-[#8c7169]">AI-assisted suggestion only. Judge remains the final decision-maker.</p></div>}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          {caseItem.aiRecommendation && <button className="secondary-btn" onClick={() => toggleAI(caseItem.id)}>{expanded ? <ChevronUp size={17}/> : <ChevronDown size={17}/>} Why this suggestion?</button>}
          {caseItem.aiRecommendation && <button className="primary-btn" onClick={() => onOverride(caseItem.id)}><Gavel size={17}/> {overridden ? "Update Override" : "Override"}</button>}
        </div>
      </div>
    </article>
  );
}

export function JudgeDocketPage() {
  const { judgeCases } = useApp();
  const [overrideId, setOverrideId] = useState(null);
  return (
    <JudgeShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><div className="mono-label">Judge Portal</div><h1 className="page-title mt-2">Today's Docket</h1><p className="mt-2 text-[#58423b]">Morning Session (Simple Cases)</p></div>
        <div className="flex gap-2"><BackButton to="/judge/cases">Case List</BackButton></div>
      </div>
      <div className="mt-7 space-y-5">
        {judgeCases.filter(c => c.id === "WP-2023-441" || c.id === "BA-2024-089").map(c => <DocketCard key={c.id} caseItem={c} onOverride={setOverrideId}/>)}
      </div>
      <OverrideModal id={overrideId} onClose={()=>setOverrideId(null)}/>
    </JudgeShell>
  );
}

function OverrideModal({ id, onClose }) {
  const { judgeCases, setJudgeOverride } = useApp();
  const [reason, setReason] = useState("");
  if (!id) return null;
  const c = judgeCases.find(x => x.id === id);
  return <Modal open={!!id} title="Override AI Suggestion" onClose={onClose}>
    <label className="mono-label block">Reason</label>
    <textarea className="input mt-2 min-h-[110px]" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Enter the reason for the override..." />
    <div className="mt-5 flex justify-end gap-3"><button className="secondary-btn" onClick={onClose}>Cancel</button><button className="primary-btn" disabled={!reason.trim()} onClick={()=>{setJudgeOverride(c.id, reason.trim()); setReason(""); onClose();}}>Confirm Override</button></div>
  </Modal>
}

export function JudgeCaseListPage() {
  const { judgeCases } = useApp();
  const [overrideId, setOverrideId] = useState(null);
  const navigate = useNavigate();
  const groups = [
    ["Complex Cases", judgeCases.filter(c=>c.complexity==="Complex")],
    ["Medium Complexity", judgeCases.filter(c=>c.complexity==="Medium")],
    ["Simple / Routine", judgeCases.filter(c=>c.complexity==="Simple")]
  ];
  return (
    <JudgeShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><div className="mono-label">Hon. Justice Patel · Courtroom 4B</div><h1 className="page-title mt-2">Case List</h1><p className="mt-2 text-[#58423b]">November 14, 2024</p></div>
        <div className="flex rounded-lg border border-[#be6f5a]/20 bg-white p-1">
          <button className="rounded-md px-3 py-2 text-sm" onClick={()=>navigate("/judge/docket")}>Today's Docket</button>
          <button className="rounded-md bg-[#fff0ee] px-3 py-2 text-sm font-semibold text-[#a8370e]">Case List</button>
          <button className="rounded-md px-3 py-2 text-sm" onClick={()=>navigate("/judge/docket-health")}>Docket Health</button>
        </div>
      </div>
      <div className="mt-8 space-y-8">
        {groups.map(([title, cases]) => cases.length > 0 && <section key={title}><div className="mono-label mb-3">{title}</div><div className="space-y-4">{cases.map(c => (
          <article key={c.id} className="card-lg p-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div><div className="font-mono text-sm font-semibold text-[#a8370e]">{c.id}</div><h2 className="mt-1 text-xl font-semibold">{c.title}</h2><p className="mt-2 text-sm text-[#58423b]">{c.type} · {c.stage} · Est. {c.duration}</p><div className="mt-3 flex flex-wrap gap-2">{c.tags.map(t=><Badge key={t}>{t}</Badge>)}</div></div>
              <div className="text-right"><div className="font-mono text-lg">{c.time}</div>{c.aiRecommendation && <AIChip/>}</div>
            </div>
            {c.aiRecommendation && <div className="mt-6 rounded-lg bg-[#fff1df] p-4"><div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#8a4b00]"><Sparkles size={14}/> AI INSIGHT</div><div className="mt-2 font-semibold text-[#842400]">{c.aiRecommendation}</div><p className="mt-2 text-sm leading-6 text-[#58423b]">{c.aiExplanation}</p></div>}
            <div className="mt-5 flex flex-wrap justify-end gap-3">
              <button className="secondary-btn" onClick={()=>navigate(`/judge/cases/${c.id}`)}><Eye size={17}/> View Data</button>
              {c.aiRecommendation && <button className="primary-btn" onClick={()=>setOverrideId(c.id)}><Gavel size={17}/> Override Priority</button>}
            </div>
          </article>
        ))}</div></section>)}
      </div>
      <OverrideModal id={overrideId} onClose={()=>setOverrideId(null)}/>
    </JudgeShell>
  );
}

export function JudgeCaseDetailPage() {
  const { caseId } = useParams();
  const { judgeCases, judgeOverrides, overrideReasons } = useApp();
  const c = judgeCases.find(x=>x.id===caseId);
  if (!c) return <JudgeShell><div className="mt-8"><div className="card p-8"><h1 className="section-title">Case not found</h1><p className="mt-2 text-[#58423b]">No mock case exists for {caseId}.</p><div className="mt-5"><BackButton to="/judge/cases">Back to Case List</BackButton></div></div></div></JudgeShell>;
  return <JudgeShell>
    <BackButton to="/judge/cases">Back to Case List</BackButton>
    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_330px]">
      <section className="card-lg p-7 lg:p-9">
        <div className="mono-label">Case detail</div>
        <div className="mt-2 font-mono text-sm text-[#a8370e]">{c.id}</div>
        <h1 className="mt-2 text-3xl font-semibold">{c.title}</h1>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Info label="Case Type" value={c.type}/><Info label="Stage" value={c.stage}/><Info label="Estimated Duration" value={c.duration}/><Info label="Scheduled Time" value={c.time}/>
        </div>
        {c.description && <div className="mt-7 border-t border-[#be6f5a]/15 pt-6"><div className="mono-label">Description</div><p className="mt-2 leading-7 text-[#58423b]">{c.description}</p></div>}
      </section>
      <aside className="space-y-5">
        {c.aiRecommendation && <section className="card-lg p-6"><AIChip/><div className="mt-4 font-semibold text-[#842400]">{c.aiRecommendation}</div><p className="mt-3 text-sm leading-6 text-[#58423b]">{c.aiExplanation}</p></section>}
        {judgeOverrides[c.id] && <SuccessBanner><strong>Judge Override</strong><div className="mt-1 text-sm">{overrideReasons[c.id]}</div></SuccessBanner>}
      </aside>
    </div>
  </JudgeShell>;
}
function Info({label,value}){return <div><div className="mono-label">{label}</div><div className="mt-1">{value}</div></div>}

export function JudgeDocketHealthPage() {
  const { judgeCases } = useApp();
  const complex = judgeCases.filter(c=>c.complexity==="Complex").length;
  const medium = judgeCases.filter(c=>c.complexity==="Medium").length;
  const simple = judgeCases.filter(c=>c.complexity==="Simple").length;
  return <JudgeShell>
    <div><div className="mono-label">Judge Portal &nbsp;&gt;&nbsp; Docket Health</div><h1 className="page-title mt-2">Docket Health</h1><p className="mt-2 text-[#58423b]">A concise view of scheduling pressure across today's mock docket.</p></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <HealthMetric label="Total cases" value={judgeCases.length}/><HealthMetric label="Complex cases" value={complex}/><HealthMetric label="Medium cases" value={medium}/><HealthMetric label="Simple cases" value={simple}/>
    </div>
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <section className="card-lg p-7"><div className="mono-label">Estimated docket duration</div><div className="mt-3 text-4xl font-semibold">3h 20m</div><p className="mt-2 text-sm text-[#58423b]">Mock estimate across scheduled matters.</p></section>
      <section className="card-lg p-7"><div className="mono-label">Potential scheduling pressure</div><div className="mt-3 text-4xl font-semibold text-[#842400]">Moderate</div><div className="mt-4 h-3 rounded-full bg-[#fff0ee]"><div className="h-3 w-[62%] rounded-full bg-[#e4914b]"/></div><p className="mt-3 text-sm text-[#58423b]">AI-assisted indicators flag matters that may deserve earlier attention, without replacing judicial discretion.</p></section>
    </div>
  </JudgeShell>;
}
function HealthMetric({label,value}){return <div className="card p-5"><div className="mono-label">{label}</div><div className="mt-3 text-3xl font-semibold">{value}</div></div>}
