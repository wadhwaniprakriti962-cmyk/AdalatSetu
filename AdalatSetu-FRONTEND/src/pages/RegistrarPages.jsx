import { Check, FileText, Search, X, ArrowRight, ExternalLink, AlertTriangle, BarChart3, Clock3 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrarShell } from "../components/layout";
import { Badge, Modal, StatusBadge, SuccessBanner, EmptyState } from "../components/common";
import { useApp } from "../context/AppContext";
import { citationPrecedents, docketCases } from "../data/mockData";

export function RegistrarVerifyPage() {
  const { filings, updateFilingStatus } = useApp();
  const [selectedId, setSelectedId] = useState(null);
  const [returnOpen, setReturnOpen] = useState(false);
  const selected = filings.find(f => f.id === selectedId);
  const pending = filings.filter(f => f.status === "Pending Review");
  return (
    <RegistrarShell>
      <div className="mb-7">
        <div className="mono-label">Dashboard &nbsp;&gt;&nbsp; Verify Cases</div>
        <h1 className="page-title mt-2">Pending Verification Queue</h1>
        <p className="mt-2 text-[#58423b]">Review AI-extracted filing data before the case enters the administrative workflow.</p>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#be6f5a]/15 p-5">
          <div><h2 className="section-title">Filing Queue</h2><p className="mt-1 text-sm text-[#58423b]">{pending.length} pending filing{pending.length !== 1 ? "s" : ""}</p></div>
          <button className="secondary-btn"><Search size={17}/> Search cases</button>
        </div>
        {pending.length === 0 ? (
          <div className="p-6"><EmptyState title="No pending filings" text="All filings in the mock queue have been reviewed." /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="border-b-2 border-[#370c05] bg-[#fff8f6]">
                <tr className="text-left mono-label">
                  <th className="px-5 py-4">Case ID</th><th className="px-5 py-4">Type</th><th className="px-5 py-4">Party Count</th><th className="px-5 py-4">Complexity</th><th className="px-5 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((f, i) => (
                  <tr key={f.id} className={`${i % 2 ? "bg-[#be6f5a]/5" : ""} cursor-pointer border-b border-[#be6f5a]/10 hover:bg-[#fff0ee]`} onClick={() => setSelectedId(f.id)}>
                    <td className="px-5 py-5 font-mono text-sm font-semibold text-[#a8370e]">{f.id}</td>
                    <td className="px-5 py-5">{f.type}</td><td className="px-5 py-5">{f.partyCount}</td><td className="px-5 py-5"><Badge>{f.complexity}</Badge></td><td className="px-5 py-5"><StatusBadge status={f.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className="mt-7">
          <FilingReview filing={selected} onApprove={() => updateFilingStatus(selected.id, "Approved")} onReturn={() => setReturnOpen(true)} />
        </div>
      )}

      <Modal open={returnOpen} title="Return Filing with Defect?" onClose={() => setReturnOpen(false)}>
        <p className="text-[#58423b]">The filing will leave the pending verification queue.</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          {selected?.flags.map(flag => <li key={flag}>{flag}</li>)}
        </ul>
        <div className="mt-6 flex justify-end gap-3">
          <button className="secondary-btn" onClick={() => setReturnOpen(false)}>Cancel</button>
          <button className="primary-btn" onClick={() => { updateFilingStatus(selected.id, "Returned with Defect"); setReturnOpen(false); }}>Confirm Return</button>
        </div>
      </Modal>
    </RegistrarShell>
  );
}

function FilingReview({ filing, onApprove, onReturn }) {
  const [approved, setApproved] = useState(false);
  return (
    <section className="card-lg overflow-hidden">
      <div className="border-b border-[#be6f5a]/15 px-6 py-5 lg:px-8">
        <div className="mono-label">Filing review</div>
        <h2 className="section-title mt-1">{filing.id}</h2>
      </div>
      <div className="grid lg:grid-cols-2">
        <div className="border-b border-[#be6f5a]/15 bg-[#fff8f6] p-6 lg:border-b-0 lg:border-r lg:p-8">
          <div className="mono-label">Original document</div>
          <div className="mt-4 flex min-h-[330px] items-center justify-center rounded-lg border border-[#be6f5a]/20 bg-white p-6">
            <div className="w-full max-w-[330px] border border-[#be6f5a]/20 bg-white p-7 shadow-[0_4px_12px_rgba(55,12,5,0.08)]">
              <div className="text-center font-serif text-sm font-bold">DISTRICT COURT</div>
              <div className="mt-5 h-2 w-2/3 bg-[#ffe9e5]"/><div className="mt-3 h-2 w-full bg-[#ffe9e5]"/><div className="mt-3 h-2 w-5/6 bg-[#ffe9e5]"/>
              <div className="mt-8 border-t border-[#be6f5a]/20 pt-4 font-mono text-[10px] text-[#8c7169]">FIL/{filing.id}/PAGE 01</div>
              <div className="mt-5 space-y-2"><div className="h-2 w-full bg-[#fff0ee]"/><div className="h-2 w-11/12 bg-[#fff0ee]"/><div className="h-2 w-4/5 bg-[#fff0ee]"/><div className="h-2 w-full bg-[#fff0ee]"/></div>
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-xs text-[#8c7169]">Mock document preview</p>
        </div>
        <div className="p-6 lg:p-8">
          <div className="mono-label">Auto-extracted data</div>
          <div className="mt-5 space-y-5">
            <DataRow label="Case Type" value={filing.type}/>
            <DataRow label="Parties" value={filing.parties.join(" vs. ")}/>
            <DataRow label="Relevant Sections" value={filing.sections}/>
            <DataRow label="Page Count" value={filing.pageCount}/>
            <DataRow label="Predicted Complexity" value={filing.complexity}/>
          </div>
          <div className="mt-7 border-t border-[#be6f5a]/15 pt-6">
            <div className="mono-label flex items-center gap-2"><AlertTriangle size={15}/> System Flags</div>
            {filing.flags.length ? <ul className="mt-3 space-y-2 text-sm">{filing.flags.map(flag => <li key={flag} className="rounded-lg bg-[#fff1df] p-3">{flag}</li>)}</ul> : <p className="mt-3 text-sm text-[#58423b]">No system flags.</p>}
          </div>
          {approved && <div className="mt-6"><SuccessBanner>Filing approved. The underlying queue status is now <strong>Approved</strong>.</SuccessBanner></div>}
          <div className="mt-7 flex flex-wrap justify-end gap-3">
            <button className="secondary-btn" onClick={onReturn}><X size={17}/> Return with Defect</button>
            <button className="primary-btn" disabled={filing.status !== "Pending Review"} onClick={() => { onApprove(); setApproved(true); }}><Check size={17}/> {filing.status === "Approved" ? "Filing Approved" : "Approve Filing"}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataRow({ label, value }) {
  return <div><div className="mono-label">{label}</div><div className="mt-1 leading-6">{value}</div></div>;
}

export function RegistrarCitationPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const { setCitation } = useApp();
  const navigate = useNavigate();
  const submit = e => {
    e.preventDefault();
    if (!value.trim()) { setError("Enter a legal citation to continue."); return; }
    setError("");
    setCitation(value.trim());
    navigate("/registrar/citation/payment");
  };
  return (
    <RegistrarShell>
      <div className="mx-auto max-w-[900px]">
        <div className="mono-label">Verify Cases &nbsp;&gt;&nbsp; Citation Checker</div>
        <h1 className="page-title mt-2">Verify Legal Citation</h1>
        <p className="mt-3 max-w-2xl text-[#58423b]">Enter a legal citation to verify its validity and check for relevant precedents via the external verification API.</p>
        <form onSubmit={submit} className="card-lg mt-8 p-7 lg:p-9">
          <label htmlFor="citation" className="mono-label block">Legal Citation</label>
          <input id="citation" className="input mt-3" value={value} onChange={e => setValue(e.target.value)} placeholder="e.g., Section 138, Negotiable Instruments Act" />
          {error && <p className="mt-2 text-sm text-[#93000a]">{error}</p>}
          <button className="primary-btn mt-6"><FileText size={18}/> Check Citation &amp; Pay Fee</button>
        </form>
        <div className="mt-6 rounded-lg border border-[#be6f5a]/20 bg-[#fff0ee] p-4 text-sm text-[#58423b]">
          Prototype note: citation verification is simulated locally. No external API request is made.
        </div>
      </div>
    </RegistrarShell>
  );
}

export function RegistrarPaymentPage() {
  const { citation, paymentStatus, verificationStatus, setPaymentStatus, setVerificationStatus } = useApp();
  const [failure, setFailure] = useState(false);

  const start = () => {
    setFailure(false);
    setPaymentStatus("processing");
    setVerificationStatus("pending");
    setTimeout(() => {
      setPaymentStatus("paid");
      setVerificationStatus("verifying");
      setTimeout(() => setVerificationStatus("verified"), 1100);
    }, 1100);
  };

  const isBusy = paymentStatus === "processing" || verificationStatus === "verifying";
  return (
    <RegistrarShell>
      <div className="mx-auto max-w-[980px]">
        <div className="mono-label">Dashboard &nbsp;&gt;&nbsp; Verify Cases &nbsp;&gt;&nbsp; Citation Verification</div>
        <h1 className="page-title mt-2">Citation Verification Payment</h1>

        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_300px]">
          <section className="card-lg p-7 lg:p-9">
            <h2 className="section-title border-b-2 border-[#a8370e] pb-3 inline-block">Payment Details</h2>
            <div className="mt-7 space-y-0">
              <Detail label="Citation" value={citation || "Section 138, Negotiable Instruments Act"} />
              <Detail label="Verification Service" value="External Legal Verification API" />
              <Detail label="Fee" value="0.01 ALGO" valueClass="font-semibold text-[#93000a]" />
              <Detail label="Network" value="Algorand Testnet" />
              <Detail label="Payment Method" value="x402 Agentic Payment" />
            </div>
            <div className="mt-7 flex items-center justify-between border-t border-[#be6f5a]/15 pt-6">
              <span className="mono-label">Status</span>
              {paymentStatus === "paid" ? <StatusBadge status="Successful"/> : paymentStatus === "processing" ? <Badge tone="warning">Processing...</Badge> : <Badge tone="danger">Payment Required</Badge>}
            </div>

            {verificationStatus === "verified" && (
              <div className="mt-6"><SuccessBanner><strong>Verification Complete</strong><div className="mt-1">Citation verified successfully against mock legal verification data.</div></SuccessBanner></div>
            )}
            {failure && <div className="mt-6"><EmptyState title="Payment failure" text="The mock payment did not complete. Try authorization again." /></div>}

            <div className="mt-7 border-t border-[#be6f5a]/15 pt-6">
              <button className="primary-btn ml-auto w-full sm:w-auto" disabled={isBusy || verificationStatus === "verified"} onClick={start}>
                {isBusy ? <Clock3 className="animate-pulse" size={18}/> : verificationStatus === "verified" ? <Check size={18}/> : <ExternalLink size={18}/>}
                {paymentStatus === "processing" ? "Processing..." : verificationStatus === "verifying" ? "Verifying..." : verificationStatus === "verified" ? "Verification Complete" : "Authorize Payment & Verify"}
              </button>
              <p className="mt-3 text-right font-mono text-[11px] text-[#8c7169]">Frontend mock • No real Algorand transaction</p>
            </div>
          </section>

          <aside className="card-lg bg-[#fff0ee] p-7">
            <div className="mono-label">Verification flow</div>
            <div className="mt-7 space-y-0">
              <FlowStep label="Citation" done={true}/>
              <FlowStep label="x402 Payment" done={paymentStatus === "processing" || paymentStatus === "paid"} active={paymentStatus === "processing"}/>
              <FlowStep label="Algorand Testnet" done={paymentStatus === "paid"} active={paymentStatus === "paid"}/>
              <FlowStep label="Verification" done={verificationStatus === "verified"} active={verificationStatus === "verifying"}/>
            </div>
          </aside>
        </div>
      </div>
    </RegistrarShell>
  );
}

function Detail({ label, value, valueClass = "" }) {
  return <div className="grid grid-cols-[185px_1fr] gap-4 border-b border-[#be6f5a]/15 py-4"><span className="mono-label">{label}</span><span className={valueClass}>{value}</span></div>;
}
function FlowStep({ label, done, active }) {
  return <div className="relative flex items-center gap-4 py-4"><div className={`z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${done ? "bg-[#ffdbd0] text-[#842400]" : "bg-[#ffe9e5] text-[#8c7169]"}`}>{done ? <Check size={17}/> : <span className="h-2 w-2 rounded-full bg-current opacity-60"/>}</div><span className={`${active ? "font-semibold text-[#a8370e]" : done ? "text-[#370c05]" : "text-[#8c7169]"}`}>{label}</span></div>;
}

export function RegistrarDocketPage() {
  return (
    <RegistrarShell>
      <div className="mb-7"><div className="mono-label">Registrar &nbsp;&gt;&nbsp; Court Docket</div><h1 className="page-title mt-2">Court Docket</h1><p className="mt-2 text-[#58423b]">Today's mock hearing schedule and administrative status.</p></div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b-2 border-[#370c05] bg-[#fff8f6]"><tr className="mono-label text-left"><th className="px-5 py-4">Case ID</th><th className="px-5 py-4">Case Type</th><th className="px-5 py-4">Hearing Date</th><th className="px-5 py-4">Time</th><th className="px-5 py-4">Complexity</th><th className="px-5 py-4">Status</th></tr></thead>
            <tbody>{docketCases.map((c,i)=><tr key={c.id} className={`${i%2 ? "bg-[#be6f5a]/5" : ""} border-b border-[#be6f5a]/10`}><td className="px-5 py-5 font-mono text-sm font-semibold text-[#a8370e]">{c.id}</td><td className="px-5 py-5">{c.type}</td><td className="px-5 py-5">{c.date}</td><td className="px-5 py-5">{c.time}</td><td className="px-5 py-5"><Badge>{c.complexity}</Badge></td><td className="px-5 py-5"><StatusBadge status={c.status}/></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </RegistrarShell>
  );
}

export function RegistrarAnalyticsPage() {
  const { filings } = useApp();
  const counts = {
    pending: filings.filter(f => f.status === "Pending Review").length,
    approved: filings.filter(f => f.status === "Approved").length,
    returned: filings.filter(f => f.status === "Returned with Defect").length
  };
  return (
    <RegistrarShell>
      <div className="mb-7"><div className="mono-label">Registrar &nbsp;&gt;&nbsp; Analytics</div><h1 className="page-title mt-2">Administrative Analytics</h1><p className="mt-2 text-[#58423b]">Mock operational metrics for the verification workflow.</p></div>
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Pending filings" value={counts.pending}/><Metric label="Approved filings" value={counts.approved}/><Metric label="Returned filings" value={counts.returned}/>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="card p-6"><div className="flex items-center gap-2 font-semibold"><BarChart3 size={19} className="text-[#a8370e]"/> Cases by complexity</div><div className="mt-6 space-y-4"><Bar label="Complex" value={1} total={3}/><Bar label="Medium" value={1} total={3}/><Bar label="Simple" value={1} total={3}/></div></section>
        <section className="card p-6"><div className="flex items-center gap-2 font-semibold"><Clock3 size={19} className="text-[#a8370e]"/> Average verification time</div><div className="mt-6 text-4xl font-semibold">8.4 min</div><p className="mt-2 text-sm text-[#58423b]">Mock estimate based on recent filing reviews.</p><div className="mt-6 rounded-lg bg-[#fff0ee] p-4 text-sm">AI extraction assists the registrar by surfacing complexity and document flags for human review.</div></section>
      </div>
    </RegistrarShell>
  );
}
function Metric({label,value}){return <div className="card p-6"><div className="mono-label">{label}</div><div className="mt-3 text-4xl font-semibold">{value}</div></div>}
function Bar({label,value,total}){return <div><div className="mb-2 flex justify-between text-sm"><span>{label}</span><span className="font-mono">{value}</span></div><div className="h-3 rounded-full bg-[#fff0ee]"><div className="h-3 rounded-full bg-[#a8370e]" style={{width:`${value/total*100}%`}}/></div></div>}
