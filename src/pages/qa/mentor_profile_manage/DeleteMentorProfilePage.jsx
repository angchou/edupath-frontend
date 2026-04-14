import SearchBar from "../../../components/SearchBar";
import { useState } from "react";

import { Eye, X } from "lucide-react";
import { FaCode } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";

export default function DeleteMentorProfilePage() {
  const profiles = [
    {
      hoSoID: "HS0001",
      url: "<url pdf>",
      trangThai: "Đang chờ",
      ngayTao: "<ngày tạo>",
      hocVienID: "U0001",
    },
    {
      hoSoID: "HS0002",
      url: "<url pdf>",
      trangThai: "Đang chờ",
      ngayTao: "<ngày tạo>",
      hocVienID: "U0002",
    },
    {
      hoSoID: "HS0003",
      url: "<url pdf>",
      trangThai: "Đang chờ",
      ngayTao: "<ngày tạo>",
      hocVienID: "U0003",
    },
    {
      hoSoID: "HS0004",
      url: "<url pdf>",
      trangThai: "Đang chờ",
      ngayTao: "<ngày tạo>",
      hocVienID: "U0004",
    },
    {
      hoSoID: "HS0005",
      url: "<url pdf>",
      trangThai: "Đang chờ",
      ngayTao: "<ngày tạo>",
      hocVienID: "U0005",
    },
    {
      hoSoID: "HS0006",
      url: "<url pdf>",
      trangThai: "Đang chờ",
      ngayTao: "<ngày tạo>",
      hocVienID: "U0006",
    },
  ];

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmployees = profiles.filter((profile) => {
    const keyword = searchTerm.toLowerCase();

    return (
      profile.hoSoID.toLowerCase().includes(keyword) ||
      profile.hocVienID.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            Xóa hồ sơ đăng ký làm người hướng dẫn
          </h2>
        </header>

        <main className="flex-1 p-4 md:p-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-6">
            <p className="text-sm text-gray-500">
              Tổng cộng {profiles.length} hồ sơ đăng ký
            </p>
            <SearchBar
              label="Tìm kiếm hồ sơ"
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
            />
          </div>

          <div className="h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
            <div className="max-h-[50vh] overflow-y-auto">
              <table className="w-full min-w-[700px] text-left">
                <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Mã hồ sơ
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Mã học viên
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      ngày tạo
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      trạng thái
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Hồ sơ
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((profile) => (
                      <tr
                        key={profile.hoSoID}
                        className="hover:bg-blue-50/30 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {profile.hoSoID}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {profile.hocVienID}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {profile.ngayTao}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {profile.trangThai}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          <FaFileAlt
                            size={25}
                            className="ml-2 hover:text-blue-500 hover:rotate-10 transition"
                          />
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            className="flex items-center gap-1 text-[#cf345a] hover:text-[#c71c46] hover:scale-110 text-sm font-medium transition"
                            onClick={() => {
                              setOpenModal(true);
                              setSelectedProfile(profile);
                            }}
                          >
                            Xóa
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
                        Không tìm thấy nhân viên
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-5 mt-4">Xóa hồ sơ</h2>
            <div className="h-full flex flex-col items-center justify-center">
              <FaFileAlt className="size-12" />
              <div className="mt-5 w-full flex flex-col gap-2">
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-yellow-500" />
                  <span className="font-bold">Mã hồ sơ:</span>
                  {selectedProfile?.hoSoID}
                </div>
                <div className="flex gap-3">
                  <FaCode size={20} className="mt-1 text-red-500" />
                  <span className="font-bold">Mã học viên tạo hồ sơ:</span>
                  {selectedProfile?.hocVienID}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Ngày tạo:</span>
                  {selectedProfile?.ngayTao}
                </div>
                <div className="flex gap-3">
                  <span className="font-bold">Trạng thái hồ sơ:</span>
                  {selectedProfile?.trangThai}
                </div>
              </div>
            </div>

            <form action="">
              <input
                type="text"
                placeholder="Nhập lại mã hồ sơ"
                className="w-full border mt-4 rounded-lg p-2 outline-none focus:border-blue-500"
                required
              />
              <div className="flex gap-1 mt-5">
                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setOpenModal(false)}
                >
                  Thoát
                </button>
                <button
                  type="submit"
                  className="w-full bg-[#cf345a] hover:bg-[#c71c46] text-white py-2 rounded-lg transition"
                >
                  Xác nhận xóa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
