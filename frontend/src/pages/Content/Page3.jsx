import React , {useState} from "react";
import Slidebar from "../../components/Slidebar";
import Navbar from "../../components/Navbar";
import { questions_pretest } from "../../data/preTest";
import { useForm } from "react-hook-form";

const Page3 = () => {
  const { register, handleSubmit, reset } = useForm();
  const [questions] = useState(() => [...questions_pretest].sort(() => Math.random() - 0.5)); // สุ่มข้อสอบ

  const onSubmit = (data) => {
    let score = 0;
    questions.forEach((q, index) => {
      if (data[`question_${index}`] === q.correct) {
        score++;
      }
    });
    alert(`คุณได้คะแนน ${score} / ${questions.length}`);
    reset();
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
