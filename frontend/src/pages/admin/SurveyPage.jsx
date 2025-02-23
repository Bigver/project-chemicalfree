import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { requestMethod } from "../../requestMethod";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";
import Modal from "react-modal";
import { GoCheck } from "react-icons/go";

const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // จำนวนผู้ใช้ต่อหน้า
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${requestMethod}/survey/findAll?page=${page}&limit=${limit}&search=${search}`
        );
        setSurveys(response.data.surveys);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };

    fetchData();
  }, [page, search]);

  const fetchPersonalInfo = async (data) => {
    try {
      console.log(data);
      setSelectedSurvey(data);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error fetching personal info:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?")) {
      try {
        await axios.delete(`${requestMethod}/survey/delete/${id}`);
        setSurveys(surveys.filter((survey) => survey.id !== id));
        toast.success("delete user success")
      } catch (error) {
        toast.error("fail delete user")
      }
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("th-TH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // ใช้ 24 ชั่วโมง
    });
  };

  return (
    <AdminLayout>
      <div className="user-table">
        <h2>📋 แบบทดสอบรายวัน</h2>
        <input
          type="text"
          placeholder="ใข้ user_id ค้นหา...🔍"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER_ID</th>
              <th>DATE</th>
              <th>ประเภทของการรับสารเคมี</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {surveys.length > 0 ? (
              surveys.map((survey) => (
                <tr key={survey.id}>
                  <td>{survey.id}</td>
                  <td>{survey.userId}</td>
                  <td>{formatDate(survey.createdAt)}</td>
                  <td>{survey.category}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => fetchPersonalInfo(survey)}
                    >
                      👁️ ดูฟอร์ม
                    </button>
                    <button
                      className="delete-btn"
                      style={{marginLeft : '1rem'}}
                      onClick={() => handleDelete(survey.id)}
                    >
                      🗑️ ลบ
                    </button>
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
        <h2>ข้อมูลฟอร์ม</h2>
        {selectedSurvey ? (
          <div>
            <div className="survey-container">
              <h3 className="survey-title">➤ {selectedSurvey.category}</h3>
              <table className="survey-table">
                <thead>
                  <tr>
                    <th className="behavior-header">พฤติกรรม</th>
                    <th colSpan="2" className="level-header">
                      ระดับการปฏิบัติ
                    </th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>ปฏิบัติ</th>
                    <th>ไม่ปฏิบัติ</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSurvey.category === "ด้านการสัมผัส" ? (
                    <>
                      <tr>
                        <td>1. ท่านสวมใส่ถุงมือขณะทำกิจกรรมที่ใช้สารเคมี</td>
                        {selectedSurvey.answer.q1 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>
                          2. ท่านสวมเสื้อผ้าที่มิดชิดขณะทำกิจกรรมที่ใช้สารเคมี
                        </td>
                        {selectedSurvey.answer.q2 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>3. ท่านสวมใส่แว่นตาขณะทำกิจกรรมที่ใช้สารเคมี</td>
                        {selectedSurvey.answer.q3 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>4. ท่านอาบน้ำทันทีหลังเสร็จกิจกรรมที่ใช้สารเคมี</td>
                        {selectedSurvey.answer.q4 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                    </>
                  ) : (
                    ""
                  )}

                  {selectedSurvey.category === "ด้านการหายใจ" ? (
                    <>
                      <tr>
                        <td>
                          1. ท่านสวมหน้ากากอนามัยขณะทำกิจกรรมที่ใช้สารเคมี{" "}
                        </td>
                        {selectedSurvey.answer.q5 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>
                          2. หากบริเวณที่ท่านอยู่มีการใช้สารเคมี
                          ท่านจะออกห่างจากบริเวณนั้น ๆ
                        </td>
                        {selectedSurvey.answer.q6 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>3. หากบริเวณที่ท่านอยู่มีการใช้สารเคมี ท่านจะสวมอุปกรณ์ป้องกันสารเคมี เช่น 
                        Mask เป็นต้น </td>
                        {selectedSurvey.answer.q7 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>4. ท่านมีการสเปรย์กำจัดแมลง เช่น ไบกอน เชนไดร้ท์ เป็นต้น </td>
                        {selectedSurvey.answer.q8 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                    </>
                  ) : (
                    ""
                  )}
                  {selectedSurvey.category === "ด้านการรับประทาน" ? (
                    <>
                      <tr>
                        <td>
                          1. ท่านรับประทานผักที่ท่านปลูกเอง 
                        </td>
                        {selectedSurvey.answer.q9 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>
                          2. หากท่านซื้อผักมารับประทาน ท่านล้างผักโดยใช้ผงฟู ก่อนปรุงอาหาร
                        </td>
                        {selectedSurvey.answer.q10 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>3. หากท่านซื้อผักมารับประทาน ท่านล้างผักโดยใช้น้ำส้มสายชู ก่อนปรุงอาหาร </td>
                        {selectedSurvey.answer.q11 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>4. หากท่านซื้อผักมารับประทาน ท่านล้างผักโดยใช้เกลือ ก่อนปรุงอาหาร  </td>
                        {selectedSurvey.answer.q12 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>5. ท่านล้างผลไม้ทุกครั้งก่อนรับประทาน โดยใช้ผงฟู</td>
                        {selectedSurvey.answer.q13 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>6. ท่านล้างผลไม้ทุกครั้งก่อนรับประทาน โดยน้ำส้มสายชู</td>
                        {selectedSurvey.answer.q14 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                      <tr>
                        <td>7. ท่านล้างผลไม้ทุกครั้งก่อนรับประทาน โดยน้ำเกลือ </td>
                        {selectedSurvey.answer.q15 === "ปฏิบัติ" ? (
                          <>
                            <td>
                              <GoCheck />
                            </td>
                            <td></td>
                          </>
                        ) : (
                          <>
                            <td></td>
                            <td>
                              <GoCheck />
                            </td>
                          </>
                        )}
                      </tr>
                    </>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
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

export default SurveyPage;
