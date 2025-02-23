import React from "react";
import Slidebar from "../../components/Slidebar";
import Navbar from "../../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext"; // Context ที่เก็บข้อมูล token
import { requestMethod } from "../../requestMethod";
import { useContext } from "react";
import { toast } from "react-toastify";

const Page6 = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useContext(AuthContext); // ดึง token จาก context

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 10000); // อัปเดตทุก 1 วินาที

    return () => clearInterval(timer); // เคลียร์เมื่อ component ถูก unmount
  }, []);

  const [responses, setResponses] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
    q12: "",
    q13: "",
    q14: "",
    q15: "",
  });

  const [selectOption, setSelectOption] = useState(""); // เก็บค่าที่เลือก
  const handleChange = (event) => {
    setResponses({
      ...responses,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${requestMethod}/survey/create`, {
        userId: user.userId,
        category: selectOption,
        answer: responses,
      });
      setResponses(
        {
          q1: "",
          q2: "",
          q3: "",
          q4: "",
          q5: "",
          q6: "",
          q7: "",
          q8: "",
          q9: "",
          q10: "",
          q11: "",
          q12: "",
          q13: "",
          q14: "",
          q15: "",
        },
      );
      toast.success("บันทึกข้อมูลแล้ว");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="page6-container">
      <Slidebar />
      <div className="content1">
        <Navbar />
        <div className="form-ctn">
          <h2>แบบบันทึกพฤติกรรม</h2>
          <div className="date">
            <p>📅 วันที่: {currentTime.toLocaleDateString("th-TH")}</p>
            <p>⏰ เวลา: {currentTime.toLocaleTimeString("th-TH")}</p>
          </div>
          <div className="select">
            <label>เลือกประเภทของการรับสารเคมี :</label>
            <select
              value={selectOption}
              onChange={(e) => setSelectOption(e.target.value)}
              style={{ marginLeft: "2rem" }}
            >
              <option value="">-- กรุณาเลือก --</option>
              <option value="ด้านการสัมผัส">ด้านการสัมผัส</option>
              <option value="ด้านการหายใจ">ด้านการหายใจ</option>
              <option value="ด้านการรับประทาน">ด้านการรับประทาน</option>
            </select>
          </div>
          <form onSubmit={handleSubmit} className="checklist-form">
            {selectOption === "ด้านการสัมผัส" ? (
              <>
                <h2>➤ ด้านการสัมผัส</h2>

                <table>
                  <thead>
                    <tr>
                      <th>พฤติกรรม</th>
                      <th colSpan="2">ระดับการปฏิบัติ</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th>ปฏิบัติ</th>
                      <th>ไม่ปฏิบัติ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "ท่านสวมใส่ถุงมือขณะทำกิจกรรมที่ใช้สารเคมี",
                      "ท่านสวมใส่เสื้อผ้าที่มิดชิดขณะทำกิจกรรมที่ใช้สารเคมี",
                      "ท่านสวมใส่แว่นตาขณะทำกิจกรรมที่ใช้สารเคมี",
                      "ท่านอาบน้ำทันทีหลังเสร็จกิจกรรมที่ใช้สารเคมี",
                    ].map((question, index) => {
                      const key = `q${index + 1}`;
                      return (
                        <tr key={key}>
                          <td>
                            {index + 1}. {question}
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={key}
                              value="ปฏิบัติ"
                              checked={responses[key] === "ปฏิบัติ"}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={key}
                              value="ไม่ปฏิบัติ"
                              checked={responses[key] === "ไม่ปฏิบัติ"}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              ""
            )}

            {selectOption === "ด้านการหายใจ" ? (
              <>
                <h2>➤ ด้านการหายใจ</h2>
                <table>
                  <thead>
                    <tr>
                      <th>พฤติกรรม</th>
                      <th colSpan="2">ระดับการปฏิบัติ</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th>ปฏิบัติ</th>
                      <th>ไม่ปฏิบัติ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "ท่านสวมหน้ากากอนามัยขณะทำกิจกรรมที่ใช้สารเคมี",
                      "หากบริเวณที่ท่านอยู่มีการใช้สารเคมี ท่านจะออกห่างจากบริเวณนั้น ๆ",
                      "หากบริเวณที่ท่านอยู่มีการใช้สารเคมี ท่านจะสวมอุปกรณ์ป้องกันสารเคมี เช่น Mask เป็นต้น",
                      "ท่านมีการสเปรย์กำจัดแมลง เช่น ไบกอน เชนไดร้ท์ เป็นต้น",
                    ].map((question, index) => {
                      const key = `q${index + 5}`;
                      return (
                        <tr key={key}>
                          <td>
                            {index + 1}. {question}
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={key}
                              value="ปฏิบัติ"
                              checked={responses[key] === "ปฏิบัติ"}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={key}
                              value="ไม่ปฏิบัติ"
                              checked={responses[key] === "ไม่ปฏิบัติ"}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              ""
            )}

            {selectOption === "ด้านการรับประทาน" ? (
              <>
                {" "}
                <h2>➤ ด้านการรับประทาน</h2>
                <table>
                  <thead>
                    <tr>
                      <th>พฤติกรรม</th>
                      <th colSpan="2">ระดับการปฏิบัติ</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th>ปฏิบัติ</th>
                      <th>ไม่ปฏิบัติ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "ท่านรับประทานผักที่ท่านปลูกเอง",
                      "หากท่านซื้อผักมารับประทาน ท่านล้างผักโดยใช้ผงฟู ก่อนปรุงอาหาร",
                      "หากท่านซื้อผักมารับประทาน ท่านล้างผักโดยใช้น้ำส้มสายชู ก่อนปรุงอาหาร",
                      "หากท่านซื้อผักมารับประทาน ท่านล้างผักโดยใช้เกลือ ก่อนปรุงอาหาร",
                      "ท่านล้างผลไม้ทุกครั้งก่อนรับประทาน โดยใช้ผงฟู",
                      "ท่านล้างผลไม้ทุกครั้งก่อนรับประทาน โดยน้ำส้มสายชู",
                      "ท่านล้างผลไม้ทุกครั้งก่อนรับประทาน โดยน้ำเกลือ",
                    ].map((question, index) => {
                      const key = `q${index + 9}`;
                      return (
                        <tr key={key}>
                          <td>
                            {index + 1}. {question}
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={key}
                              value="ปฏิบัติ"
                              checked={responses[key] === "ปฏิบัติ"}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="radio"
                              name={key}
                              value="ไม่ปฏิบัติ"
                              checked={responses[key] === "ไม่ปฏิบัติ"}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              ""
            )}
            {selectOption ? (
              <>
                <button type="submit">บันทึกข้อมูล</button>
              </>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page6;
