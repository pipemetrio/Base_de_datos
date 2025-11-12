import {prisma, PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

//Obtener todos los usuarios con sus tareas asociadas
export const getUsers =  async (req, res) => {
    try {
        const users = await prisma.user.findMany({include: {Task: true}});
        res.json(users);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener usuarios: ' + error.message });
    }
};

//crear usuario
export const createUser = async (req, res) => {
    const { name, email, password   } = req.body;
    try {
        const newUser = await prisma.user.create({data: { name, email, password }});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({error: 'Error al crear usuario: ' + error.message });
    }
};

