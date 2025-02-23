import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isAdminMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    // 🔥 Decode token เอง
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Permission denied: Admin only" });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

export default isAdminMiddleware;
