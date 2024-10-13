import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SidebarProps {
  username: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/'); // หลังจาก logout ไปหน้า login
    window.location.reload(); // ทำการรีเฟรชหน้าเพื่ออัปเดต UI
  };

  return (
    <div className="w-64 h-full bg-gradient-to-b from-gray-900 to-gray-700 text-white flex flex-col justify-between fixed shadow-lg">
      <nav className="flex flex-col p-4 space-y-4">
        <Link
          to="/dashboard"
          className="text-lg hover:bg-gray-600 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200"
        >
          Dashboard
        </Link>
        <Link
          to="/add-expense"
          className="text-lg hover:bg-gray-600 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-gray-200"
        >
          เพิ่มรายรับ-รายจ่าย
        </Link>

        {!username && (
          <>
            <Link
              to="/login"
              className="text-lg hover:bg-green-600 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-lg hover:bg-yellow-500 p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:text-white"
            >
              Register
            </Link>
          </>
        )}
      </nav>

      {username && (
        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="text-lg bg-red-500 hover:bg-red-700 text-white p-3 rounded-md transition duration-300 ease-in-out w-full"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
