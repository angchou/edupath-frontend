import SearchBar from "../../../components/SearchBar";
import { useEffect, useState } from "react";

import { Eye, X, Loader2 } from "lucide-react";
import { FaUserCircle, FaCode } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { useToast } from "../../../contexts/ToastContext";
import { getApplication } from "../../../services/applicationService";
import { BASE_URL } from "../../../utils/apiConfig";

import {
  approveApplication,
  rejectApplication,
} from "../../../services/applicationService";

export default function ApproveMentorProfilePage() {
  const { addToast } = useToast();
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [openApproveMentorProfileModal, setOpenApproveMentorProfileModal] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [confirmId, setConfirmId] = useState("");

  const fetchApplication = async () => {
    try {
      const data = await getApplication(0);
      setProfiles(data || []);
    } catch (error) {
      console.error("Lỗi lấy danh sách:", error);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const handleViewPdfExternal = async (fileUrl) => {
    if (!fileUrl) return;
    setIsLoadingPdf(true);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${BASE_URL}/api/learner/view-pdf/${fileUrl}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
      } else {
        addToast("Không thể tải file PDF", "error");
      }
    } catch (error) {
      console.error("Lỗi khi mở PDF:", error);
    } finally {
      setIsLoadingPdf(false);
    }
  };

  const handleOpenCheck = (profile) => {
    setSelectedProfile(profile);
    setConfirmId("");
    setOpenApproveMentorProfileModal(true);
  };

  const filteredEmployees = profiles.filter((profile) => {
    const keyword = searchTerm.toLowerCase();
    return (
      profile.hoSoID.toLowerCase().includes(keyword) ||
      profile.userID?.toLowerCase().includes(keyword)
    );
  });

  const handleApproveProfile = async (actionType) => {
    if (confirmId !== selectedProfile?.hoSoID) {
      addToast("Mã hồ sơ xác nhận không chính xác!", "");
      return;
    }
    console.log(selectedProfile.hoSoID);
    if (actionType === 0) {
      const res = await rejectApplication(selectedProfile.hoSoID);
      if (!res) {
        addToast("Đã xảy ra lỗi, vui lòng thử lại!", "error");
        return;
      }
      fetchApplication();
      addToast("Thành công từ chối hồ sơ đăng ký!", "success");
    } else {
      const res = await approveApplication(selectedProfile.hoSoID);
      if (!res) {
        addToast("Đã xảy ra lỗi, vui lòng thử lại!", "error");
        return;
      }
      fetchApplication();
      addToast("Thành công phê duyệt hồ sơ đăng ký!", "success");
    }
    setOpenApproveMentorProfileModal(false);
  };

  return (
    <div className="flex h-[90vh] flex-col font-sans">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="md:h-16 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <p className="text-sm text-gray-500">
            Tổng cộng {profiles.length} hồ sơ cần duyệt
          </p>
          <SearchBar
            label="Tìm kiếm hồ sơ"
            value={searchTerm}
            onChange={(value) => setSearchTerm(value)}
          />
        </header>

        <main className="flex-1 p-4 md:p-2">
          <div className="overflow-x-auto border border-gray-100">
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
                      Ngày tạo
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-center">
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
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {profile.userID}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {profile.ngayTao}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          Chờ kiểm duyệt
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 text-center">
                          <button
                            disabled={isLoadingPdf}
                            onClick={() => handleViewPdfExternal(profile.url)}
                            className="disabled:opacity-50"
                          >
                            <FaFileAlt
                              size={25}
                              className="mx-auto hover:text-blue-500 transition cursor-pointer"
                            />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className="flex items-center gap-1 text-blue-500 hover:text-blue-60 hover:scale-105 text-sm font-medium transition"
                            onClick={() => handleOpenCheck(profile)}
                          >
                            Phê duyệt
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
                        Không tìm thấy hồ sơ
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {openApproveMentorProfileModal && (
        <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded shadow-md p-6 relative text-gray-800">
            <button
              onClick={() => setOpenApproveMentorProfileModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold mb-4">Duyệt hồ sơ</h2>

            <div className="space-y-2  pb-4">
              <div className="flex gap-2">
                <span className="font-semibold w-28">Mã hồ sơ:</span>
                <span>{selectedProfile?.hoSoID}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-28">Người tạo:</span>
                <span>
                  {selectedProfile?.userID} - {selectedProfile?.hoTen}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-28">Email:</span>
                <span>{selectedProfile?.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold w-28">Ngày tạo:</span>
                <span>{selectedProfile?.ngayTao}</span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm mb-2 text-gray-600">
                Nhập mã hồ sơ để xác nhận:
              </label>
              <input
                type="text"
                value={confirmId}
                onChange={(e) => setConfirmId(e.target.value)}
                placeholder="Nhập lại mã hồ sơ để tiếp tục"
                className="w-full border border-gray-300 p-2 outline-none focus:border-blue-500 transition"
              />

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => handleApproveProfile(0)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 hover:bg-gray-300 font-medium transition"
                >
                  Từ chối duyệt
                </button>
                <button
                  onClick={() => handleApproveProfile(1)}
                  className="flex-1 bg-blue-600 text-white py-2 hover:bg-blue-700 transition font-medium"
                >
                  Cấp quyền
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
