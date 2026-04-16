import { useParams } from "react-router-dom";
import { useState } from "react";

export default function PaycheckPage() {
  const { khoaHocID } = useParams();
  const [method, setMethod] = useState("momo");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [error, setError] = useState("");

  const course = {
    khoaHocID: "KH0002",
    tenKhoaHoc: "Du học cùng six seven",
    giaBan: 1500000,
    hinhAnh:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    hoTen: "Châu Gia An",
    nguoiHuongDanID: "U0001",
  };

  const handleApplyVoucher = async (e) => {
    e.preventDefault();

    try {
      if (voucherCode === "GIAM50") {
        const fakeVoucher = {
          discountType: "PERCENT",
          discountValue: 50,
        };

        setVoucher(fakeVoucher);
        setError("");
      } else {
        throw new Error("Voucher không hợp lệ");
      }
    } catch (err) {
      setVoucher(null);
      setError(err.message);
      setVoucherCode("");
    }
  };

  const calculateDiscount = () => {
    if (!voucher) return 0;
    if (voucher.discountType === "PERCENT") {
      let discount = course.giaBan * (voucher.discountValue / 100);
      if (voucher.maxDiscount) {
        discount = Math.min(discount, voucher.maxDiscount);
      }
      return discount;
    }
    if (voucher.discountType === "FIXED") {
      return voucher.discountValue;
    }
    return 0;
  };

  const finalPrice = course.giaBan - calculateDiscount();

  return (
    <div className="p-6 bg-gray-50 font-sans">
      <div className="max-w-[75vw] mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-white my-auto p-6 rounded-xl shadow col-span-2">
          <h2 className="text-xl font-semibold mb-4">Thanh toán khóa học</h2>

          <div className="flex gap-4">
            <img
              src={course.hinhAnh}
              className="h-40 object-cover rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-xl">
                {course.tenKhoaHoc} - {course.khoaHocID}
              </h3>
              <h2 className="">
                {course.hoTen} - {course.khoaHocID}
              </h2>
              <div className="border-b-1 w-full"></div>
              <p className="text-[#cf345a] font-bold mt-2">
                Giá gốc: {course.giaBan.toLocaleString()}đ
              </p>
              <p className="text-green-600 font-semibold">
                - {calculateDiscount().toLocaleString()}đ
              </p>
              <p className="text-blue-600 text-lg font-bold mt-2">
                Số tiền cần trả: {finalPrice.toLocaleString()}đ
              </p>
            </div>
          </div>

          <div className="max-w-[50%] mt-10">
            <h1 className="font-semibold mb-4">Nhập mã voucher</h1>
            <form className="flex flex-grow" onSubmit={handleApplyVoucher}>
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                placeholder="Nhập mã Voucher"
                disabled={voucher !== null}
                className="basis-128 p-3 outline-none bg-gray-100 disabled:bg-gray-200"
              />
              <button
                type="submit"
                disabled={voucher !== null}
                className="basis-64 p-2 bg-blue-500 hover:bg-blue-600 transition text-white font-semibold disabled:bg-gray-400"
              >
                Xác nhận
              </button>
            </form>
            {voucher && (
              <div className="mt-3 flex max-w-[100%] items-center justify-between bg-green-50 border border-green-300 rounded-lg p-3">
                <div>
                  <p className="text-green-700 font-semibold">
                    Đã áp dụng: {voucherCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    Giảm {calculateDiscount().toLocaleString()}đ
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setVoucher(null);
                    setVoucherCode("");
                  }}
                  className="text-red-500 mr-5 font-bold hover:scale-110 transition"
                >
                  Xóa
                </button>
              </div>
            )}
            {error && !voucher && (
              <p className="ml-3 text-red-500 text-sm mt-2">{error}</p>
            )}

            <div className="mt-6">
              <h3 className="font-semibold mb-3">
                Chọn phương thức thanh toán
              </h3>

              <div className="flex flex-col">
                <label className="flex items-center gap-3 p-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={method === "momo"}
                    onChange={() => setMethod("momo")}
                  />
                  <span>Momo</span>
                </label>
                <label className="flex items-center gap-3 p-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    checked={method === "bank"}
                    onChange={() => setMethod("bank")}
                  />
                  <span>Chuyển khoản ngân hàng</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center">
          <h3 className="font-semibold mb-4">Quét QR để thanh toán</h3>

          <img
            src={
              method === "momo"
                ? "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=momo-payment"
                : "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bank-transfer"
            }
            className="w-52 h-52"
          />

          <p className="text-sm text-gray-500 mt-4 text-center">
            Nội dung: userID_{khoaHocID}
          </p>
        </div>
      </div>
    </div>
  );
}
