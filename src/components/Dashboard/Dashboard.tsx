import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Expense {
  id: number;
  title: string;
  amount: string;
  category: string;
  date: string;
  image?: string;
  visibility?: "public" | "private";
}

const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState<Partial<Expense>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // ถ้าไม่มี token ให้กลับไปที่หน้า login
    } else {
      fetchExpenses(); // ถ้ามี token ให้ดึงข้อมูล expense
    }
  }, [navigate]);

  const fetchExpenses = async () => {
    const user_id = localStorage.getItem("user_id");
    try {
      const response = await axios.get("http://localhost:5000/api/expenses", {
        params: { user_id },
      });
      setExpenses(response.data.expenses);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense.id !== id)); // อัปเดต state เพื่อเอาข้อมูลที่ลบออก
    } catch (error) {
      console.error("Error deleting expense:", error);
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
      // ตรวจสอบว่ามี visibility ในข้อมูลที่ส่งไปยัง API
      const updatedData = {
        ...formData,
        visibility: formData.visibility || 'private', // ค่า default ถ้าไม่ได้เลือก
      };
  
      // ส่งข้อมูลไปยัง API
      await axios.put(`http://localhost:5000/api/expenses/${editingExpense.id}`, updatedData);
  
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
        <h1 className="text-4xl font-bold mb-6 text-gray-800">ข้อมูลของคุณ</h1>
        {expenses.length === 0 ? (
          <p className="text-gray-500">ไม่พบข้อมูลของคุณ</p>
        ) : (
          <ul className="space-y-4">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 duration-300 ease-in-out"
              >
                {editingExpense && editingExpense.id === expense.id ? (
                  <form onSubmit={handleSave}>
                    <input
                      type="text"
                      value={formData.title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="ชื่อรายการ"
                      className="block w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                      type="number"
                      value={formData.amount || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      placeholder="จำนวนเงิน"
                      className="block w-full p-2 mb-2 border rounded-md"
                    />
                    <input
                      type="date"
                      value={formData.date || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="block w-full p-2 mb-2 border rounded-md"
                    />

                    {/* ฟิลด์เลือก visibility */}
                    <select
                      value={formData.visibility || "private"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          visibility: e.target.value as "public" | "private",
                        })
                      } // เพิ่มการกำหนดประเภท
                      className="block w-full p-2 mb-2 border rounded-md"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                    </select>

                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
                      >
                        บันทึก
                      </button>
                      <button
                        onClick={() => setEditingExpense(null)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="font-semibold text-xl">{expense.title}</div>
                    <div className="text-gray-500 text-sm">
                      จำนวนเงิน: {expense.amount} บาท - ประเภท:{" "}
                      {expense.category === "expense" ? "รายจ่าย" : "รายได้"}
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
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleEdit(expense)}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                      >
                        ลบ
                      </button>
                    </div>
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
