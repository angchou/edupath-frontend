import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import SearchBar from "../../../components/SearchBar";
import CourseCard from "../../../components/course/CourseCard";

export default function MyCoursePage() {
  const courses = [
    {
      khoaHocID: "KH0001",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô mô tả khóa học mô mô tả khóa học mô mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
    {
      khoaHocID: "KH0002",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
    {
      khoaHocID: "KH0003",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
    {
      khoaHocID: "KH0004",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
    {
      khoaHocID: "KH0005",
      tenKhoaHoc: "Du học cùng six seven",
      moTa: "mô tả khóa học mô tả khóa học mô",
      nguoiHuongDanID: "U0003",
      hoTen: "Châu Gia An",
      ngayTao: "<ngày tạo khóa học>",
      soLuongHocVien: "100",
      giaBan: 1500000,
      hinhAnh:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3PoprumCX_HbXTfKRwKHg6M9iev5dapLsbg&s",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-gray-50 font-sans">
      <div className="p-5 flex-1 flex flex-col overflow-hidden">
        <header className="md:h-20 bg-white border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 md:px-8 py-3">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800">
            DANH SÁCH KHÓA HỌC CỦA TÔI
          </h2>
          <SearchBar label="Tìm kiếm khóa học" />
        </header>

        <div className="p-6 max-h-[750px] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
