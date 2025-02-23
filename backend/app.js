import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import surveyRoutes from "./routes/surveyRoute.js";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/survey", surveyRoutes);

export default app;