export const filingsSeed = [
  {
    id: "FIL-2024-892",
    type: "Civil Suit",
    partyCount: 4,
    complexity: "Complex",
    status: "Pending Review",
    parties: ["Rahul Sharma (Petitioner)", "State Bank of India"],
    sections: "Sec 34, Specific Relief Act",
    pageCount: 42,
    flags: ["Missing Annexure B signature", "Page 45 is illegible."]
  },
  {
    id: "FIL-2024-893",
    type: "Writ Petition",
    partyCount: 2,
    complexity: "Simple",
    status: "In Queue",
    parties: ["Meera Singh (Petitioner)", "State of Delhi"],
    sections: "Article 226, Constitution of India",
    pageCount: 18,
    flags: []
  },
  {
    id: "FIL-2024-894",
    type: "Criminal Appeal",
    partyCount: 3,
    complexity: "Medium",
    status: "In Queue",
    parties: ["Arjun Verma (Appellant)", "State"],
    sections: "Sections 374, 386 CrPC",
    pageCount: 31,
    flags: []
  }
];

export const litigantCase = {
  cnr: "DLND0100123402023",
  title: "State vs. Ramesh Kumar",
  type: "Criminal Appeal",
  court: "Court No. 4, District Court",
  lifecycle: ["Filed", "Scrutiny", "Scheduled", "Disposed"],
  status: "Scheduled",
  hearingDate: "15 October 2026",
  hearingTime: "11:30 AM - 12:00 PM",
  explanation:
    "Your case has been accepted and a date for the first hearing is set. You or your lawyer should be present at the court on this date."
};

export const judgeCasesSeed = [
  {
    id: "CR-2023-441",
    title: "State vs. Sharma & Associates",
    type: "Financial Fraud",
    stage: "Final Arguments",
    duration: "90 mins",
    time: "10:00 AM",
    tags: ["Undertrial", "Senior Citizen"],
    aiRecommendation: "PRIORITIZE HEARING",
    aiExplanation:
      "The primary defendant is a senior citizen (78 years old) and has been in judicial custody for over 18 months without bail. Case timeline indicates final arguments are pending for 3 sessions.",
    complexity: "Complex"
  },
  {
    id: "CV-2024-112",
    title: "Patel vs. Desai Property Disputes",
    type: "Property Dispute",
    stage: "Cross Exam",
    duration: "45 mins",
    time: "11:45 AM",
    tags: [],
    aiRecommendation: "",
    aiExplanation: "",
    complexity: "Medium"
  },
  {
    id: "WP-2023-441",
    title: "Property tax assessment methodology",
    type: "Writ Petition",
    stage: "Hearing",
    duration: "35 mins",
    time: "01:30 PM",
    tags: ["Senior Citizen"],
    description:
      "Dispute regarding property tax assessment methodology applied to residential premises...",
    aiRecommendation: "PRIORITIZE HEARING",
    aiExplanation:
      "The senior citizen tag indicates the matter may merit earlier attention under the mock scheduling policy.",
    complexity: "Simple"
  },
  {
    id: "BA-2024-089",
    title: "Regular Bail Application",
    type: "Bail Application",
    stage: "Arguments",
    duration: "30 mins",
    time: "02:15 PM",
    tags: ["Undertrial > 1 Yr"],
    description:
      "Application for regular bail under section 439 CrPC. Medical grounds cited.",
    aiRecommendation: "PRIORITIZE HEARING",
    aiExplanation:
      "The matter has an undertrial duration above one year and includes medical grounds in the filing.",
    complexity: "Simple"
  }
];

export const docketCases = [
  { id: "CR-2023-441", type: "Financial Fraud", date: "14 Nov 2024", time: "10:00 AM", complexity: "Complex", status: "Scheduled" },
  { id: "CV-2024-112", type: "Property Dispute", date: "14 Nov 2024", time: "11:45 AM", complexity: "Medium", status: "Scheduled" },
  { id: "WP-2023-441", type: "Writ Petition", date: "14 Nov 2024", time: "01:30 PM", complexity: "Simple", status: "Scheduled" },
  { id: "BA-2024-089", type: "Bail Application", date: "14 Nov 2024", time: "02:15 PM", complexity: "Simple", status: "Scheduled" }
];

export const citationPrecedents = [
  { id: "PRE-01", title: "Negotiable Instruments Act — Section 138", court: "Supreme Court of India", relevance: "High" },
  { id: "PRE-02", title: "Notice and limitation principles", court: "High Court", relevance: "Medium" }
];
