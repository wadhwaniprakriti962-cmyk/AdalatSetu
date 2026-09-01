import { ArrowRight, BriefcaseBusiness, Gavel, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const roles = [
  { key: "litigant", title: "Litigant", description: "Check your case status, next hearing dates, and view public orders.", icon: Scale, path: "/litigant" },
  { key: "registrar", title: "Registrar", description: "Manage filings, handle case intake triage, and oversee administrative workflows.", icon: BriefcaseBusiness, path: "/registrar/verify" },
  { key: "judge", title: "Judge", description: "View the daily docket, schedule hearings, and access AI-assisted case summaries.", icon: Gavel, path: "/judge/docket" }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { setRole } = useApp();
  return (
    <div className="app-bg min-h-screen">
      <header className="border-b border-[#be6f5a]/15 bg-white/80">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-5 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#a8370e] text-white"><Scale size={23}/></div>
            <div><div className="text-xl font-bold text-[#842400]">AdalatSetu</div><div className="font-mono text-[11px] text-[#58423b]">Judicial Workflow Platform</div></div>
          </div>
          <div className="rounded-lg border border-[#be6f5a]/25 px-3 py-2 font-mono text-xs text-[#842400]">Prototype / Testnet</div>
        </div>
      </header>

      <main className="mx-auto max-w-[1240px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="max-w-3xl">
          <div className="mono-label mb-4">AI-assisted judicial workflow</div>
          <h1 className="text-5xl font-bold leading-tight tracking-[-0.03em] text-[#370c05] md:text-6xl">
            Smarter Scheduling.<br/>Faster Justice.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#58423b]">
            AdalatSetu bridges the gap between traditional court processes and modern efficiency. Select your portal to proceed.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {roles.map(({key, title, description, icon: Icon, path}) => (
            <button
              key={key}
              className="group card-lg text-left p-7 transition hover:-translate-y-0.5 hover:border-[#a8370e]/40 hover:shadow-[0_4px_12px_rgba(55,12,5,0.08)]"
              onClick={() => { setRole(key); navigate(path); }}
            >
              <div className="mb-10 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fff0ee] text-[#a8370e]"><Icon size={24}/></div>
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-3 min-h-[72px] leading-6 text-[#58423b]">{description}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-[#a8370e]">
                Enter Portal <ArrowRight size={17} className="transition group-hover:translate-x-1"/>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-14 border-t border-[#be6f5a]/15 pt-6 text-sm text-[#8c7169]">
          Frontend prototype • Mock data • No real payment or blockchain transaction is performed
        </div>
      </main>
    </div>
  );
}