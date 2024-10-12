import React from 'react';
import Sidebar from '../appbar/Sidebar'; // นำเข้า Sidebar

const Home: React.FC = () => {
  const username = localStorage.getItem('username'); // ตรวจสอบว่ามี username หรือไม่

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
        <Sidebar username={username} />
      <div className="flex flex-grow">
        {/* เนื้อหาหลัก */}
        <div className="flex-grow p-8 ml-64 bg-white shadow-lg rounded-lg mt-4 border border-gray-300">
          <h1 className="text-4xl mb-6">Welcome to the Home Page</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
