export const getCourseStatus = (status) => {
  if (status == 0) {
    return "Đã bị xóa";
  } else if (status == 1) {
    return "Đã bị chặn";
  } else if (status == 2) {
    return "Không công khai";
  } else if (status == 3) {
    return "Yêu cầu mở công khai";
  } else if (status == 4) {
    return "Chờ mở công khai";
  } else if (status == 5) {
    return "Khóa đăng ký mới";
  } else if (status == 6) {
    return "Công khai";
  }
  return "Unknown";
};

export const getCourseStatusColor = (status) => {
  if (status == 0) {
    return "bg-red-400 text-white";
  } else if (status == 1) {
    return "bg-red-400 text-white";
  } else if (status == 2) {
    return "bg-gray-200 text-gray-800";
  } else if (status == 3) {
    return "bg-blue-400 text-white";
  } else if (status == 4) {
    return "bg-blue-500 text-white";
  } else if (status == 5) {
    return "bg-green-300 text-green-800";
  } else if (status == 6) {
    return "bg-green-300 text-green-800";
  }
  return "Unknown";
};
