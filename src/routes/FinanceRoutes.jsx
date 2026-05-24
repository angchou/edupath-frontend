import { Routes, Route, Navigate } from "react-router-dom";

import FinanceLayout from "../layouts/financeLayouts/FinanceLayout";
import CoursePaymentLayout from "../layouts/financeLayouts/CoursePaymentLayout";
import SystemOperationLayout from "../layouts/financeLayouts/SystemOperationLayout";
import FinancialReportLayout from "../layouts/financeLayouts/FinancialReportLayout";
import VoucherLayout from "../layouts/financeLayouts/VoucherLayout";
import EmployeeAccountLayout from "../layouts/EmployeeAccountLayout";

import RefundPage from "../pages/finance/coursePayment/RefundPage";
import RefundHistoryPage from "../pages/finance/coursePayment/RefundHistoryPage";
import TransactionHistoryPage from "../pages/finance/coursePayment/TransactionHistoryPage";

import BudgetManagement from "../pages/finance/cost/BudgetManagement";
import PayrollPage from "../pages/finance/cost/PayrollPage";
import PromotionPage from "../pages/finance/cost/PromotionPage";

import RevenueReportPage from "../pages/finance/report/RevenueReportPage";

import VoucherManagementPage from "../pages/finance/voucher/VoucherManagementPage";

import EmployeeProfilePage from "../pages/profiles/EmployeeProfilePage";

export default function FinanceRoutes() {
  return (
    <Routes>
      <Route element={<FinanceLayout />}>
        <Route path="profile" element={<EmployeeAccountLayout />}>
          <Route index element={<Navigate to="detail" replace />} />

          <Route path="detail" element={<EmployeeProfilePage />} />
        </Route>
        <Route path="course_payment" element={<CoursePaymentLayout />}>
          <Route index element={<Navigate to="refund" replace />} />

          <Route path="refund" element={<RefundPage />} />
          <Route path="refund-history" element={<RefundHistoryPage />} />
          <Route path="history" element={<TransactionHistoryPage />} />
        </Route>

        <Route path="cost" element={<SystemOperationLayout />}>
          <Route index element={<Navigate to="budget" replace />} />

          <Route path="budget" element={<BudgetManagement />} />
          <Route path="payroll" element={<PayrollPage />} />
          <Route path="promotion" element={<PromotionPage />} />
        </Route>

        <Route path="report" element={<FinancialReportLayout />}>
          <Route index element={<Navigate to="revenue" replace />} />

          <Route path="revenue" element={<RevenueReportPage />} />
        </Route>

        <Route path="voucher" element={<VoucherLayout />}>
          <Route index element={<Navigate to="manage" replace />} />

          <Route path="manage" element={<VoucherManagementPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
