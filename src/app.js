import express from 'express';
import user from './routes/userRutes.js';

const app = express();
app.use(express.json());

//rutas principales
app.use('/users', userRutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});