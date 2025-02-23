// src/components/PrivateRoute.js
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext"; // ตรวจสอบว่าใช้ AuthContext ที่ถูกต้อง

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext); // ดึง token จาก context
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // ถ้าไม่มี token ให้ไปหน้า login
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null; // ถ้าไม่มี token ไม่ render content
  }

  return children; // หากมี token ให้ render children (หน้าที่ถูกป้องกัน)
};

export default PrivateRoute;
