import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", adminLogin);

// 🔒 protected route (test)
router.get("/check", adminAuth, (req, res) => {
  res.json({ success: true, message: "Admin authorized" });
});

export default router;
