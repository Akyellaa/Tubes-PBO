import React from 'react';

const TaskTabs = ({ activeTab, setActiveTab }) => (
  <div className="bg-white rounded-lg shadow-sm mb-6 mt-4">
    <div className="flex border-b border-gray-200">
      {['Pending', 'Completed', 'All Tasks'].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === tab
              ? 'border-blue-500 text-blue-600'
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
