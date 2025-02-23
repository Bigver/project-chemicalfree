import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import jwtDecode from "jwt-decode"; // ต้องติดตั้ง: `npm install jwt-decode`

const PrivateAdminRoute = ({ children, requiredRole }) => {
  const { token } = useContext(AuthContext); // ดึง token จาก context
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [token, navigate, requiredRole]);

  if (!token) {
    return null; // ไม่ render ถ้าไม่มี token
  }

  return children;
};

export default PrivateAdminRoute;
