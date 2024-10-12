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
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col justify-between fixed">
      <nav className="flex flex-col p-4">
        <Link to="/dashboard" className="mb-4 text-lg hover:text-gray-300">
          Dashboard
        </Link>
        <Link to="/add-expense" className="mb-4 text-lg hover:text-gray-300">
          Add Expense
        </Link>

        {!username && (
          <>
            <Link to="/login" className="mb-4 text-lg hover:text-green-500">
              Login
            </Link>
            <Link to="/register" className="mb-4 text-lg hover:text-yellow-500">
              Register
            </Link>
          </>
        )}
      </nav>
      
      {username && (
        <div className="p-4 mt-auto">
          <button onClick={handleLogout} className="text-lg text-red-500 hover:text-red-700 w-full">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
