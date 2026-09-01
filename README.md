# ⚖️ AdalatSetu
https://adalat-setu.vercel.app/


**AI-Assisted Case Complexity Triage & Time-Based Scheduling for Indian District Courts**

Built for Build with Bharat 2.0 — National Level Hackathon
Team: CodeCubed | VIT Bhopal University

---

## 🧩 The Problem

Indian courts already follow a structured priority system — the Supreme Court's December 2025 listing circular defines **16 priority categories** (senior citizens, undertrial prisoners, persons with disabilities, poverty-line litigants, and more). Urgent matters are handled through the "Mentioning" mechanism, and each judge operates within a defined jurisdiction.

**The gap**: Within these existing categories, cases are still listed purely chronologically. No system estimates, *before scheduling*, how long a case is actually likely to take — so simple matters (cheque bounce, traffic challans) get stuck behind long, complex hearings, and a judge's real daily workload is only discovered once hearings begin.

## 💡 Our Solution

AdalatSetu adds a **duration & complexity estimation layer** on top of the existing judicial priority system — it doesn't replace judicial discretion, it works within it.

- Extracts case details automatically at filing (case type, parties, sections, witnesses)
- Generates a complexity label (Simple / Medium / Complex) with an estimated hearing duration
- Applies existing priority rules (senior citizen, undertrial, urgent relief) as a separate rule-based layer
- Clusters similar-complexity cases into time-blocks within a judge's own docket
- Presents suggested schedules with plain-language explanations — the judge can accept or override, and every override is logged

**Core principle: AI suggests. Judge decides. Nothing is automated without human review.**

## 🏛️ Portals

| Portal | Purpose |
|---|---|
| **Litigant Portal** | Track case status, view schedules, receive notifications, file applications — in English or Hindi |
| **Registrar Portal** | Upload filings, initiate NLP extraction, manage case details, view priority & routing |
| **Judge Portal** | View docket & schedule, review AI recommendations, accept/override (logged), monitor docket health |

## 🔄 Flow of Solution
Case Filed (Registrar uploads plaint/FIR)
↓
NLP Extraction (case type, parties, sections, witnesses)
↓
Complexity + Priority Engine (rule-based scoring, urgency flags)
↓
Judge-Domain Matching (jurisdiction-aware routing)
↓
Clustered Scheduler (groups similar cases into time-blocks)
↓
Judge Dashboard (Accept / Override — logged, litigant notified)
## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + Vite, Tailwind CSS | Fast development, clean responsive UI |
| Routing | React Router | Role-based navigation |
| Charts | Recharts | Docket Health & case-data visualization |
| Multilingual | react-i18next | Hindi / English toggle |
| Backend | FastAPI (Python) | Single service integrating backend with NLP/ML logic |
| Database | SQLite + SQLAlchemy | Lightweight, relational, fast to iterate |
| NLP | Regex + keyword extraction | Transparent, explainable, no black-box processing |
| Complexity Scoring | Rule-based engine | Explainable scoring aligned with "AI assists, doesn't decide" |
| Scheduler | Python + Pandas | Priority → clustering → duration-based ordering |
| Payments (Agentic Layer) | x402 + Algorand Testnet + GoPlausible Facilitator | Autonomous AI-to-AI payment for citation verification |
| Auth | Role-based demo login | Fast, functional for prototype scope |

## 🌟 What Makes This Different

- **Explainable, not black-box** — every suggestion comes with a "Why this suggestion?" panel
- **Human override built-in** — every judge/registrar decision is logged with a reason; AI never has final say
- **Works within existing law** — built on the Supreme Court's own 2025 priority framework, not a replacement for it
- **Jurisdiction-aware** — never assigns a case outside a judge's actual domain
- **Honest about its limits** — doesn't predict outcomes or legal merit, only procedural time estimation
- **Fills a real gap** — e-Courts tracks cases, Nyaya Setu explains rights; neither estimates duration or builds a schedule

## 🔗 Agentic Payment Layer (x402 + Algorand)

Our Citation Integrity Checker autonomously pays an external legal-verification service per citation lookup — no human checkout — settled live on **Algorand Testnet** via the **GoPlausible Facilitator**, demonstrating genuine agent-to-agent commerce.

## 📚 Research & References

- Indian judiciary structure: Supreme Court → 25 High Courts → District & Subordinate Courts
- Case lifecycle: Filing → Scrutiny → Listing → Cause List → Hearing → Disposal (Source: NJDG)
- Supreme Court of India Listing Circular, December 2025 (F. No. 28/Judl./2025) — 16 priority categories
- DAKSH India — Judicial pendency and disposal-time research
- Kaggle — Legal Dataset: Supreme Court Judgments India (1950–2024)

## 👥 Team CodeCubed

| Member | Focus |
|---|---|
| Vidushi Kesharwani | Backend / Database |
| Aditi Jha | AI / ML / Scheduler |
| Prakriti Wadhwani | Frontend / UX |

VIT Bhopal University

## 🚀 Getting Started

```bash
# Frontend
cd FRONTEND
npm install
npm run dev

# Backend
cd AdalatSetu-backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
