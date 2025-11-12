import prisma from '../prismaClient.js';


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

//obterner usuario por id
export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({ where: { id: BigInt(id) }, include: { Task: true } });  
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error al obtener usuario: ' + error.message });
    } 
};

//Actualizar usuario    
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: BigInt(id) },
            data: { name, email, password }
        });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ error: 'Error al actualizar usuario: ' + error.message });
    }
};

//Eliminar usuario
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({ where: { id: BigInt(id) } });
        res.jason({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar usuario: ' + error.message });
    }
};      