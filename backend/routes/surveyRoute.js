import express from "express";
import {
  createSurvey,
  getSurveys,
  getSurveyById,
  deleteSurvey,
} from "../controllers/surveyController.js";

const router = express.Router();

router.post("/create", createSurvey); // ➤ สร้างแบบสอบถาม
router.get("/findAll", getSurveys); // ➤ ดึงแบบสอบถามทั้งหมด + ค้นหา + แบ่งหน้า
router.get("/findId/:id", getSurveyById); // ➤ ดึงแบบสอบถามเดี่ยว
router.delete("/delete/:id", deleteSurvey); // ➤ ลบแบบสอบถาม

export default router;
