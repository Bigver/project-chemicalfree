import { useState, useContext , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import AuthContext from "../context/AuthContext.jsx";
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login , token } = useContext(AuthContext);

  useEffect(()=>{
    if(token)
      navigate('/welcome')
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      toast.success("Login success")
      navigate("/welcome");
    } else {
      toast.error("Login failed!")
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <h2>เข้าสู่ระบบ</h2>
        <div className="input-group">
          <label>username</label>
          <input
            type="text"
            placeholder="กรอกชิ่อผู้ใช้งาน"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
