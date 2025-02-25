import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { requestMethod } from "../../requestMethod";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const PreTest = ({ preTest }) => {
  const params = useParams();
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

  const [count, setCount] = useState([]);

  useEffect(() => {
    if (preTest) {
      setResponses({
        q1: preTest.q1,
        q2: preTest.q2,
        q3: preTest.q3,
        q4: preTest.q4,
        q5: preTest.q5,
        q6: preTest.q6,
        q7: preTest.q7,
        q8: preTest.q8,
        q9: preTest.q9,
        q10: preTest.q10,
        q11: preTest.q11,
        q12: preTest.q12,
        q13: preTest.q13,
        q14: preTest.q14,
        q15: preTest.q15,
      });
      const counts = Object.values(preTest).reduce(
        (acc, answer) => {
          acc[answer] = (acc[answer] || 0) + 1;
          return acc;
        },
        { ประจำ: 0, บางครั้ง: 0, ไม่ปฏิบัติ: 0 }
      );
      setCount(counts);
    }
  }, [preTest]);

  const handleChange = (event) => {
    setResponses({
      ...responses,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${requestMethod}/users/${params.id}/personal`,
        {
          preTest: responses,
        }
      );
      toast.success("บันทึกข้อมูลแล้ว");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="form-ctn">
      <h2>แบบบันทึกพฤติกรรมก่อนเริ่มโครงการ</h2>
      <form onSubmit={handleSubmit} className="checklist-form">
        <>
          <table>
            <thead>
              <tr>
                <th>พฤติกรรม</th>
                <th colSpan="3">ระดับการปฏิบัติ</th>
              </tr>
              <tr>
                <th></th>
                <th>ประจำ</th>
                <th>บางครั้ง</th>
                <th>ไม่เคยปฎิบัติ</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th colSpan="4">ด้านการสัมผัส</th>
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
                    <td style={{ width: "400px" }}>
                      {index + 1}. {question}
                    </td>
                    <td>
                      <input
                        type="radio"
                        name={key}
                        value="ประจำ"
                        checked={responses[key] === "ประจำ"}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="radio"
                        name={key}
                        value="บางครั้ง"
                        checked={responses[key] === "บางครั้ง"}
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
        <table>
          <thead>
            <tr>
              <th colSpan={4}>ด้านการหายใจ</th>
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
                  <td style={{ width: "400px" }}>
                    {index + 4 + 1}. {question}
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={key}
                      value="ประจำ"
                      checked={responses[key] === "ประจำ"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={key}
                      value="บางครั้ง"
                      checked={responses[key] === "บางครั้ง"}
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
        <table>
          <thead>
            <tr>
              <th colSpan={4}>ด้านการรับประทาน</th>
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
                  <td style={{ width: "400px" }}>
                    {index + 8 + 1}. {question}
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={key}
                      value="ประจำ"
                      checked={responses[key] === "ประจำ"}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="radio"
                      name={key}
                      value="บางครั้ง"
                      checked={responses[key] === "บางครั้ง"}
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
        <table>
          <tbody>
            <tr>
              <td style={{ width: "400px" }}>รวม</td>
              <td>{count.ประจำ}</td>
              <td>{count.บางครั้ง}</td>
              <td>{count.ไม่ปฏิบัติ}</td>
            </tr>
          </tbody>
        </table>
        <button type="submit">บันทึกข้อมูล</button>
      </form>
    </div>
  );
};

export default PreTest;
