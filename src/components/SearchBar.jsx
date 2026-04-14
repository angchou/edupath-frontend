import { FaSearch } from "react-icons/fa";

export default function SearchBar({ value, onChange, label }) {
  return (
    <div className="w-full max-w-xl flex gap-3 items-center border-b-2 px-2 py-1 focus-within:border-blue-500 transition">
      <FaSearch className="text-gray-500" />
      <input
        type="text"
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="outline-none p-2 w-full"
      />
    </div>
  );
}
