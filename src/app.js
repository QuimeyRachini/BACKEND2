import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import sessionRoutes from './routes/sessionRoutes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import './config/passport.js'; // Importa la configuración de Passport

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize()); // Inicializa Passport

app.use('/api/sessions', sessionRoutes); // Usa las rutas de sesión

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });