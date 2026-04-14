import { Routes, Route } from "react-router-dom";

import FinanceLayout from "../layouts/financeLayouts/FinanceLayout";
import CoursePaymentLayout from "../layouts/financeLayouts/CoursePaymentLayout";
import SystemOperationLayout from "../layouts/financeLayouts/SystemOperationLayout";
import FinancialReportLayout from "../layouts/financeLayouts/FinancialReportLayout";

import RefundPage from "../pages/finance/coursePayment/RefundPage";
import RefundHistoryPage from "../pages/finance/coursePayment/RefundHistoryPage";
import RefundTicketPage from "../pages/finance/coursePayment/RefundTicketPage";

import OperationalCostPage from "../pages/finance/cost/OperationalCostPage";
import BudgetPage from "../pages/finance/cost/BudgetPage";
import PromotionPage from "../pages/finance/cost/PromotionPage";
import EmployeeSalaryPage from "../pages/finance/cost/EmployeeSalaryPage";
import PayrollPage from "../pages/finance/cost/PayrollPage";

import RevenueReportPage from "../pages/finance/report/RevenueReportPage";
import MentorRevenueReportPage from "../pages/finance/report/MentorRevenueReportPage";
import CourseSalesReportPage from "../pages/finance/report/CourseSalesReportPage";

export default function FinanceRoutes() {
  return (
    <Routes>
      <Route element={<FinanceLayout />}>
        <Route path="course_payment" element={<CoursePaymentLayout />}>
          <Route path="refund" element={<RefundPage />} />
          <Route path="history" element={<RefundHistoryPage />} />
          <Route path="ticket" element={<RefundTicketPage />} />
        </Route>

        <Route path="cost" element={<SystemOperationLayout />}>
          <Route path="system" element={<OperationalCostPage />} />
          <Route path="budget" element={<BudgetPage />} />
          <Route path="promotion" element={<PromotionPage />} />
          <Route path="salary" element={<EmployeeSalaryPage />} />
          <Route path="payroll" element={<PayrollPage />} />
        </Route>

        <Route path="report" element={<FinancialReportLayout />}>
          <Route path="revenue" element={<RevenueReportPage />} />
          <Route path="mentor_revenue" element={<MentorRevenueReportPage />} />
          <Route path="course" element={<CourseSalesReportPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
