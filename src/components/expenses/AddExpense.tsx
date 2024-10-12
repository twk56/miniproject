import React, { useState } from 'react';
import axios from 'axios';

const AddExpense: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'expense',
    date: '',
    image: null
  });
  const [loading, setLoading] = useState(false); // เพิ่ม loading state
  const [error, setError] = useState(''); // เพิ่ม error state
  const [success, setSuccess] = useState(''); // เพิ่ม success message

  const user_id = localStorage.getItem('user_id'); // ดึง user_id จาก localStorage


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // เริ่มต้นโหลด

    const data = new FormData();
    data.append('user_id', user_id as string); // ส่ง user_id ไปกับ form data
    data.append('title', formData.title);
    data.append('amount', formData.amount);
    data.append('category', formData.category);
    data.append('date', formData.date);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/expenses', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setSuccess('Expense added successfully'); // แสดงข้อความเมื่อเพิ่มสำเร็จ
        setFormData({
          title: '',
          amount: '',
          category: 'expense',
          date: '',
          image: null
        });
      } else {
        setError('Failed to add expense'); // แสดงข้อผิดพลาดหากไม่สำเร็จ
      }
    } catch (error) {
      setError('Error adding expense');
      console.error('Error adding expense', error);
    } finally {
      setLoading(false); // หยุดโหลดเมื่อเสร็จ
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">Add New Expense</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-2 rounded-md">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-2 rounded-md">{success}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Expense Title</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Enter expense title" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input 
          type="number" 
          name="amount" 
          value={formData.amount} 
          onChange={handleChange} 
          placeholder="Enter amount" 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input 
          type="file" 
          name="image" 
          onChange={handleFileChange} 
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
        disabled={loading}
      >
        {loading ? 'Adding Expense...' : 'Add Expense'}
      </button>
    </form>
  );
};

export default AddExpense;
