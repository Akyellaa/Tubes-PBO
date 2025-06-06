import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import TaskTabs from './TaskTabs';
import EditTaskModal from './EditTaskModal'; // pastikan file ini ada

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [activeTab, setActiveTab] = useState('Pending');
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const mockTasks = [
    {
      id: 1,
      title: "Olahraga Sore",
      description: "Jogging di taman kota",
      status: "completed",
      priority: "high",
      category: "Personal",
      color: "blue",
      dueDate: "Apr 16, 2025",
      dueTime: "00:00",
      hasReminder: true,
      isWeekly: true,
    },
    {
      id: 2,
      title: "Ngoding UI",
      description: "Buat tampilan tugas",
      status: "pending",
      priority: "medium",
      category: "Work",
      color: "green",
      dueDate: "Apr 17, 2025",
      dueTime: "10:00",
      hasReminder: false,
      isWeekly: false,
    }
  ];

  useEffect(() => {
    setTasks(mockTasks);
  }, []);

  const handleToggleComplete = (taskToUpdate) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskToUpdate.id
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      )
    );
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks(prev => prev.filter(t => t.id !== taskToDelete.id));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prev =>
      prev.map(t => (t.id === updatedTask.id ? updatedTask : t))
    );
    setEditingTask(null);
    setIsEditModalOpen(false);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === 'All Priorities' || task.priority?.toLowerCase() === priorityFilter.toLowerCase();

    const matchesCategory =
      categoryFilter === 'All Categories' || task.category?.toLowerCase() === categoryFilter.toLowerCase();

    const matchesStatus =
      activeTab === 'All Tasks' ||
      (activeTab === 'Pending' && task.status === 'pending') ||
      (activeTab === 'Completed' && task.status === 'completed');

    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Filter */}
      <TaskFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {/* Tabs */}
      <TaskTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Task List */}
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
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
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
