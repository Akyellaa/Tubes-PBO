// ✅ TaskManager.jsx (disesuaikan ke struktur API)
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import TaskTabs from './TaskTabs';
import EditTaskModal from './EditTaskModal';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [activeTab, setActiveTab] = useState('Pending');
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const mockTasksFromAPI = [
    {
      uuid: '1234',
      title: 'Belajar React',
      description: 'Mengerjakan latihan useEffect',
      category: { name: 'Work' },
      priority: 3,
      deadline: '2025-04-16T10:00:00Z',
      hasReminder: true,
      reminderTime: '30 minutes before',
      taskType: 'RECURRING',
      recurrenceDays: ['MONDAY'],
      status: 'PENDING',
    },
  ];

  const transformFromAPI = (task) => {
    const date = new Date(task.deadline);
    return {
      ...task,
      id: task.uuid,
      dueDate: date.toISOString().split('T')[0],
      dueTime: date.toTimeString().slice(0, 5),
      status: task.status.toUpperCase(),
    };
  };

  useEffect(() => {
    const formatted = mockTasksFromAPI.map(transformFromAPI);
    setTasks(formatted);
  }, []);

  const handleToggleComplete = (taskToUpdate) => {
    const newStatus = taskToUpdate.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED';
    setTasks(prev => prev.map(t => t.uuid === taskToUpdate.uuid ? { ...t, status: newStatus } : t));
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks(prev => prev.filter(t => t.uuid !== taskToDelete.uuid));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prev => prev.map(t => (t.uuid === updatedTask.uuid ? transformFromAPI(updatedTask) : t)));
    setEditingTask(null);
    setIsEditModalOpen(false);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === 'All Priorities' ||
      (priorityFilter === 'High' && task.priority === 3) ||
      (priorityFilter === 'Medium' && task.priority === 2) ||
      (priorityFilter === 'Low' && task.priority === 1);

    const matchesCategory =
      categoryFilter === 'All Categories' || task.category?.name === categoryFilter;

    const matchesStatus =
      activeTab === 'All Tasks' ||
      (activeTab === 'Pending' && task.status === 'PENDING') ||
      (activeTab === 'Completed' && task.status === 'COMPLETED');

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <TaskFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />
      <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500">No tasks found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.uuid}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {isEditModalOpen && editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default TaskManager;