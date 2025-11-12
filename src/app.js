import express from 'express';
import taskRutes from './routes/taskRutes.js';
import userRutes from './routes/userRutes.js';
import path from `path`;        
import { fileURLToPath, fileURLTPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);

const app = express();

app.use(express.json());

// convertir bigint a string en las respuestas JSON
BigInt.prototype.toJSON = function() {
    return this.toString();
};

//rutas principales
app.use('/users', userRutes);
app.use('/tasks', taskRutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});