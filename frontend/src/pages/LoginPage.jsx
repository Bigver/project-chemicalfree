import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // สามารถเพิ่ม API call หรือ logic อื่น ๆ ที่นี่
    navigate("/welcome"); // ตัวอย่างการเปลี่ยนหน้า
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h2>เข้าสู่ระบบ</h2>
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
        <div className="register">
          <a href="/register" className="register">
            สมัครบัญชีใหม่
          </a>
        </div>
        <div className="btn">
          <button type="submit">เข้าสู่ระบบ</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
