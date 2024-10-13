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
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null); // เก็บข้อมูลที่กำลังแก้ไข
  const [formData, setFormData] = useState<Partial<Expense>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
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
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense.id !== id)); // อัปเดต state เพื่อเอาข้อมูลที่ลบออก
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpense) return;

    try {
      await axios.put(`http://localhost:5000/api/expenses/${editingExpense.id}`, formData);
      fetchExpenses(); // ดึงข้อมูลใหม่หลังจากแก้ไขสำเร็จ
      setEditingExpense(null); // รีเซ็ตฟอร์มแก้ไข
      setFormData({});
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">ข้อมูลของคุณ</h1>
        {expenses.length === 0 ? (
          <p className="text-gray-500">ไม่พบข้อมูลของคุณ</p>
        ) : (
          <ul className="space-y-4">
            {expenses.map((expense) => (
              <li key={expense.id} className="bg-white p-4 rounded-lg shadow-md">
                {editingExpense && editingExpense.id === expense.id ? (
                  <form onSubmit={handleSave}>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Title"
                      className="block w-full"
                    />
                    <input
                      type="number"
                      value={formData.amount || ''}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="Amount"
                      className="block w-full"
                    />
                    <input
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="block w-full"
                    />
                    <button type="submit" className="bg-green-500 text-white p-2 rounded">
                      Save
                    </button>
                    <button onClick={() => setEditingExpense(null)} className="bg-red-500 text-white p-2 rounded ml-2">
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="font-semibold">{expense.title}</div>
                    <div className="text-gray-500">{expense.amount} - {expense.category}</div>
                    <div className="text-gray-400">{new Date(expense.date).toLocaleDateString()}</div>
                    {expense.image && (
                      <img
                        src={`http://localhost:5000/uploads/${expense.image}`}
                        alt="receipt"
                        className="mt-2 w-32 h-32 object-cover"
                      />
                    )}
                    <button onClick={() => handleEdit(expense)} className="bg-blue-500 text-white p-2 rounded mt-2">
                      แก้ไข
                    </button>
                    <button onClick={() => handleDelete(expense.id)} className="bg-red-500 text-white p-2 rounded ml-2 mt-2">
                      ลบ
                    </button>
                  </>
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
