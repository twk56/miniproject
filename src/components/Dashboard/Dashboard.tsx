import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppBar from '../appbar/Appbar';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  task_name: string;
  due_date: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const username = localStorage.getItem('username'); // Get username from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // ตรวจสอบว่ามี token อยู่หรือไม่
    if (!token) {
      navigate('/login'); // ถ้าไม่มี token ให้กลับไปที่หน้า login
    } else {
      fetchTasks(); // ถ้ามี token ให้ดึงข้อมูล task
    }
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AppBar username={username} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Your Tasks</h1>
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="font-semibold">{task.task_name}</div>
              <div className="text-gray-500">{task.due_date}</div>
              <p className="text-gray-700">{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
