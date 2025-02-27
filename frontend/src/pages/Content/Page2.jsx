import React, { useEffect, useState } from "react";
import Slidebar from "../../components/Slidebar";
import Navbar from "../../components/Navbar";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext"; // Context ที่เก็บข้อมูล token
import { useContext } from "react";
import axios from "axios";
import { requestMethod } from "../../requestMethod";
import { toast } from "react-toastify";
import FormTest from "../../components/FormTest";
import jwt_decode from "jwt-decode"; // ใช้ named import
import FormPostTest from "../../components/FormPostTest";

const Page2 = () => {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token"); // ดึง token จาก localStorage
  const decodedUser = jwt_decode(token); // ถอดรหัส token

  useEffect(() => {
    const fecthPersonal = async () => {
      try {
        const response = await axios.get(
          `${requestMethod}/users/${decodedUser.userId}`
        );
        setData(response.data.personal);
        reset(response.data.personal);
      } catch (error) {
        console.log(error);
      }
    };
    fecthPersonal();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `${requestMethod}/users/${decodedUser.userId}/personal`,
        data
      );
      toast.success("บันทึกข้อมูลสำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    }
  };
  return (
    <div className="page2-container">
      <Slidebar />
      <div className="content1">
        <Navbar />
        <div className="form-ctn">
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <h2>ข้อมูลส่วนตัว</h2>
            <div>
              <label>ชื่อ</label>
              <input
                type="text"
                {...register("firstName", { required: true })}
              />
              <label>นามสกุล</label>
              <input
                type="text"
                {...register("lastName", { required: true })}
              />
            </div>

            <label>อายุ:</label>
            <input type="number" {...register("age", { required: true })} />

            <label>เพศ:</label>
            <select {...register("gender", { required: true })}>
              <option value="">-- เลือกเพศ --</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="อื่นๆ">อื่นๆ</option>
            </select>

            <label>โรคประจำตัว:</label>
            <input type="text" {...register("chronicDiseases")} />

            <label>ที่อยู่:</label>
            <textarea {...register("address", { required: true })} />

            <label>เบอร์โทร:</label>
            <input type="tel" {...register("phone", { required: true })} />

            <label>อาชีพหลัก:</label>
            <input
              type="text"
              {...register("occupation", { required: true })}
            />

            <label>ปัจจุบันเพาะปลูกอะไรเป็นหลัก:</label>
            <input
              type="text"
              {...register("currentCrops", { required: true })}
            />

            <label>ผลเลือดก่อนเข้าร่วมโครงการ:</label>
            <input type="text" {...register("bloodTestResults")} />

            <label>คะแนนความรู้ก่อนและหลังเข้าร่วมโครงการ</label>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <h4 htmlFor="">คะแนนก่อนการอบรม {data.preScore}</h4>
              <h4 htmlFor="">คะแนนหลังการอบรม {data.postScore}</h4>
            </div>
            <div style={{
                paddingBottom: "20px",
              }}>
                <label>ผลเลือดหลังร่วมโครงการ:</label>
                <input type="text" {...register("bloodPostTestResults")} />
              </div>
            
            <button type="submit">บันทึกข้อมูล</button>
          </form>
        </div>
      </div>
      <div className="content2">
        <FormTest preTest={data.preTest} preScore={data.preScore} />
      </div>
      <div className="content2">
        <FormPostTest preTest={data.postTest}  postScore={data.postScore}/>
      </div>
    </div>
  );
};

export default Page2;
