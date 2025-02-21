import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // สามารถเพิ่ม API call หรือ logic อื่น ๆ ที่นี่
    navigate("/dashboard"); // ตัวอย่างการเปลี่ยนหน้า
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>สมัครบัญชีใหม่</h2>
        <div className="input-group">
          <label>UserName</label>
          <input
            type="email"
            placeholder="ชื่อผู้ใช้งาน"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="กรอกอีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="register">
          <a href="/login" className="register">
            เข้าสู่ระบบ
          </a>
        </div>
        <div className="btn">
          <button type="submit" style={{color : 'white' , backgroundColor : '#ba1919'}}>สร้างบัญชี</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
