import User from "../models/userModel.js";
import Personal from "../models/personalModel.js";
import { Op } from "sequelize"; // ใช้สำหรับค้นหา

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { include: Personal });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePersonal = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      age,
      gender,
      chronicDiseases,
      address,
      phone,
      occupation,
      currentCrops,
      bloodTestResults,
      bloodPostTestResults,
      preScore,
      postScore,
      preTest,
      postTest
    } = req.body;

    // ค้นหาผู้ใช้ก่อน
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // ค้นหาข้อมูล personal ที่เชื่อมโยงกับ user
    let personal = await Personal.findOne({ where: { userId: id } });

    if (!personal) {
      // ถ้าไม่มีข้อมูล personal ให้สร้างใหม่
      personal = await Personal.create({
        userId: id,
        firstName,
        lastName,
        age,
        gender,
        chronicDiseases,
        address,
        phone,
        occupation,
        currentCrops,
        bloodTestResults,
        bloodPostTestResults,
        preScore,
        postScore,
        preTest,
        postTest
      });
    } else {
      // ถ้ามีแล้ว ให้ทำการอัปเดต
      await personal.update({
        firstName,
        lastName,
        age,
        gender,
        chronicDiseases,
        address,
        phone,
        occupation,
        currentCrops,
        bloodTestResults,
        bloodPostTestResults,
        preScore,
        postScore,
        preTest,
        postTest
      });
    }

    res.json({
      message: "Personal information updated successfully",
      personal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getUsers = async (req, res) => {
  try {
    let { page, limit, search } = req.query;

    // ค่าเริ่มต้นของ Pagination
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    // สร้างตัวกรองค้นหา
    const whereCondition = search
      ? {
          [Op.or]: [
            { id: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    // ดึงข้อมูล User พร้อมข้อมูล Personal
    const { count, rows } = await User.findAndCountAll({
      where: whereCondition,
      include: { model: Personal },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      users: rows,
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
