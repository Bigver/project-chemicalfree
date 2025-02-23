import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode"; // ต้องติดตั้ง: `npm install jwt-decode`

const PrivateAdminRoute = ({ children, requiredRole }) => {
  const { token, setToken } = useContext(AuthContext); // เพิ่ม setToken ด้วย
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // สร้าง state สำหรับเช็คโหลด token

  useEffect(() => {
    const storedToken = localStorage.getItem("token"); // โหลด token จาก localStorage
    if (storedToken) {
      setToken(storedToken); // เซ็ต token ใน context
    }
    setLoading(false); // บอกว่าโหลดเสร็จแล้ว
  }, [setToken]);

  useEffect(() => {
    if (loading) return; // รอให้โหลด token ก่อน

    if (!token) {
      navigate("/login"); // ถ้าไม่มี token ให้ไปหน้า login
      return;
    }

    try {
      const decoded = jwtDecode(token); // ถอดรหัส JWT
      if (requiredRole && decoded.role !== requiredRole) {
        navigate("/unauthorized"); // ถ้า role ไม่ตรงให้ไปหน้า Unauthorized
      }
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
    }
  }, [token, navigate, requiredRole, loading]);

  if (loading) {
    return; // แสดงว่าโหลด token อยู่
  }

  return token ? children : null;
};

export default PrivateAdminRoute;
