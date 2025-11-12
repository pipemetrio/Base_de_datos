import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todas las tareas con su usuario asociado 
export const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({ include: { user: true } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener tareas: " + error.message });
    }
};

// Crear una nueva tarea    
export const createTask = async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const newTask = await prisma.task.create({ data: { title, description, userId } });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: "Error al crear tarea: " + error.message });
    }
};