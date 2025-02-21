import React from "react";
import Slidebar from "../../components/Slidebar";
import Navbar from "../../components/Navbar";
import img1 from '../../assets/page4-img1.jpg'
import img2 from '../../assets/page4-img2.jpg'

const Page4 = () => {
  return (
    <div className="page4-container">
      <Slidebar />
      <div className="content1">
        <Navbar />
        <div className="img">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Page4;
