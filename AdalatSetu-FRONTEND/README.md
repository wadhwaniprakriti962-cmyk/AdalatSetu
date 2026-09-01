# AdalatSetu — React + Vite Frontend

Frontend-only hackathon prototype for the AdalatSetu AI-assisted judicial workflow platform.

## Stack

- React + Vite
- React Router DOM
- Tailwind CSS
- Lucide React
- React Context + localStorage
- No backend
- No real blockchain/payment/API calls

## Run locally

```bash
npm install
npm run dev
```

Open the URL printed by Vite, normally:

```text
http://localhost:5173
```

## Production build

```bash
npm run build
npm run preview
```

## Vercel

This project includes `vercel.json` so direct browser refreshes on React Router routes work as an SPA.

### Fast deployment

1. Upload this folder to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import the GitHub repository.
4. Framework preset: **Vite**.
5. Build command: `npm run build`
6. Output directory: `dist`
7. Deploy.

No environment variables are required.

## Main routes

- `/`
- `/litigant`
- `/litigant/case/:cnr`
- `/registrar/verify`
- `/registrar/citation`
- `/registrar/citation/payment`
- `/registrar/docket`
- `/registrar/analytics`
- `/judge/docket`
- `/judge/cases`
- `/judge/docket-health`
- `/judge/cases/:caseId`

Unknown routes redirect to `/`.

## State

`src/context/AppContext.jsx` owns:

- selected role
- notification preference
- filing statuses
- citation
- payment status
- verification status
- judge overrides
- override reasons
- expanded AI explanations

State is persisted to localStorage so navigation/refresh keeps the prototype state.

## Important demo flows

### Litigant

Landing → Litigant → enter `DLND0100123402023` → Search → toggle notifications → navigate away → return.

### Registrar filing

Landing → Registrar → click `FIL-2024-892` → Approve Filing or Return with Defect.

### Citation payment

Registrar → Citation Checker → enter `Section 138, Negotiable Instruments Act` → Check Citation & Pay Fee → Authorize Payment & Verify → Processing → Payment Successful → Verification Complete.

### Judge

Landing → Judge → Why this suggestion? → Override → enter reason → Confirm Override.

Case List → `CR-2023-441` → View Data / Override Priority.

## Design

The UI follows the supplied Stitch/design-system direction: warm off-white background, ochre primary, Hanken Grotesk, JetBrains Mono metadata, white cards, restrained borders/shadows, pill badges and institutional judicial styling.
