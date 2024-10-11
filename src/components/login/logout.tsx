import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ลบ token และข้อมูลผู้ใช้จาก localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // เปลี่ยนเส้นทางไปยังหน้า login
    navigate('/login');
  }, [navigate]);

  return null; // ไม่จำเป็นต้องแสดงอะไรในหน้านี้
};

export default Logout;
