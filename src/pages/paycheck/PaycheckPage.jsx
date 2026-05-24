import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, Wallet, CreditCard } from "lucide-react";

import { checkVoucherApplied } from "../../services/voucherService";
import { getCourse } from "../../services/courseService";
import SecureImage from "../../components/SecureImage";
import { createTransaction } from "../../services/transactionService";

import { useToast } from "../../contexts/ToastContext";

export default function PaycheckPage() {
  const { khoaHocID } = useParams();
  const [method, setMethod] = useState("momo");
  const [voucherCode, setVoucherCode] = useState("");
  const [voucher, setVoucher] = useState(null);
  const [error, setError] = useState("");
  const [course, setCourse] = useState({});

  const [paymentMethod, setPaymentMethod] = useState(0);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const fetchCourse = async () => {
    const data = await getCourse(khoaHocID);
    if (data) {
      setCourse(data);
    }
  };
  useEffect(() => {
    fetchCourse();
  }, []);

  const methods = [
    {
      id: 1,
      name: "Ví MoMo",
      description: "Thanh toán qua ứng dụng MoMo",
      icon: (
        <div className="w-8 h-8 bg-pink-500 rounded-md flex items-center justify-center text-white font-bold">
          M
        </div>
      ),
    },
    {
      id: 2,
      name: "Chuyển khoản ngân hàng",
      description: "Chuyển khoản qua mã QR hoặc STK",
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
    },
    {
      id: 3,
      name: "Ví điện tử khác",
      description: "ZaloPay, VNPay, ShopeePay",
      icon: <Wallet className="w-8 h-8 text-green-700" />,
    },
  ];

  const handleApplyVoucher = async (e) => {
    e.preventDefault();

    if (voucherCode == "") return;
    const data = await checkVoucherApplied(voucherCode);
    if (!data) {
      setError("Voucher không tồn tại!");
      setVoucher(null);
      setVoucherCode("");
    } else {
      setVoucher(data);
      setError("");
    }
  };

  const calculateDiscount = () => {
    if (!voucher) return 0;
    if (voucher.loaiVoucher == 0) {
      let discount = course.mucPhi * voucher.triGia;
      return discount;
    }
    if (voucher.loaiVoucher == 1) {
      return voucher.triGia;
    }
    return 0;
  };

  const finalPrice =
    course.mucPhi - calculateDiscount() >= 0
      ? course.mucPhi - calculateDiscount()
      : 0;

  const handlePaycheck = async () => {
    const payload = {
      congGD: paymentMethod,
      khoaHocID: khoaHocID,
      voucherID: voucher?.voucherID || null,
    };
    console.log(payload);

    const res = await createTransaction(payload);
    if (!res) {
      addToast("Không thể thực hiện giao dịch, vui lòng thử lại!", "error");
      return;
    }
    navigate("../rating");
    addToast(
      "Giao dịch thành công, bây giờ bạn có thể xem chi tiết khóa học",
      "success",
    );
  };

  return (
    <div className="p-6 font-sans">
      <div className="w-full items-center flex flex-col">
        <div className="h-[85vh] bg-white p-6 px-20 shadow items-center flex flex-col">
          <h2 className="text-2xl font-black mb-10 text-blue-500">
            Thanh toán khóa học
          </h2>
          <div className="h-full flex flex-col">
            <div className="flex gap-4">
              <SecureImage
                src={course.hinhAnh}
                className="h-40 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-xl">
                  {course.tenKhoaHoc} - {course.khoaHocID}
                </h3>
                <h2 className="">
                  {course.hoTen} - {course.userID}
                </h2>
                <div className="border-b-1 w-full"></div>
                <p className="text-[#cf345a] text-sm font-bold mt-2">
                  Giá gốc: {course.mucPhi?.toLocaleString()}đ
                </p>
                <p className="text-green-600 text-sm font-semibold">
                  - {calculateDiscount().toLocaleString()}đ
                </p>
                <p className="text-blue-600 text-sm font-bold mt-2">
                  Số tiền cần trả: {finalPrice.toLocaleString()}đ
                </p>
              </div>
            </div>

            <div className="w-full mt-10 flex flex-col justify-between h-full">
              <div className="items-start">
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
                  <div className="mt-3 flex max-w-[50%] items-center justify-between bg-green-50 border border-green-300 rounded-lg p-3">
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
                      className="text-red-600 mr-5 font-bold hover:scale-110 transition"
                    >
                      <X />
                    </button>
                  </div>
                )}
                {error && !voucher && (
                  <p className="ml-3 text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>
              <div className="flex gap-3 mt-10">
                {methods.map((method) => (
                  <label
                    key={method.id}
                    className={`
                      relative flex items-center p-4 cursor-pointer border-2 rounded-xl transition-all duration-200
                      ${
                        paymentMethod == method.id
                          ? "border-blue-500 bg-blue-50 ring-blue-500"
                          : "border-gray-100 hover:border-gray-200 bg-white"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="payment"
                      className="hidden"
                      value={method.id}
                      checked={paymentMethod == method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />

                    <div className="flex items-center gap-4 w-full">
                      <div className="flex-shrink-0">{method.icon}</div>

                      <div className="flex-grow text-left">
                        <p
                          className={`font-semibold ${paymentMethod == method.id ? "text-blue-700" : "text-gray-700"}`}
                        >
                          {method.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              onClick={handlePaycheck}
              className="max-w-[250px] min-w-[200px] px-5 py-2 font-semibold text-blue-500 border hover:bg-blue-500 hover:text-white transition"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
