import sequelize from  "./database.js";
import User from "./models/userModel.js";
import Personal from "./models/personalModel.js";
import Survey from "./models/surveyModel.js";

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Unable to create table : ', err);
  });
  