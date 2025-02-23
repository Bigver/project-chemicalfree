import { Link } from "react-router-dom";
import { FaUser, FaClipboardList, FaBars } from "react-icons/fa";
import { useState } from "react";

const SidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FaBars size={25}/>
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/admin/user">
              <FaUser size={25}/> 
              <span>จัดการผู้ใช้</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/survey">
              <FaClipboardList size={25}/> 
              <span>แบบสอบถาม</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdmin;
