import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { requestMethod } from "../../requestMethod";
import { toast } from "react-toastify";
import AdminLayout from "./AdminLayout";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PreTest from "../../components/admin/PreTest";
import PostTest from "../../components/admin/PostTest";

const EditPersonal = () => {
  const { register, handleSubmit, reset } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [data , setData] = useState([])
  useEffect(() => {
    const fecthPersonal = async () => {
      try {
        const response = await axios.get(`${requestMethod}/users/${params.id}`);
        reset(response.data.personal);
        setData(response.data.personal)
      } catch (error) {
        console.log(error);
      }
    };
    fecthPersonal();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.put(`${requestMethod}/users/${params.id}/personal`, data);
      toast.success("บันทึกข้อมูลสำเร็จ");
      navigate("/admin/user");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    }
  };
  return (
    <AdminLayout>
      <div className="admin-form">
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

            <label>คะแนนก่อนการอบรม</label>
            <input type="text" {...register("preScore")} />

            <label>คะแนนหลังการอบรม</label>
            <input type="text" {...register("postScore")} />

            <button type="submit">บันทึกข้อมูล</button>
          </form>
        </div>
      </div>
      <div className="test">
        <PreTest preTest={data.preTest}/>
      </div>
      <div className="test">
        <PostTest preTest={data.postTest}/>
      </div>
    </AdminLayout>
  );
};

export default EditPersonal;
