import { FaSearch, FaFilter, FaCalendarAlt } from "react-icons/fa";

function TaskFilters({
  searchTerm,
  setSearchTerm,
  priorityFilter,
  setPriorityFilter,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3 w-full">
        {/* Search Box */}
        <div className="relative w-full md:w-[340px]">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {/* Priority Filter */}
        <div className="relative w-full md:w-[340px]">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="appearance-none pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm bg-white"
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {/* Category Filter */}
        <div className="relative w-full md:w-[340px]">
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-9 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm bg-white"
          >
            <option>All Categories</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Others</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;
