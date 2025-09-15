import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

// Importar Rutas
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';
import e from 'cors';


// Crear la aplicación de Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.json({ok: true, name: 'todo-pwa-api'}));
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const{ PORT = 4000, MONGO_URI } = process.env;

mongoose.connect(process.env.MONGO_URI, { dbName: 'BackPWA' })
  .then(() => {
    console.log('✅ Conectado a MongoDB:', mongoose.connection.name);
    app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB', err);
    process.exit(1);
  });

