import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { requestMethod } from "../requestMethod";
import jwt_decode from 'jwt-decode';  // ใช้ named import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const decoded = jwt_decode(token);  // ใช้ jwt_decode แทน
      setUser(decoded)
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${requestMethod}/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const register = async (username , email , password) => {
    try {
      await axios.post(`${requestMethod}/auth/register`,{ email, password , username });
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout ,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
