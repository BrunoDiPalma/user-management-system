import { Router } from "express";
import {
  postUsers,
  getUsers,
  GetUserbyID,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/userControllers.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", postUsers);
router.get("/", authenticateToken, getUsers);
router.get("/:id", authenticateToken, GetUserbyID);
router.delete("/:id", authenticateToken, deleteUser);
router.put("/:id", authenticateToken, updateUser);
router.post("/login", loginUser);

export default router;
