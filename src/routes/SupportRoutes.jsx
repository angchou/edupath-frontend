import { Routes, Route } from "react-router-dom";

import SupportLayout from "../layouts/supportLayouts/SupportLayout";
import TicketLayout from "../layouts/supportLayouts/TicketLayout";
import TicketReportLayout from "../layouts/supportLayouts/SupportReportLayout";

import TicketPage from "../pages/support/ticket/TicketPage";
import TicketManagementPage from "../pages/support/ticket/TicketManagementPage";
import SupportReportPage from "../pages/support/SupportReportPage";

export default function SupportRoutes() {
  return (
    <Routes>
      <Route element={<SupportLayout />}>
        <Route path="ticket" element={<TicketLayout />}>
          <Route path="process" element={<TicketPage />} />
          <Route path="manage" element={<TicketManagementPage />} />
        </Route>
        <Route path="report" element={<TicketReportLayout />}>
          <Route path="rpt" element={<SupportReportPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
