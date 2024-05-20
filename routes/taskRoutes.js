import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/tasks", protect, createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.patch("/tasks/:id", protect, updateTask);
router.delete("/tasks/:id", protect, deleteTask);

export default router;
