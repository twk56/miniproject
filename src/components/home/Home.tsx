import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../appbar/Sidebar'; // นำเข้า Sidebar

interface Expense {
  id: number;
  title: string;
  amount: string;
  category: string;
  date: string;
  image?: string;
}

const Home: React.FC = () => {
  const username = localStorage.getItem('username'); // ตรวจสอบว่ามี username หรือไม่
  const [expenses, setExpenses] = useState<Expense[]>([]);


  useEffect(() => {
    fetchPublicExpenses(); 
    fetchExpenses(); // ดึงข้อมูล expense
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/public-expenses'); // ดึงเฉพาะ public expenses
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error('Error fetching public expenses:', error);
    }
  };

  const fetchPublicExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/public-expenses'); // ตรวจสอบ URL
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error('Error fetching public expenses:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Sidebar username={username} />
      <div className="flex flex-grow">
        {/* เนื้อหาหลัก */}
        <div className="flex-grow p-8 ml-64 bg-white shadow-lg rounded-lg mt-4 border border-gray-300">
          <h1 className="text-4xl mb-6">ข้อมูลค่าใช้จ่าย</h1>
          {expenses.length === 0 ? (
            <p className="text-gray-500">ไม่พบข้อมูลค่าใช้จ่าย</p>
          ) : (
            <ul className="space-y-4">
              {expenses.map((expense) => (
                <li key={expense.id} className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 duration-300 ease-in-out">
                  <div className="font-semibold text-xl">{expense.title}</div>
                  <div className="text-gray-500 text-sm">
                    จำนวนเงิน: {expense.amount} บาท - ประเภท: {expense.category === 'expense' ? 'รายจ่าย' : 'รายได้'}
                  </div>
                  <div className="text-gray-400 text-sm">
                    วันที่: {new Date(expense.date).toLocaleDateString()}
                  </div>
                  {expense.image && (
                    <img
                      src={`http://localhost:5000/uploads/${expense.image}`}
                      alt="receipt"
                      className="mt-2 w-32 h-32 object-cover rounded-md"
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
