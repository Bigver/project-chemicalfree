import express from "express";
import { getUserProfile , updatePersonal , getUsers , deleteUser} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js"; // ใช้สำหรับตรวจสอบ JWT
import isAdminMiddleware from "../middlewares/isAdminMiddleware.js"; // ใช้สำหรับตรวจสอบ JWT

const router = express.Router();

router.get("/findAll", isAdminMiddleware , getUsers);
router.get("/:id", authMiddleware, getUserProfile); 
router.put("/:id/personal", authMiddleware, updatePersonal); // อัปเดตข้อมูล personal
router.delete("/:id", isAdminMiddleware, deleteUser);

export default router;
