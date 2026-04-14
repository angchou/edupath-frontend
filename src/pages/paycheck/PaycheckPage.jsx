// src/pages/CheckoutPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Danh sách voucher hợp lệ
const VALID_VOUCHERS = {
  GIAM50K: 50000,
  GIAM100K: 100000,
  REACTVIP: 200000,
};

export default function CheckoutPage() {
  const navigate = useNavigate();

  const [voucher, setVoucher] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);

  // SỬA: Dùng 1 object null thay vì mảng []
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [inputStatus, setInputStatus] = useState("idle");

  const course = {
    title: "React nâng cao",
    description: "Học React từ cơ bản đến nâng cao",
    price: 500000,
  };

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      alert("Đã hết thời gian thanh toán. Vui lòng đặt hàng lại!");
      navigate("/learner/course"); // Thay bằng đường dẫn bạn muốn quay lại
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Xử lý khi gõ vào ô input
  const handleVoucherChange = (e) => {
    setVoucher(e.target.value.toUpperCase());
    setInputStatus("idle");
  };

  // Xử lý khi bấm nút Áp dụng
  const handleVoucherApply = () => {
    const code = voucher.trim();
    if (!code) return;

    // Kiểm tra xem mã có hợp lệ không
    if (VALID_VOUCHERS[code]) {
      // Nếu nhập lại đúng cái đang dùng
      if (appliedVoucher?.code === code) {
        alert("Bạn đang sử dụng mã này rồi!");
        setInputStatus("error");
        return;
      }

      // SỬA: Cập nhật trực tiếp 1 voucher (ghi đè nếu có mã cũ)
      setAppliedVoucher({ code, discount: VALID_VOUCHERS[code] });
      setInputStatus("success");
      setVoucher("");
    } else {
      // Sai mã voucher
      setInputStatus("error");
    }
  };

  // SỬA: Hàm gỡ voucher chỉ cần set lại bằng null
  const removeVoucher = () => {
    setAppliedVoucher(null);
    setInputStatus("idle"); // Reset màu viền input
  };

  // SỬA: Lấy discount từ 1 voucher duy nhất
  const totalDiscount = appliedVoucher ? appliedVoucher.discount : 0;
  const finalPrice = Math.max(0, course.price - totalDiscount);

  const handlePay = () => {
    if (!agreed) {
      alert("Bạn phải đồng ý thanh toán trước!");
      return;
    }
    alert(`Thanh toán thành công số tiền: ${finalPrice.toLocaleString()} VND`);
  };

  // Logic màu viền cho input
  let inputBorderClass =
    "border-gray-300 focus:border-blue-500 focus:ring-blue-500";
  if (inputStatus === "success")
    inputBorderClass = "border-green-500 ring-1 ring-green-500";
  if (inputStatus === "error")
    inputBorderClass = "border-red-500 ring-1 ring-red-500";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6 mt-10">
      {/* Thông tin khóa học */}
      <div className="border-b pb-4 border-blue-500">
        <h2 className="text-2xl font-bold">{course.title}</h2>
        <p className="text-gray-600">{course.description}</p>
        <p className="mt-2 text-lg font-semibold">
          Giá: {course.price.toLocaleString()} VND
        </p>
      </div>

      {/* Phương thức thanh toán */}
      <div className="border-b pb-4 border-blue-500">
        <h3 className="text-lg font-semibold mb-2">
          Chọn phương thức thanh toán
        </h3>
        <div className="flex items-center gap-3">
          <input type="radio" id="bank" name="payment" checked readOnly />
          <label htmlFor="bank">Quét mã ngân hàng</label>
        </div>
      </div>

      {/* Voucher */}
      <div className="border-b pb-4 border-blue-500">
        <h3 className="text-lg font-semibold mb-2">Nhập voucher</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={voucher}
            onChange={handleVoucherChange}
            placeholder="Nhập mã (VD: GIAM50K, GIAM100K)"
            className={`border p-2 flex-1 rounded outline-none transition-colors ${inputBorderClass}`}
          />
          <button
            onClick={handleVoucherApply}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded transition-colors"
          >
            Áp dụng
          </button>
        </div>

        {/* Báo lỗi nếu sai */}
        {inputStatus === "error" && (
          <p className="text-red-500 text-sm mb-2">
            Mã voucher không hợp lệ hoặc đang được sử dụng.
          </p>
        )}

        {/* SỬA: Hiển thị 1 voucher đang áp dụng (nếu có) */}
        {appliedVoucher && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-2">Voucher đang áp dụng:</p>
            <div className="flex flex-wrap gap-2">
              <div className="bg-green-100 border border-green-300 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                <span
                  title={`Giảm ${appliedVoucher.discount.toLocaleString()}đ`}
                >
                  {appliedVoucher.code}
                </span>
                <button
                  onClick={removeVoucher}
                  className="text-green-900 hover:text-red-500 font-bold ml-1 cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Số tiền phải trả */}
      <div className="border-b pb-4 border-blue-500">
        <h3 className="text-lg font-semibold mb-2">Tổng kết đơn hàng</h3>
        <div className="space-y-1">
          <p className="text-gray-600 flex justify-between">
            <span>Giá gốc:</span>
            <span>{course.price.toLocaleString()} VND</span>
          </p>

          {/* Hiển thị số tiền được giảm nếu có voucher */}
          {totalDiscount > 0 && (
            <p className="text-green-600 flex justify-between font-medium">
              <span>Được giảm ({appliedVoucher.code}):</span>
              <span>- {totalDiscount.toLocaleString()} VND</span>
            </p>
          )}

          <div className="pt-2 mt-2 border-t border-blue-500 flex justify-between items-center">
            <span className="font-bold text-lg">Số tiền phải trả:</span>
            <span className="text-2xl font-bold text-red-600">
              {finalPrice.toLocaleString()} VND
            </span>
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="border-b pb-4 border-blue-500">
        <h3 className="text-lg font-semibold mb-2">Thời gian còn lại</h3>
        <p className="text-red-500 text-xl font-bold">{formatTime(timeLeft)}</p>
      </div>

      {/* Đồng ý thanh toán */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="w-4 h-4 cursor-pointer"
        />
        <label htmlFor="agree" className="cursor-pointer select-none">
          Tôi đồng ý thực hiện thanh toán
        </label>
      </div>

      <button
        onClick={handlePay}
        className={`w-full py-3 rounded transition-colors ${
          agreed
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        } text-white font-semibold text-lg mt-4`}
        disabled={!agreed}
      >
        Tiến hành thanh toán
      </button>
    </div>
  );
}
