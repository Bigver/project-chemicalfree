import React from "react";
import logo from '../assets/logo.png'
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (token) navigate("/welcome");
  }, []);
  
  return (
    <div className="home-container">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="text">
          <h1>โครงการคนบึงสำราญ ปลอดสารเคมี</h1>
          <h3>Project on Chemical-free Bueng Samran</h3>
        </div>
        <div className="btn">
          <a href="/login">เข้าสู่ระบบ</a>
          <a href="/register" style={{color : 'white' , backgroundColor : '#ba1919'}}>สร้างบัญชีใหม่</a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
