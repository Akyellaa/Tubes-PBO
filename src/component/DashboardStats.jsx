import { LuCircleCheckBig, LuClock, LuListChecks, LuTriangleAlert } from "react-icons/lu";


const stats = [
  { title: "Completed Today", count: 0, icon: <LuCircleCheckBig size={24} />, color: "bg-purple-100 text-purple-600" },
  { title: "Completed This Week", count: 0, icon: <LuClock size={24} />, color: "bg-purple-100 text-purple-600" },
  { title: "Completed This Month", count: 0, icon: <LuListChecks size={24} />, color: "bg-purple-100 text-purple-600" },
  { title: "High Priority Tasks", count: 0, icon: <LuTriangleAlert size={24} />, color: "bg-purple-100 text-purple-600" },
];

export default function DashboardStats() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-gray-50">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-white p-4 h-25 rounded-lg border border-gray-200 shadow flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.count}</h3>
          </div>
          <div
            className="w-10 h-10 flex items-center justify-center rounded-full"
            style={{ backgroundColor: "#F3E8FF", color: "#9B87F5" }}
          >
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

