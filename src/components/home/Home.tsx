import React from 'react';
import AppBar from '../appbar/Appbar';

const Home: React.FC = () => {
  const username = localStorage.getItem('username'); // ตรวจสอบว่ามี username หรือไม่

  return (
    <div>
      <AppBar username={username} /> {/* AppBar จะแสดงปุ่ม Login และ Register */}
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl">Welcome to the Home Page</h1>
        
      </div>
    </div>
  );
};

export default Home;
