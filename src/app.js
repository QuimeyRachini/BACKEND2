import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import sessionRoutes from './routes/sessionRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors'; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
import './config/passport.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors()); 
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize()); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/sessions', sessionRoutes); 
app.use('/api/products', productRoutes); 
app.use('/api/cart', cartRoutes); 
app.use('/api/tickets', ticketRoutes); 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

export default app;