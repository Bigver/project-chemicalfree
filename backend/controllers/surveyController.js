import Survey from "../models/surveyModel.js"; // Import Model
import { Op } from "sequelize"; // ใช้สำหรับค้นหา

export const createSurvey = async (req, res) => {
  try {
    const { userId, category, answer } = req.body;

    if (!userId || !category || !answer) {
      return res.status(400).json({ error: "ข้อมูลไม่ครบถ้วน" });
    }

    const survey = await Survey.create({ userId, category, answer });

    res.status(201).json({ message: "สร้างแบบสอบถามสำเร็จ", survey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// ➤ ➤ ➤ ✅ 2. ดึงแบบสอบถามทั้งหมด + ค้นหา + แบ่งหน้า (Get)
export const getSurveys = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const offset = (page - 1) * limit; // คำนวณ offset
    const whereCondition = search
      ? {
          category: {
            [Op.like]: `%${search}%`, // ค้นหาหมวดหมู่ที่มีคำนี้
          },
          userId: {
            [Op.like]: `%${search}%`, // ค้นหาหมวดหมู่ที่มีคำนี้
          },
        }
      : {};

    const { count, rows } = await Survey.findAndCountAll({
      where: whereCondition,
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      surveys: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// ➤ ➤ ➤ ✅ 3. ดึงแบบสอบถามเดี่ยว (Get by ID)
export const getSurveyById = async (req, res) => {
  try {
    const { id } = req.params;
    const survey = await Survey.findByPk(id);

    if (!survey) return res.status(404).json({ error: "ไม่พบข้อมูล" });

    res.json(survey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};

// ➤ ➤ ➤ ✅ 4. ลบแบบสอบถาม (Delete)
export const deleteSurvey = async (req, res) => {
  try {
    const { id } = req.params;
    const survey = await Survey.findByPk(id);

    if (!survey) return res.status(404).json({ error: "ไม่พบข้อมูล" });

    await survey.destroy();
    res.json({ message: "ลบข้อมูลสำเร็จ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "เกิดข้อผิดพลาด" });
  }
};
