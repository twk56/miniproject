import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AppBarProps {
  username: string | null;
}

const AppBar: React.FC<AppBarProps> = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ลบ token ออกจาก localStorage
    localStorage.removeItem('username'); // ลบ username ออกจาก localStorage
    navigate('/login'); // เปลี่ยนเส้นทางไปยังหน้า login
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-lg">Welcome, {username || 'Guest'}</h1>
        {username ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <div>
            <a
              href="/login"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mr-2"
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-700"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppBar;
