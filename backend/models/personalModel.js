import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Personal = sequelize.define("personals", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: { type: DataTypes.STRING, allowNull: true }, // ชื่อ
  lastName: { type: DataTypes.STRING, allowNull: true },  // นามสกุล
  age: { type: DataTypes.INTEGER, allowNull: true },      // อายุ
  gender: { type: DataTypes.ENUM("ชาย", "หญิง", "อื่นๆ"), allowNull: true }, // เพศ
  chronicDiseases: { type: DataTypes.STRING, allowNull: true }, // โรคประจำตัว
  address: { type: DataTypes.TEXT, allowNull: true },     // ที่อยู่
  phone: { type: DataTypes.STRING, allowNull: true },     // เบอร์โทร
  occupation: { type: DataTypes.STRING, allowNull: true }, // อาชีพหลัก
  currentCrops: { type: DataTypes.STRING, allowNull: true }, // ปัจจุบันเพาะปลูกอะไร
  bloodTestResults: { type: DataTypes.STRING, allowNull: true }, // ผลเลือด
  bloodPostTestResults: { type: DataTypes.STRING, allowNull: true }, // ผลเลือด
  preScore: { type: DataTypes.INTEGER, allowNull: true }, // คะแนนก่อน
  postScore: { type: DataTypes.INTEGER, allowNull: true }, // คะแนนหลัง
  preTest: { type: DataTypes.JSON, allowNull: true }, // คะแนนก่อน
  postTest: { type: DataTypes.JSON, allowNull: true }, // คะแนนก่อน
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
});

export default Personal;
