import express from "express";
import { getTaskById, updateTask, deleteTask, getTask, createTask } from "../controllers/task.controller.js";


const router = express.Router();

router.get('/', getTask);
router.post('/', createTask);
router.get('/', getTaskById);
router.put('/', updateTask);
router.delete('/', deleteTask);

export default router;