import { Bell, Building2, CircleHelp, FileCheck2, Gavel, Home, LayoutDashboard, ListChecks, Scale, Settings, ShieldCheck, BarChart3, CalendarDays, ClipboardList, Activity, Search, UserCircle, Upload, Languages, ArrowLeft } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function navClass({ isActive }) {
  return `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${isActive ? "bg-[#a8370e] font-semibold text-white" : "text-[#370c05] hover:bg-[#fff0ee]"}`;
}

export function Brand({ compact = false }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? "" : "px-4"}`}>
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#a8370e] text-white">
        <Building2 size={22} />
      </div>
      <div>
        <div className="text-xl font-bold tracking-tight text-[#842400]">AdalatSetu</div>
        {!compact && <div className="font-mono text-[11px] text-[#58423b]">Registrar Office</div>}
      </div>
    </div>
  );
}

export function TopActions({ role = "registrar" }) {
  const navigate = useNavigate();
  const { setRole } = useApp();
  return (
    <div className="flex items-center gap-2">
      <div className="hidden rounded-lg border border-[#be6f5a]/30 px-3 py-2 font-mono text-xs text-[#842400] sm:block">
        Prototype / Testnet
      </div>
      <button className="ghost-btn" aria-label="Notifications"><Bell size={19} /></button>
      <button className="ghost-btn" aria-label="Help"><CircleHelp size={19} /></button>
      <button
        className="hidden rounded-lg border border-[#be6f5a]/20 bg-white px-4 py-2.5 text-sm font-medium text-[#842400] md:block"
        onClick={() => {
          setRole(role);
          navigate(role === "judge" ? "/judge/docket" : role === "litigant" ? "/litigant" : "/registrar/verify");
        }}
      >
        {role === "judge" ? "Judge Portal" : role === "litigant" ? "Litigant Portal" : "Registrar Portal"}
      </button>
      <div className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-[#be6f5a]/30 bg-white">
        <UserCircle size={22} />
      </div>
    </div>
  );
}

export function RegistrarShell({ children }) {
  const { setRole } = useApp();
  return (
    <div className="app-bg flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[280px] border-r border-[#be6f5a]/10 bg-[#fff0ee] lg:flex lg:flex-col">
        <div className="pt-5"><Brand /></div>
        <div className="px-4 pt-9">
          <button className="primary-btn w-full" onClick={() => { setRole("registrar"); window.location.href = "/registrar/verify"; }}>
            <Upload size={17} /> New Filing Triage
          </button>
        </div>
        <nav className="mt-7 space-y-1 px-4">
          <NavLink to="/registrar/verify" className={navClass}><Home size={19} /> Home</NavLink>
          <NavLink to="/registrar/verify" className={navClass}><ShieldCheck size={19} /> Verify Cases</NavLink>
          <NavLink to="/registrar/docket" className={navClass}><Gavel size={19} /> Court Docket</NavLink>
          <NavLink to="/registrar/analytics" className={navClass}><BarChart3 size={19} /> Analytics</NavLink>
          <NavLink to="/registrar/citation" className={navClass}><FileCheck2 size={19} /> Citation Checker</NavLink>
        </nav>
        <div className="mt-auto space-y-1 px-4 pb-5">
          <button className="ghost-btn w-full justify-start"><Settings size={19} /> Settings</button>
          <button className="ghost-btn w-full justify-start"><CircleHelp size={19} /> Support</button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 lg:ml-[280px]">
        <header className="flex h-[78px] items-center justify-between border-b border-[#be6f5a]/10 bg-[#fcfaf9] px-5 lg:px-10">
          <div className="lg:hidden"><Brand compact /></div>
          <div className="hidden items-center gap-7 text-sm text-[#58423b] lg:flex">
            <NavLink to="/registrar/verify">Verification</NavLink>
            <NavLink to="/registrar/docket">Docket</NavLink>
            <NavLink to="/registrar/docket-health" className="hidden">Health</NavLink>
          </div>
          <TopActions role="registrar" />
        </header>
        <div className="mx-auto max-w-[1440px] p-5 lg:p-10">{children}</div>
      </main>
    </div>
  );
}

export function JudgeShell({ children }) {
  const { setRole } = useApp();
  const navigate = useNavigate();
  return (
    <div className="app-bg min-h-screen">
      <header className="border-b border-[#be6f5a]/15 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <Brand compact />
          <div className="hidden items-center gap-6 text-sm lg:flex">
            <NavLink to="/judge/docket" className={({isActive}) => isActive ? "font-semibold text-[#a8370e]" : "text-[#58423b]"}><CalendarDays className="mr-1 inline" size={17}/> Calendar</NavLink>
            <NavLink to="/judge/cases" className={({isActive}) => isActive ? "font-semibold text-[#a8370e]" : "text-[#58423b]"}><ClipboardList className="mr-1 inline" size={17}/> Documents</NavLink>
            <NavLink to="/judge/cases" className={({isActive}) => isActive ? "font-semibold text-[#a8370e]" : "text-[#58423b]"}><ListChecks className="mr-1 inline" size={17}/> Case List</NavLink>
            <button className="text-[#58423b]"><Bell className="mr-1 inline" size={17}/> Alerts</button>
          </div>
          <div className="flex items-center gap-2">
            <select
              aria-label="Select portal"
              className="hidden rounded-lg border border-[#be6f5a]/25 bg-white px-3 py-2 text-sm md:block"
              value="judge"
              onChange={(e) => {
                const role = e.target.value;
                setRole(role);
                navigate(role === "judge" ? "/judge/docket" : role === "registrar" ? "/registrar/verify" : "/litigant");
              }}
            >
              <option value="litigant">Litigant</option>
              <option value="registrar">Registrar</option>
              <option value="judge">Judge</option>
            </select>
            <TopActions role="judge" />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-[1440px] px-5 py-7 lg:px-10">{children}</div>
    </div>
  );
}

export function LitigantShell({ children }) {
  return (
    <div className="app-bg min-h-screen">
      <header className="border-b border-[#be6f5a]/15 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <Brand compact />
          <nav className="hidden items-center gap-7 text-sm text-[#58423b] md:flex">
            <NavLink to="/litigant" className={({isActive}) => isActive ? "font-semibold text-[#a8370e]" : ""}>Verification</NavLink>
            <NavLink to="/litigant" className={({isActive}) => isActive ? "font-semibold text-[#a8370e]" : ""}>Docket</NavLink>
            <NavLink to="/litigant" className={({isActive}) => isActive ? "font-semibold text-[#a8370e]" : ""}>Health</NavLink>
          </nav>
          <TopActions role="litigant" />
        </div>
      </header>
      {children}
    </div>
  );
}

export function BackButton({ to, children = "Back" }) {
  return <NavLink to={to} className="ghost-btn"><ArrowLeft size={17} /> {children}</NavLink>;
}
