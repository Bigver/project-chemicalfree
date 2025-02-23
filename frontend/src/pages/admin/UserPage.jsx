import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { requestMethod } from "../../requestMethod";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";
import Modal from "react-modal";
import { Link } from "react-router-dom";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // จำนวนผู้ใช้ต่อหน้า
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false); // ดึงข้อมูล User จาก API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${requestMethod}/users/findAll?page=${page}&limit=${limit}&search=${search}`
        );
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [page, search]);

  // ฟังก์ชันลบผู้ใช้
  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?")) {
      try {
        await axios.delete(`${requestMethod}/users/${id}`);
        setUsers(users.filter((user) => user.id !== id));
        toast.success("delete user success");
      } catch (error) {
        toast.error("fail delete user");
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const fetchPersonalInfo = async (data) => {
    try {
      setSelectedUser(data);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching personal info:", error);
    }
  };
  return (
    <AdminLayout>
      <div className="user-table">
        <h2>📋 รายชื่อผู้ใช้</h2>
        <input
          type="text"
          placeholder="ใข้ email หรือ id ในการค้นหา 🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ชื่อผู้ใช้</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => fetchPersonalInfo(user.personal)}
                    >
                      👁️ ดูข้อมูล
                    </button>

                    <button
                      className="delete-btn"
                      style={{ marginLeft: "1rem" }}
                      onClick={() => handleDelete(user.id)}
                    >
                      🗑️ ลบ
                    </button>
                    <Link to={`/admin/personal/edit/${user.id}`}>
                      <button
                        className="view-btn"
                        style={{
                          marginLeft: "1rem",
                          backgroundColor: "yellow",
                          color: "black",
                        }}
                        onClick={() => fetchPersonalInfo(user.personal)}
                      >
                        แก้ไขข้อมูล
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">ไม่พบข้อมูล</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            ◀ ก่อนหน้า
          </button>
          <span>
            หน้า {page} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            ถัดไป ▶
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>ข้อมูลส่วนตัว</h2>
        {selectedUser ? (
          <div>
            <p>
              <strong>ชื่อ:</strong> {selectedUser.firstName}{" "}
              {selectedUser.lastName}
            </p>
            <p>
              <strong>อายุ:</strong> {selectedUser.age}
            </p>
            <p>
              <strong>เพศ:</strong> {selectedUser.gender}
            </p>
            <p>
              <strong>โรคประจำตัว:</strong> {selectedUser.chronicDiseases}
            </p>
            <p>
              <strong>ที่อยู่:</strong> {selectedUser.address}
            </p>
            <p>
              <strong>เบอร์โทร:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>อาชีพหลัก:</strong> {selectedUser.occupation}
            </p>
            <p>
              <strong>ปัจจุบันเพาะปลูกอะไร:</strong> {selectedUser.currentCrops}
            </p>
            <p>
              <strong>ผลเลือด:</strong> {selectedUser.bloodTestResults}
            </p>
            <p>
              <strong>คะแนนก่อน:</strong> {selectedUser.preScore}
            </p>
            <p>
              <strong>คะแนนหลัง:</strong> {selectedUser.postScore}
            </p>
          </div>
        ) : (
          <p>ไม่มีข้อมูลส่วนตัว</p>
        )}
        <button onClick={() => setModalIsOpen(false)} className="close-button">
          ปิด
        </button>
      </Modal>
    </AdminLayout>
  );
};

export default UserPage;
