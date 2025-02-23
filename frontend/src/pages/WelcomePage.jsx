import React from "react";
import logo from "../assets/logo.png";
import { GoChevronRight } from "react-icons/go";
import { FaBook, FaAddressBook, FaRegLightbulb } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="content1">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="text">
          <h1>โครงการคนบึงสำราญ ปลอดสารเคมี</h1>
          <h3>Project on Chemical-free Bueng Samran</h3>
        </div>
      </div>
      <div className="content2">
        <div className="text">
          <Link to={"/page1"} className="link">
            <div className="text-1">
              <h1>
                <FaBook color="white" size={30} /> ข้อมูลทั่วไปของโครงงาน
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page2"} className="link">
            <div className="text-1">
              <h1>
                <FaAddressBook color="white" size={30} />
                ข้อมูลส่วนตัว
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page3"} className="link">
            <div className="text-1">
              <h1>
                <MdMenuBook color="white" size={30} /> แบบทดสอบก่อนการอบรม
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page4"} className="link">
            <div className="text-1">
              <h1>
                <FaRegLightbulb color="white" size={30} /> ความรู้
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page5"} className="link">
            <div className="text-1">
              <h1>
                <MdMenuBook color="white" size={30} /> แบบทดสอบหลังการอบรม
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page6"} className="link">
            <div className="text-1">
              <h1>
                <MdMenuBook color="white" size={30} /> แบบบันทึกพฤติกรรม
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>

          <div className="text-2">
            <p>
              โรงพยาบาลส่งเสริมสุขภาพตำบลบ้านบึงสำราญ เลขที่ 200 หมู่ที่ 8
              บ้านบึงสำราญน้อย ตำบลถาวรวัฒนา อำเภอทรายทองวัฒนา จังหวัดกำแพงเพชร
              62190 โทร 055-861071
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
