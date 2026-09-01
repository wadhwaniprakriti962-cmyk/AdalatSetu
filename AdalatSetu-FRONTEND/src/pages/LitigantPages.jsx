import { Search, Bell, CalendarDays, MapPin, Clock3, Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LitigantShell, BackButton } from "../components/layout";
import { Badge, EmptyState } from "../components/common";
import { litigantCase } from "../data/mockData";
import { useApp } from "../context/AppContext";

export function LitigantPage() {
  const [cnr, setCnr] = useState("");
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    navigate(`/litigant/case/${cnr.trim() || "not-found"}`);
  };
  return (
    <LitigantShell>
      <main className="mx-auto max-w-[1000px] px-5 py-10 lg:px-10 lg:py-16">
        <div className="mono-label">Public case services</div>
        <h1 className="page-title mt-2">Find Your Case</h1>
        <p className="mt-3 max-w-2xl text-[#58423b]">Search by Case Number / CNR to view status, hearing dates and public case information.</p>
        <form onSubmit={submit} className="card-lg mt-9 p-6 lg:p-8">
          <label htmlFor="cnr" className="mono-label block mb-2">Case Number / CNR</label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input id="cnr" className="input" value={cnr} onChange={e => setCnr(e.target.value)} placeholder="Enter Case Number / CNR" />
            <button className="primary-btn sm:min-w-[150px]"><Search size={18}/> Search</button>
          </div>
          <div className="mt-4 font-mono text-xs text-[#8c7169]">Try: DLND0100123402023</div>
        </form>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="card p-5"><CalendarDays className="text-[#a8370e]"/><div className="mt-5 font-semibold">Hearing dates</div><p className="mt-1 text-sm text-[#58423b]">View your next scheduled hearing.</p></div>
          <div className="card p-5"><MapPin className="text-[#a8370e]"/><div className="mt-5 font-semibold">Court details</div><p className="mt-1 text-sm text-[#58423b]">Know the court and scheduled time.</p></div>
          <div className="card p-5"><Bell className="text-[#a8370e]"/><div className="mt-5 font-semibold">Notifications</div><p className="mt-1 text-sm text-[#58423b]">Manage hearing reminders from your case page.</p></div>
        </div>
      </main>
    </LitigantShell>
  );
}

export function LitigantCasePage() {
  const { cnr } = useParams();
  const { notificationEnabled, setNotification } = useApp();
  const found = cnr === litigantCase.cnr;
  return (
    <LitigantShell>
      <main className="mx-auto max-w-[1100px] px-5 py-8 lg:px-10 lg:py-12">
        <BackButton to="/litigant">Case search</BackButton>
        {!found ? (
          <div className="mt-6"><EmptyState title="Case Not Found" text={`No mock case exists for CNR ${cnr}. Please check the number and try again.`} /></div>
        ) : (
          <>
            <div className="mt-7">
              <div className="mono-label">Case information</div>
              <h1 className="page-title mt-2">Showing details for CNR</h1>
              <div className="mt-2 font-mono text-sm text-[#a8370e]">{litigantCase.cnr}</div>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-[1.45fr_.8fr]">
              <section className="card-lg p-6 lg:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#be6f5a]/15 pb-5">
                  <div>
                    <h2 className="section-title">{litigantCase.title}</h2>
                    <p className="mt-1 text-[#58423b]">{litigantCase.type} · {litigantCase.court}</p>
                  </div>
                  <Badge tone="success">{litigantCase.status}</Badge>
                </div>
                <div className="py-7">
                  <div className="mono-label">Case lifecycle</div>
                  <div className="mt-5 grid grid-cols-4 gap-2">
                    {litigantCase.lifecycle.map((item, i) => (
                      <div key={item} className="relative text-center">
                        <div className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full ${i <= 2 ? "bg-[#a8370e] text-white" : "bg-[#ffe9e5] text-[#8c7169]"}`}>
                          {i <= 2 ? <CheckCircle2 size={17}/> : <span className="font-mono text-xs">{i+1}</span>}
                        </div>
                        <div className="mt-2 text-xs font-medium">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#be6f5a]/15 pt-6">
                  <div className="mono-label">Status explanation</div>
                  <p className="mt-3 leading-7 text-[#58423b]">{litigantCase.explanation}</p>
                </div>
              </section>

              <aside className="space-y-5">
                <section className="card-lg p-6">
                  <div className="mono-label">Next hearing</div>
                  <div className="mt-4 text-2xl font-semibold">{litigantCase.hearingDate}</div>
                  <div className="mt-2 flex items-center gap-2 text-[#58423b]"><Clock3 size={17}/> {litigantCase.hearingTime}</div>
                  <div className="mt-5 rounded-lg bg-[#fff0ee] p-4 text-sm text-[#58423b]">Please be present at the designated court with your lawyer or representative.</div>
                </section>
                <section className="card-lg p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div><div className="font-semibold">Hearing reminders</div><p className="mt-1 text-sm text-[#58423b]">Notify me via SMS/Email before hearing</p></div>
                    <button
                      role="switch"
                      aria-checked={notificationEnabled}
                      aria-label="Hearing notification toggle"
                      onClick={() => setNotification(!notificationEnabled)}
                      className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition ${notificationEnabled ? "bg-[#a8370e]" : "bg-[#c9b3ac]"}`}
                    >
                      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${notificationEnabled ? "left-6" : "left-1"}`}/>
                    </button>
                  </div>
                  <div className="mt-4 flex items-center gap-2 font-mono text-xs text-[#58423b]"><Mail size={14}/> {notificationEnabled ? "Notifications enabled" : "Notifications disabled"}</div>
                </section>
              </aside>
            </div>
          </>
        )}
      </main>
    </LitigantShell>
  );
}