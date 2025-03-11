import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';

dotenv.config();

const products = [
  {
    name: "Fideos",
    description: "Marolio",
    code: "abc444",
    price: 1.5,
    img: "sin imagen",
    stock: 85
  },
  {
    name: "Pure de Tomate",
    description: "Arcor",
    code: "pmr333",
    price: 800,
    img: "sin imagen",
    stock: 50
  },
  {
    name: "Dulce de Leche",
    description: "Ilolay",
    code: "ouf678",
    price: 2.5,
    img: "sin imagen",
    stock: 100
  },
  {
    name: "Gaseosa",
    description: "Pepsi",
    code: "jkl898",
    price: 1.2,
    img: "sin imagen",
    stock: 59
  },
  {
    name: "Cafe",
    description: "Nestle",
    code: "loi243",
    price: 950,
    img: "sin imagen",
    stock: 8
  },
  {
    name: "Alfajor",
    description: "Aguila",
    code: "kah978",
    price: 1000,
    img: "sin imagen",
    stock: 32
  },
  {
    name: "Mayonesa",
    description: "Fiesta",
    price: 700,
    img: "sin imagen",
    code: "prn991",
    stock: 100
  },
  {
    name: "Manteca",
    description: "La serenisima",
    price: 3800,
    img: "sin imagen",
    code: "kjl992",
    stock: 190
  }
];

const initializeProducts = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Productos inicializados correctamente');
  } catch (error) {
    console.error('Error inicializando productos:', error);
  }
};

export default initializeProducts;