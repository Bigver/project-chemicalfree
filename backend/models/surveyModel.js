import { DataTypes } from "sequelize";
import sequelize from "../database.js";

const Survey = sequelize.define("surveys", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  answer : {
    type: DataTypes.JSON,
    allowNull : false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export default Survey;
