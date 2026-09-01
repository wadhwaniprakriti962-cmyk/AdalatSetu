import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { LitigantPage, LitigantCasePage } from "./pages/LitigantPages";
import { RegistrarVerifyPage, RegistrarCitationPage, RegistrarPaymentPage, RegistrarDocketPage, RegistrarAnalyticsPage } from "./pages/RegistrarPages";
import { JudgeDocketPage, JudgeCaseListPage, JudgeCaseDetailPage, JudgeDocketHealthPage } from "./pages/JudgePages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/litigant" element={<LitigantPage />} />
      <Route path="/litigant/case/:cnr" element={<LitigantCasePage />} />

      <Route path="/registrar/verify" element={<RegistrarVerifyPage />} />
      <Route path="/registrar/citation" element={<RegistrarCitationPage />} />
      <Route path="/registrar/citation/payment" element={<RegistrarPaymentPage />} />
      <Route path="/registrar/docket" element={<RegistrarDocketPage />} />
      <Route path="/registrar/analytics" element={<RegistrarAnalyticsPage />} />

      <Route path="/judge/docket" element={<JudgeDocketPage />} />
      <Route path="/judge/cases" element={<JudgeCaseListPage />} />
      <Route path="/judge/docket-health" element={<JudgeDocketHealthPage />} />
      <Route path="/judge/cases/:caseId" element={<JudgeCaseDetailPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}