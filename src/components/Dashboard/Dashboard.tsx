import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface Expense {
  id: number;
  title: string;
  amount: string;
  category: string;
  date: string;
  image?: string;
}

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const username = localStorage.getItem('username') ?? ''; // Get username from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); // ตรวจสอบว่ามี token อยู่หรือไม่
    if (!token) {
      navigate('/'); // ถ้าไม่มี token ให้กลับไปที่หน้า login
    } else {
      fetchExpenses(); // ถ้ามี token ให้ดึงข้อมูล expense
    }
  }, [navigate]);

  const fetchExpenses = async () => {
    const user_id = localStorage.getItem('user_id');
    try {
      const response = await axios.get('http://localhost:5000/api/expenses', {
        params: { user_id }
      });
      setExpenses(response.data.expenses); // ดึงข้อมูลจาก API และบันทึกลง state
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
  <div className="max-w-4xl mx-auto p-8">
    <h1 className="text-3xl font-bold mb-6">Your Expenses</h1>
    {expenses.length === 0 ? (
      <p className="text-gray-500">No expenses found</p>
    ) : (
      <ul className="space-y-4">
        {expenses.map((expense) => (
          <li key={expense.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="font-semibold">{expense.title}</div>
            <div className="text-gray-500">{expense.amount} - {expense.category}</div>
            <div className="text-gray-400">{expense.date}</div>
            {expense.image && (
              <img
                src={`http://localhost:5000/uploads/${expense.image}`}
                alt="receipt"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
  );
};

export default Dashboard;
