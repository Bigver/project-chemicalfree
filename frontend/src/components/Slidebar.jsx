import React, { useState } from "react";
import logo from "../assets/logo.png";
import { GoChevronRight } from "react-icons/go";
import { FaBook, FaAddressBook, FaRegLightbulb } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";

const Slidebar = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="nav-ham">
        <a onClick={()=>setShow(!show)}>
          <IoMdMenu size={30} />
        </a>
      </div>
      <div className={show ? "slide-bar-show" : `slide-bar`}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="text">
          <Link to={"/page1"} className="link">
            <div className="text-1">
              <h1>
                <FaBook color="white" size={25} /> ข้อมูลทั่วไปของโครงงาน
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page2"} className="link">
            <div className="text-1">
              <h1>
                <FaAddressBook color="white" size={25} />
                ข้อมูลส่วนตัว
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page3"} className="link">
            <div className="text-1">
              <h1>
                <MdMenuBook color="white" size={25} /> แบบทดสอบก่อนการอบรม
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page4"} className="link">
            <div className="text-1">
              <h1>
                <FaRegLightbulb color="white" size={25} /> ความรู้
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page5"} className="link">
            <div className="text-1">
              <h1>
                <MdMenuBook color="white" size={25} /> แบบทดสอบหลังการอบรม
              </h1>
              <GoChevronRight color="white" size={30} />
            </div>
          </Link>
          <Link to={"/page6"} className="link">
            <div className="text-1">
              <h1>
                <MdMenuBook color="white" size={25} /> แบบบันทึกพฤติกรรม
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

export default Slidebar;
