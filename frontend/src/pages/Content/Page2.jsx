import React from "react";
import Slidebar from "../../components/Slidebar";
import Navbar from "../../components/Navbar";
import { useForm } from "react-hook-form";

const Page2 = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("ข้อมูลที่บันทึก:", data);
    alert("ลงทะเบียนสำเร็จ!");
    reset();
  };
  return (
    <div className="page2-container">
      <Slidebar />
      <div className="content1">
        <Navbar />
        <div className="form-ctn">
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <h2>ข้อมูลส่วนตัว</h2>

            <label>ชื่อ:</label>
            <input type="text" {...register("name", { required: true })} />

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
            <input type="text" {...register("disease")} />

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
            <input type="text" {...register("crop", { required: true })} />

            <label>ผลเลือดก่อนเข้าร่วมโครงการ:</label>
            <input type="text" {...register("bloodTest")} />

            <label>คะแนนความรู้ก่อนและหลังเข้าร่วมโครงการ</label>
            <div style={{display : 'flex'  , justifyContent : 'space-between' , paddingBottom : '20px'}}>
              <h4 htmlFor="">คะแนนก่อนการอบรม 8</h4>
              <h4 htmlFor="">คะแนนหลังการอบรม 6</h4>
            </div>
            <button type="submit">บันทึกข้อมูล</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page2;
