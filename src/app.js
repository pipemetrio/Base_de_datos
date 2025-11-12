import express from 'express';
import taskRutes from './routes/taskRutes.js';
import userRutes from './routes/userRutes.js';

const app = express();
app.use(express.json());

//rutas principales
app.use('/users', userRutes);
app.use('/tasks', taskRutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});