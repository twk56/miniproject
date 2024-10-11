import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/register/Register';
import Login from './components/login/Login';

const App: React.FC = () => {
  const isLoggedIn = localStorage.getItem('token'); // ตรวจสอบว่ามี token อยู่ใน localStorage หรือไม่

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
