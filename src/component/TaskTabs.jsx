import React from 'react';

const TaskTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ['Pending', 'Completed', 'All Tasks'];

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 mt-4 overflow-x-auto">
      <div className="flex justify-between px-4 border-b border-gray-200">
        <div className="flex-1">
          <button
            onClick={() => setActiveTab('Pending')}
            className={`w-full px-5 py-2 text-sm font-medium rounded-t-md transition-colors duration-150 ${
              activeTab === 'Pending'
                ? 'text-purple-600 border-b-2 border-purple-500 bg-purple-50'
                : 'text-gray-500 hover:text-purple-600 hover:bg-gray-100 border-b-2 border-transparent'
            }`}
          >
            Pending
          </button>
        </div>
        <div className="flex-1 text-center">
          <button
            onClick={() => setActiveTab('Completed')}
            className={`w-full px-5 py-2 text-sm font-medium rounded-t-md transition-colors duration-150 ${
              activeTab === 'Completed'
                ? 'text-purple-600 border-b-2 border-purple-500 bg-purple-50'
                : 'text-gray-500 hover:text-purple-600 hover:bg-gray-100 border-b-2 border-transparent'
            }`}
          >
            Completed
          </button>
        </div>
        <div className="flex-1 text-right">
          <button
            onClick={() => setActiveTab('All Tasks')}
            className={`w-full px-5 py-2 text-sm font-medium rounded-t-md transition-colors duration-150 ${
              activeTab === 'All Tasks'
                ? 'text-purple-600 border-b-2 border-purple-500 bg-purple-50'
                : 'text-gray-500 hover:text-purple-600 hover:bg-gray-100 border-b-2 border-transparent'
            }`}
          >
            All Tasks
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTabs;
