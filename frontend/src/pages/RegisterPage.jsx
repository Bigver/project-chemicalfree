import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { register, token } = useContext(AuthContext);

  useEffect(() => {
    if (token) navigate("/welcome");
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    // ตรวจสอบความยาวของรหัสผ่าน
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    const success = await register(username, email, password);
    if (success) {
      toast.success("Register success");
      navigate("/login");
    } else {
      toast.error("เกิดข้อผิดพลาดกรุณาเปลี่ยน username หรือ email");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <h2>สมัครบัญชีใหม่</h2>
        <div className="input-group">
          <label>UserName</label>
          <input
            type="text"
            placeholder="ชื่อผู้ใช้งาน"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          {error ? (
            <p style={{ color: "red", textAlign: "start" }}>{error}</p>
          ) : (
            ""
          )}
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
          <button
            type="submit"
            style={{ color: "white", backgroundColor: "#ba1919" }}
          >
            สร้างบัญชี
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
