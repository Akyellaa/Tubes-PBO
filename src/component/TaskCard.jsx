// ✅ TaskCard.jsx (disesuaikan dengan struktur API)
import React from 'react';
import { Calendar, Clock, Bell, Edit, Trash2, Repeat } from 'lucide-react';

const getCategoryColor = (category) => {
  const colors = {
    Work: 'bg-orange-100 text-orange-800',
    Campus: 'bg-blue-100 text-blue-800',
    Competition: 'bg-purple-100 text-purple-800',
    Personal: 'bg-green-100 text-green-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
};

const getPriorityBorder = (priority) => {
  switch (priority) {
    case 3:
      return 'border-l-red-500';
    case 2:
      return 'border-l-yellow-400';
    case 1:
      return 'border-l-green-500';
    default:
      return 'border-l-gray-300';
  }
};

const getPriorityCheckboxColor = (priority) => {
  switch (priority) {
    case 3:
      return 'text-red-500 focus:ring-red-300';
    case 2:
      return 'text-yellow-500 focus:ring-yellow-300';
    case 1:
      return 'text-green-500 focus:ring-green-300';
    default:
      return 'text-gray-400';
  }
};

const getRecurrenceColor = (recurrence) => {
  switch (recurrence?.toLowerCase()) {
    case 'daily':
      return 'bg-blue-100 text-blue-700';
    case 'weekly':
      return 'bg-yellow-100 text-yellow-700';
    case 'monthly':
      return 'bg-pink-100 text-pink-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const isCompleted = task.status === 'COMPLETED';
  const deadline = task.deadline ? new Date(task.deadline) : null;
  const dueDate = deadline ? deadline.toISOString().split('T')[0] : '';
  const dueTime = deadline ? deadline.toTimeString().slice(0, 5) : '';

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow border-l-4 ${getPriorityBorder(task.priority)}`}>
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

      <p className={`text-sm mb-3 ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
        {task.description}
      </p>

      <div className="flex flex-wrap gap-3 text-sm items-center text-gray-600">
        {task.category?.name && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category.name)}`}>
            {task.category.name}
          </span>
        )}

        {dueDate && (
          <div className="flex items-center text-gray-500">
            <Calendar size={14} className="mr-1" />
            {dueDate}
          </div>
        )}

        {dueTime && (
          <div className="flex items-center text-gray-500">
            <Clock size={14} className="mr-1" />
            {dueTime}
          </div>
        )}

        {task.hasReminder && (
          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-md">
            <Bell size={12} className="inline mr-1" /> Reminder
          </span>
        )}

        {task.taskType === 'RECURRING' && task.recurrenceDays?.length > 0 && (
          <span className={`text-xs px-2 py-1 rounded-md flex items-center gap-1 ${getRecurrenceColor('weekly')}`}>
            <Repeat size={12} /> Weekly
          </span>
        )}
      </div>
    </div>
  );
};

export default TaskCard;