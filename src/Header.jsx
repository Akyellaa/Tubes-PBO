import { useState } from "react";
import { Calendar, List } from "lucide-react";
import { LuSquareCheckBig } from "react-icons/lu";

export default function Header() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <LuSquareCheckBig style={{ color: "#9B87F5" }} className="w-6 h-6" />
        <span className="text-xl font-bold text-gray-800">TaskMaster</span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setActiveTab("list")}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition ${
            activeTab === "list"
              ? "text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          style={activeTab === "list" ? { backgroundColor: "#9B87F5" } : {}}
        >
          <List size={18} />
          List
        </button>

        <button
          onClick={() => setActiveTab("calendar")}
          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition ${
            activeTab === "calendar"
              ? "text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          style={activeTab === "calendar" ? { backgroundColor: "#9B87F5" } : {}}
        >
          <Calendar size={18} />
          Calendar
        </button>

        <button
          style={{ backgroundColor: "#9B87F5" }}
          className="px-4 py-2 text-sm font-semibold text-white rounded hover:opacity-90 transition"
        >
          + New Task
        </button>
      </div>
    </nav>
  );
}
