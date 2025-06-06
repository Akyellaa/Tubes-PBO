import React from 'react';

const TaskTabs = ({ activeTab, setActiveTab }) => (
  <div className="bg-white rounded-lg shadow-sm mb-6 mt-4 overflow-x-auto">
    <div className="flex border-b border-gray-200">
      {['Pending', 'Completed', 'All Tasks'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-150 ${
            activeTab === tab
              ? 'border-purple-500 text-purple-600 bg-purple-50'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

export default TaskTabs;
