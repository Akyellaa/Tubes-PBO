import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';
import TaskTabs from './TaskTabs';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All Priorities');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [activeTab, setActiveTab] = useState('Pending');

const mockTasks = [
  {
    id: 1,
    title: 'Persiapan Presentasi',
    description: 'Siapkan slide dan materi presentasi proyek',
    category: 'Work',
    priority: 'Medium',
    dueDate: 'Apr 18, 2025',
    dueTime: '00:00',
    status: 'pending',
    hasReminder: true,
    color: 'yellow'
  },
  {
    id: 2,
    title: 'Submission Tugas Algoritma',
    description: 'Kumpulkan tugas algoritma pemrograman',
    category: 'Campus',
    priority: 'High',
    dueDate: 'Apr 20, 2025',
    dueTime: '00:00',
    status: 'pending',
    hasReminder: true,
    color: 'red'
  },
  {
    id: 3,
    title: 'Belajar React Hooks',
    description: 'Pelajari penggunaan useContext dan useReducer',
    category: 'Campus',
    priority: 'Medium',
    dueDate: 'Apr 22, 2025',
    dueTime: '00:00',
    status: 'pending',
    hasReminder: false,
    color: 'yellow'
  },
  {
    id: 4,
    title: 'Latihan Lomba Coding',
    description: 'Latihan soal-soal untuk persiapan lomba',
    category: 'Competition',
    priority: 'High',
    dueDate: 'Apr 25, 2025',
    dueTime: '00:00',
    status: 'pending',
    hasReminder: true,
    isWeekly: true,
    color: 'red'
  }
];

  useEffect(() => {
    setTasks(mockTasks);
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'All Priorities' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'All Categories' || task.category === categoryFilter;
    const matchesStatus = activeTab === 'All Tasks' || 
                          (activeTab === 'Pending' && task.status === 'pending') ||
                          (activeTab === 'Completed' && task.status === 'completed');
    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header and Filters */}
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
      <div className="bg-white rounded-lg shadow-sm p-6">
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
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
