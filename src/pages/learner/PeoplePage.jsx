import { useState, useEffect } from "react";
import PeopleCard from "../../components/people/PeopleCard";
import SearchBar from "../../components/SearchBar";
import { getCustomers } from "../../services/customerService";

export default function PeoplePage() {
  // 1. Khai báo state để lưu danh sách user thật từ API
  const [users, setUsers] = useState([]);

  // 2. Thêm state loading để biết khi nào API đang chạy
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // 3. Dùng useEffect để gọi API 1 lần duy nhất khi component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Bắt đầu tải
        const data = await getCustomers(); // Gọi hàm service của bạn

        // Cập nhật dữ liệu vào state (đảm bảo data là một mảng)
        setUsers(data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách người dùng:", error);
        alert("Không thể tải danh sách người dùng!");
      } finally {
        setLoading(false); // Kết thúc tải dù thành công hay thất bại
      }
    };

    fetchUsers();
  }, []); // Mảng rỗng [] nghĩa là chỉ chạy 1 lần khi mở trang

  // 4. (Tùy chọn) Logic lọc user theo thanh SearchBar
  const filteredUsers = users.filter((user) => {
    // Tìm theo email hoặc tên (nhớ đổi tên trường cho khớp với API trả về nhé)
    const keyword = search.toLowerCase();
    const emailMatch = user.email?.toLowerCase().includes(keyword);
    const usernameMatch = user.username?.toLowerCase().includes(keyword); // dùng user.name nếu API trả về name
    return emailMatch || usernameMatch;
  });

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[60%] px-4 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Danh sách người dùng
        </h2>

        <SearchBar
          label="Tìm kiếm người dùng..." // Mình sửa lại label cho hợp ngữ cảnh
          value={search}
          onChange={(value) => setSearch(value)}
        />

        {/* Hiển thị Loading hoặc Danh sách */}
        {loading ? (
          <div className="mt-10 text-lg font-semibold text-gray-500">
            Đang tải dữ liệu...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 w-full">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                // Đảm bảo truyền đúng key (tùy thuộc API trả về user_id hay id)
                <PeopleCard key={user.user_id || user.id} user={user} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 mt-5">
                Không tìm thấy người dùng nào.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
