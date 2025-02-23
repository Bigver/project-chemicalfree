import React , {useState} from "react";
import Slidebar from "../../components/Slidebar";
import Navbar from "../../components/Navbar";
import { questions_pretest } from "../../data/preTest";
import { useForm } from "react-hook-form";
import axios from "axios";
import AuthContext from "../../context/AuthContext"; // Context ที่เก็บข้อมูล token
import { requestMethod } from "../../requestMethod";
import { useContext } from "react";
import { toast } from 'react-toastify';

const Page3 = () => {
  const { register, handleSubmit, reset } = useForm();
  const [questions] = useState(() => [...questions_pretest].sort(() => Math.random() - 0.5)); // สุ่มข้อสอบ
  const { user } = useContext(AuthContext); // ดึง token จาก context

  const onSubmit = async (data) => {
    let score = 0;
    questions.forEach((q, index) => {
      if (data[`question_${index}`] === q.correct) {
        score++;
      }
    });
    try {
      await axios.put(`${requestMethod}/users/${user.userId}/personal`, {preScore : score});
      toast.success(`Score ${score}`)
      reset()
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการอัปเดตข้อมูล")
    }
  };


  return (
    <div className="page3-container">
      <Slidebar />
      <div className="content1">
        <Navbar />
        <div className="form-ctn">
          <h1>แบบทดสอบก่อนการอบรม</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="exam-form">
            {questions.map((q, index) => (
              <div key={index} className="question-block">
                <p>{index+1} {q.question}</p>
                {q.options.map((option, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      value={option}
                      {...register(`question_${index}`, { required: true })}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ))}
            <button type="submit">ส่งคำตอบ</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page3;
