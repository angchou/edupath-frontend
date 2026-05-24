import React, { useState } from "react";

export default function RevenueReport() {
  const [userRole, setUserRole] = useState("finance");

  const baseUrl =
    "https://app.powerbi.com/reportEmbed?reportId=92cde634-4d77-4ad8-8623-8ed8a6d333fe&autoAuth=true&ctid=2dff09ac-2b3b-4182-9953-2b548e0d0b39";

  const allPages = [
    {
      id: "p1",
      name: "Phân tích doanh thu",
      pageName: "b6ead06eb90d848dbc57",
      roles: ["finance"],
    },
    {
      id: "p2",
      name: "Phân tích chi phí & Ngân sách",
      pageName: "66b11cb8827734c18d83",
      roles: ["finance"],
    },
    {
      id: "p3",
      name: "Phân tích lợi nhuận",
      pageName: "11f951a40682d0525ebf",
      roles: ["finance"],
    },
    {
      id: "p4",
      name: "Phân tích rủi ro & Hoàn tiền",
      pageName: "9de1d0c3c464177a2dbe",
      roles: ["finance"],
    },
    {
      id: "p5",
      name: "Mentor Dashboard",
      pageName: "ReportSection55555",
      roles: ["mentor"],
    },
  ];

  const allowedPages = allPages.filter((page) => page.roles.includes(userRole));

  const [activePage, setActivePage] = useState(allowedPages[0]);

  return (
    <div className="w-full h-[90vh] flex flex-col py-2 px-4 bg-gray-50">
      <div className="w-full flex-1 flex bg-white border border-gray-100 shadow-sm min-h-0">
        <div className="w-64 border-r border-gray-200 p-4 space-y-2 shrink-0 flex flex-col">
          <h3 className="font-bold text-gray-700 text-sm px-2 mb-4 uppercase tracking-wider">
            Trang báo cáo
          </h3>
          {allowedPages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page)}
              className={`w-full text-left px-3 py-2.5 text-sm transition-colors duration-150 ${
                activePage?.id === page.id
                  ? "bg-blue-50 text-blue-500 font-semibold border-l-4 border-blue-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {page.name}
            </button>
          ))}
        </div>

        <div className="flex-1 bg-gray-100 overflow-hidden">
          {activePage ? (
            <iframe
              title="EduPathDashBoard"
              src={`${baseUrl}&pageName=${activePage.pageName}&navContentPaneEnabled=false`}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen={true}
            ></iframe>
          ) : (
            <div className="p-8 text-center text-gray-400">
              Không có trang nào khả dụng.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
