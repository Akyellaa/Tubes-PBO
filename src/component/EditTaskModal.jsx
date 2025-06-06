// ✅ EditTaskModal.jsx
import React, { useEffect, useState } from 'react';

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('none');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [hasReminder, setHasReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState('30 minutes before');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrence, setRecurrence] = useState('Daily');
  const [hasEndDate, setHasEndDate] = useState(false);
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (task) {
      const date = task.deadline ? new Date(task.deadline) : new Date();
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPriority(['none', 'low', 'medium', 'high'][task.priority] || 'none');
      setCategory(task.category?.name || '');
      setDueDate(date.toISOString().split('T')[0]);
      setDueTime(date.toTimeString().slice(0, 5));
      setHasReminder(task.hasReminder || false);
      setReminderTime(task.reminderTime || '30 minutes before');
      setIsRecurring(task.taskType === 'RECURRING');
      setRecurrence(task.recurrenceDays?.length ? 'Weekly' : 'Daily');
      setHasEndDate(!!task.endDate);
      setEndDate(task.endDate ? task.endDate.split('T')[0] : '');
    }
  }, [task]);

  const handleSubmit = () => {
    const [hour, minute] = dueTime.split(':');
    const updated = {
      ...task,
      title,
      description,
      priority: { none: 0, low: 1, medium: 2, high: 3 }[priority] || 0,
      category: category ? { name: category } : null,
      deadline: new Date(`${dueDate}T${hour}:${minute}:00`).toISOString(),
      hasReminder,
      reminderTime,
      taskType: isRecurring ? 'RECURRING' : 'REGULAR',
      recurrenceDays: isRecurring ? ['MONDAY', 'WEDNESDAY'] : [],
      endDate: hasEndDate ? new Date(endDate).toISOString() : null,
    };
    onSave(updated);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl">×</button>
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mb-4" />
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mb-4" />
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <div className="space-y-1">
              {['none', 'low', 'medium', 'high'].map((level) => (
                <label key={level} className="flex items-center gap-2">
                  <input type="radio" name="priority" value={level} checked={priority === level} onChange={() => setPriority(level)} className="text-gray-700 focus:ring-gray-400" />
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Personal</option>
              <option>Work</option>
              <option>Campus</option>
              <option>Competition</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Time</label>
            <div className="flex items-center gap-1 border border-gray-300 bg-white rounded px-2 py-1">
              <span className="text-gray-500">🕒</span>
              <input type="number" min="0" max="23" value={parseInt(dueTime.split(':')[0]) || 0} onChange={(e) => setDueTime(`${e.target.value.padStart(2, '0')}:${dueTime.split(':')[1] || '00'}`)} className="w-12 text-sm border-none bg-transparent text-center focus:outline-none" />
              :
              <input type="number" min="0" max="59" value={parseInt(dueTime.split(':')[1]) || 0} onChange={(e) => setDueTime(`${dueTime.split(':')[0] || '00'}:${e.target.value.padStart(2, '0')}`)} className="w-12 text-sm border-none bg-transparent text-center focus:outline-none" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-1">🔔 Reminder</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={hasReminder} onChange={(e) => setHasReminder(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 peer-checked:bg-gray-600 rounded-full transition-all" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-5" />
            </label>
          </label>
          {hasReminder && (
            <select value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mt-2">
              <option>30 minutes before</option>
              <option>1 hour before</option>
              <option>1 day before</option>
            </select>
          )}
        </div>
        <div className="mb-4">
          <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1">
            <span className="flex items-center gap-1">🔁 Recurring Task</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-200 peer-checked:bg-gray-600 rounded-full transition-all" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-5" />
            </label>
          </label>
          {isRecurring && (
            <>
              <label className="block text-sm font-medium mb-1 mt-2">Frequency</label>
              <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 mb-2">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <label className="flex items-center justify-between text-sm font-medium mb-1">
                Has End Date
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={hasEndDate} onChange={(e) => setHasEndDate(e.target.checked)} />
                  <div className="w-11 h-6 bg-gray-200 peer-checked:bg-gray-600 rounded-full transition-all" />
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-5" />
                </label>
              </label>
              {hasEndDate && (
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
              )}
            </>
          )}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">Update Task</button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
