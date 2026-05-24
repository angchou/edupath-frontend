import { Eye, X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import { RiRefund2Fill } from "react-icons/ri";
import {
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import {
  getRefundByStatus,
  acceptRefund,
  rejectRefund,
} from "../../../services/transactionService";
import { useToast } from "../../../contexts/ToastContext";

export default function RefundPage() {
  const { addToast } = useToast();
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [openRefundModal, setOpenRefundModal] = useState(false);

  const [refunds, setRefunds] = useState([]);

  const fetchRefund = async () => {
    const data = await getRefundByStatus(0);
    setRefunds(data);
  };
  useEffect(() => {
    fetchRefund();
  }, []);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("vi-VN");
  };

  const checkRefundTimeGap = (ngayGiaoDichStr, ngayYeuCauStr) => {
    const ngayGiaoDich = parseISO(ngayGiaoDichStr);
    const ngayYeuCau = parseISO(ngayYeuCauStr);

    const daysDiff = differenceInDays(ngayYeuCau, ngayGiaoDich);
    const hoursDiff = differenceInHours(ngayYeuCau, ngayGiaoDich);
    const minutesDiff = differenceInMinutes(ngayYeuCau, ngayGiaoDich);
    const secondsDiff = differenceInSeconds(ngayYeuCau, ngayGiaoDich);

    if (secondsDiff < 0) {
      return "---";
    }

    if (daysDiff > 0) {
      return `Cách ${daysDiff} ngày`;
    } else if (hoursDiff > 0) {
      return `Cách ${hoursDiff} giờ`;
    } else if (minutesDiff > 0) {
      return `Cách ${minutesDiff} phút`;
    } else {
      return `Cách ${secondsDiff} giây`;
    }
  };

  const getCongGD = (congGD) => {
    if (congGD === 1) {
      return "Ví Momo";
    } else if (congGD === 2) {
      return "Chuyển khoản ngân hàng";
    } else if (congGD === 3) {
      return "Ví điện tử khác";
    }
  };

  const handleAcceptRefund = async () => {
    const res = await acceptRefund(selectedRefund.hoanTienID);
    if (!res) {
      addToast("Đã xảy ra lỗi và không thể hoàn tiền!", "error");
      return;
    }
    setOpenRefundModal(false);
    setSelectedRefund(null);
    fetchRefund();
    addToast("Đã chấp nhận hoàn tiền giao dịch!", "success");
  };

  const handleRejectRefund = async () => {
    const res = await rejectRefund(selectedRefund.hoanTienID);
    if (!res) {
      addToast("Đã xảy ra lỗi và không thể từ chối hoàn tiền!", "error");
      return;
    }
    setOpenRefundModal(false);
    setSelectedRefund(null);
    fetchRefund();
    addToast("Đã từ chối hoàn tiền giao dịch!", "success");
  };

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Có {refunds.length} yêu cầu hoàn tiền đang chờ xử lý
          </p>
        </header>

        <main className="flex-1 p-4 md:p-2">
          <div className="overflow-x-auto border border-gray-100">
            <div className="max-h-[50vh] overflow-y-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Mã giao dịch
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Ngày giao dịch
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Ngày yêu cầu hoàn tiền
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Thời gian cách nhau
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Giá gốc
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Trị giá cuối cùng
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {refunds.length !== 0 ? (
                    refunds.map((refund) => (
                      <tr
                        key={refund.hoanTienID}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {refund.giaoDichID}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {formatDate(refund.ngayGD)}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(refund.ngayTao)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {checkRefundTimeGap(refund.ngayGD, refund.ngayTao)}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {refund.giaGoc.toLocaleString("vi-VN")} đ
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {refund.triGia.toLocaleString("vi-VN")} đ
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                            onClick={() => {
                              setOpenRefundModal(true);
                              setSelectedRefund(refund);
                            }}
                          >
                            <Eye size={16} />
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-10 text-gray-400 italic"
                      >
                        Không tìm thấy yêu cầu hoàn tiền nào
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {openRefundModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md shadow-lg p-6 relative">
            <button
              onClick={() => setOpenRefundModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-5 mt-4">
              Thông tin yêu cầu hoàn tiền
            </h2>
            <div className="h-full flex flex-col items-center justify-center">
              <RiRefund2Fill className="size-13" />
              <div className="mt-5 w-full flex flex-col gap-2">
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-yellow-500" />
                  <span className="font-bold">Mã hoàn tiền:</span>
                  {selectedRefund?.hoanTienID}
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-green-500" />
                  <span className="font-bold">Mã giao dịch:</span>
                  {selectedRefund?.giaoDichID}
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-red-500" />
                  <span className="font-bold">Mã khóa học:</span>
                  {selectedRefund?.khoaHocID}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Ngày giao dịch:</span>
                  {formatDate(selectedRefund?.ngayGD)}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Ngày yêu cầu hoàn tiền:</span>
                  {formatDate(selectedRefund?.ngayTao)}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Thời gian cách nhau:</span>
                  {checkRefundTimeGap(
                    selectedRefund?.ngayGD,
                    selectedRefund?.ngayTao,
                  )}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Cổng giao dịch:</span>
                  {getCongGD(selectedRefund?.congGD)}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Voucher:</span>
                  {selectedRefund?.voucherID} - {selectedRefund?.maApDung}
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Trị giá hoàn tiền:</span>
                  {selectedRefund?.triGia.toLocaleString("vi-VN")} đ
                </div>
                <div className="flex gap-3">
                  <Plus size={20} className="mt-1" />
                  <span className="font-bold">Số tiền phí sàn:</span>
                  {selectedRefund?.phiSan.toLocaleString("vi-VN")} đ
                </div>

                <div className="flex gap-3">
                  <Plus size={20} className="mt-1 shrink-0" />
                  <span>
                    <b>Lí do: </b> {selectedRefund.liDo}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-1 mt-5">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700 transition"
                  onClick={() => handleRejectRefund()}
                >
                  Từ chối hoàn
                </button>
                <button
                  type="submit"
                  className="w-full bg-[#cf345a] hover:bg-[#c71c46] text-white py-2 transition"
                  onClick={() => handleAcceptRefund()}
                >
                  Chấp nhận hoàn
                </button>
              </div>
              <button
                type="button"
                className="w-full bg-slate-500 text-white py-2 hover:bg-slate-600 transition"
                onClick={() => {
                  setSelectedRefund(false);
                  setOpenRefundModal(false);
                }}
              >
                Hủy thao tác
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
