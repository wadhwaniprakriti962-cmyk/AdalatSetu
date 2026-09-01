import { AlertCircle, CheckCircle2, Clock3, Sparkles } from "lucide-react";

export function Badge({ children, tone = "neutral" }) {
  const styles = {
    neutral: "bg-[#fff0ee] text-[#58423b]",
    primary: "bg-[#ffdad3] text-[#842400]",
    success: "bg-[#e8f4e8] text-[#25623a]",
    warning: "bg-[#fff1df] text-[#8a4b00]",
    danger: "bg-[#ffdad6] text-[#93000a]"
  };
  return <span className={`pill ${styles[tone] || styles.neutral}`}>{children}</span>;
}

export function StatusBadge({ status }) {
  const tone =
    status === "Approved" || status === "Verified" || status === "Successful" ? "success" :
    status === "Pending Review" || status === "Payment Required" || status === "Required" ? "warning" :
    status === "Returned with Defect" || status === "Failed" ? "danger" : "primary";
  return <Badge tone={tone}>{status}</Badge>;
}

export function AIChip() {
  return <span className="pill bg-[#fff1df] text-[#8a4b00]"><Sparkles size={13} /> AI-assisted</span>;
}

export function EmptyState({ title, text, action }) {
  return (
    <div className="card p-10 text-center">
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0ee]">
        <AlertCircle size={22} />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-[#58423b]">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState({ text = "Processing..." }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#be6f5a]/20 bg-[#fff8f6] p-4 text-[#58423b]">
      <Clock3 className="animate-pulse" size={19} />
      <span className="font-mono text-sm">{text}</span>
    </div>
  );
}

export function SuccessBanner({ children }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
      <CheckCircle2 className="mt-0.5 shrink-0" size={19} />
      <div>{children}</div>
    </div>
  );
}

export function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#370c05]/25 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="w-full max-w-md rounded-xl border border-[#be6f5a]/25 bg-white p-6 shadow-[0_4px_12px_rgba(55,12,5,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-title" className="text-xl font-semibold">{title}</h2>
          <button className="ghost-btn -mr-2 -mt-2" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}
