import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home'; // หน้า Home
import Login from './components/login/Login'; 
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard'; // หน้า Dashboard หลังจาก login สำเร็จ

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* หน้าแรกคือ Home */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
