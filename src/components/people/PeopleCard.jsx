import { User } from "lucide-react"; // icon user

export default function PeopleCard({ user }) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-lg transition-shadow">
      <div className="bg-blue-100 p-3 rounded-full">
        <User className="text-blue-500 w-6 h-6" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{user.username}</h3>
        <p className="text-gray-500 text-sm">ID: {user.user_id}</p>
        <p className="text-gray-500 text-sm">Email: {user.email}</p>
        <p className="text-gray-500 text-sm">
          Vai trò: {user.user_role.join(", ")}
        </p>
        <p className="text-gray-400 text-xs">
          Thời gian tạo: {user.created_at}
        </p>
      </div>
    </div>
  );
}
