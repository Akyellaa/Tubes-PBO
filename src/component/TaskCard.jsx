import React from 'react';
import { Calendar, Clock, Bell, Edit, Trash2 } from 'lucide-react';

const getCategoryColor = (category) => {
  const colors = {
    Work: 'bg-orange-100 text-orange-800',
    Campus: 'bg-blue-100 text-blue-800',
    Competition: 'bg-purple-100 text-purple-800',
    Personal: 'bg-green-100 text-green-800'
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const getPriorityBorder = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'border-l-red-500';
    case 'medium':
      return 'border-l-yellow-400';
    case 'low':
      return 'border-l-green-500';
    default:
      return 'border-l-gray-300';
  }
};

const getPriorityCheckboxColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return 'text-red-500 focus:ring-red-300';
    case 'medium':
      return 'text-yellow-500 focus:ring-yellow-300';
    case 'low':
      return 'text-green-500 focus:ring-green-300';
    default:
      return 'text-gray-400';
  }
};

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const isCompleted = task.status === 'completed';

  return (
    <div
      className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border-l-4 ${getPriorityBorder(task.priority)}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleComplete(task)}
            className={`w-4 h-4 rounded ${getPriorityCheckboxColor(task.priority)}`}
          />
          <h3 className={`font-semibold text-base ${isCompleted ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {task.title}
          </h3>
        </div>
        <div className="flex gap-3">
          <button onClick={() => onEdit(task)} className="text-gray-400 hover:text-gray-600">
            <Edit size={16} />
          </button>
          <button onClick={() => onDelete(task)} className="text-red-500 hover:text-red-700">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className={`text-sm mb-3 ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
        {task.description}
      </p>

      {/* Info */}
      <div className="flex flex-wrap gap-3 text-sm items-center text-gray-600">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
          {task.category}
        </span>
        <div className="flex items-center text-gray-500">
          <Calendar size={14} className="mr-1" />
          {task.dueDate}
        </div>
        <div className="flex items-center text-gray-500">
          <Clock size={14} className="mr-1" />
          {task.dueTime}
        </div>
        {task.isWeekly && (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">Daily</span>
        )}
        {task.hasReminder && (
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-md">Reminder</span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
