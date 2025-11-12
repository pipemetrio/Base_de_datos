import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Obtener todas las tareas con su usuario asociado 
export const getTask = async (req, res) => {
    try {
        const task = await prisma.task.findMany({ include: { user: true } });
        res.json(task);
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

// Obtener tarea por ID
export const getTaskById = async (req, res) => {
    const { id } = req.params;      
    try {
        const task = await prisma.task.findUnique({ where: { id: BigInt(id) }, include: { user: true } });
        if (!task) return res.status(404).json({ error: "Tarea no encontrada" });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: "Error al obtener tarea: " + error.message });
    }   
};

// actualizar tarea
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const task = await prisma.task.findUnique({ where: { id: BigInt(id) } });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada.' });

    const updated = await prisma.task.update({
      where: { id: BigInt(id) },
      data: { title, description, completed },
    });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar tarea: ' + error.message });
  }
};

// elimar tarea
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({ where: { id: BigInt(id) } });
    if (!task) return res.status(404).json({ error: 'Tarea no encontrada.' });

    await prisma.task.delete({ where: { id: BigInt(id) } });
    res.json({ message: 'Tarea eliminada correctamente.' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar tarea: ' + error.message });
  }
};