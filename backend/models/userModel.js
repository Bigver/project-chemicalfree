import { DataTypes } from "sequelize";
import sequelize from "../database.js";
import Personal from "./personalModel.js"; // นำเข้า Model Personal

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user",
  },
});

// 📌 เชื่อมกับ Personal (One-to-One)
User.hasOne(Personal, { foreignKey: "userId", onDelete: "CASCADE" });
Personal.belongsTo(User, { foreignKey: "userId" });

export default User;
