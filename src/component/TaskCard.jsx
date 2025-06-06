import React from 'react';
import { Calendar, Clock, Bell, Edit, Trash2 } from 'lucide-react';

const getCategoryColor = (category) => {
  const colors = {
    Work: 'bg-orange-100 text-orange-800',
    Campus: 'bg-blue-100 text-blue-800',
    Competition: 'bg-purple-100 text-purple-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const getBorderColor = (color) => {
  const colors = {
    yellow: 'border-l-yellow-400',
    red: 'border-l-red-400',
    green: 'border-l-green-400',
    blue: 'border-l-blue-400'
  };
  return colors[color] || 'border-l-gray-400';
};

const TaskCard = ({ task }) => {
  return (
    <div
      className={`bg-white border-l-4 ${getBorderColor(task.color)} rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <h3 className="font-medium text-gray-900">{task.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <Edit size={16} />
          </button>
          <button className="p-1 text-gray-400 hover:text-red-600">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3">{task.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}
          >
            {task.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={14} className="mr-1" />
            {task.dueDate}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={14} className="mr-1" />
            {task.dueTime}
          </div>
          {task.hasReminder && (
            <div className="flex items-center text-purple-600 text-sm">
              <Bell size={14} className="mr-1" />
              Reminder
            </div>
          )}
          {task.isWeekly && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              Weekly
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
