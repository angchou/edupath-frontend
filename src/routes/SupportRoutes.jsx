import { Routes, Route, Navigate } from "react-router-dom";

import SupportLayout from "../layouts/supportLayouts/SupportLayout";
import TicketLayout from "../layouts/supportLayouts/TicketLayout";
import TicketReportLayout from "../layouts/supportLayouts/SupportReportLayout";
import EmployeeAccountLayout from "../layouts/EmployeeAccountLayout";

import TicketPage from "../pages/support/ticket/TicketPage";
import TicketManagementPage from "../pages/support/ticket/TicketManagementPage";
import SupportReportPage from "../pages/support/SupportReportPage";

import EmployeeProfilePage from "../pages/profiles/EmployeeProfilePage";

export default function SupportRoutes() {
  return (
    <Routes>
      <Route element={<SupportLayout />}>
        <Route path="profile" element={<EmployeeAccountLayout />}>
          <Route index element={<Navigate to="detail" replace />} />

          <Route path="detail" element={<EmployeeProfilePage />} />
        </Route>

        <Route path="ticket" element={<TicketLayout />}>
          <Route index element={<Navigate to="process" replace />} />

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
