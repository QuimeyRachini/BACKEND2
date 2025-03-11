import Product from '../models/productModel.js';

class ProductController {
  async createProduct(req, res) {
    const { title, description, code, price, img, stock } = req.body;
    try {
      const newProduct = await Product.create({ title, description, code, price, img, stock });
      res.status(201).json({ message: 'Producto creado con éxito', product: newProduct });
    } catch (error) {
      console.error('Error creando producto:', error);
      res.status(500).json({ message: 'Error creando producto', error });
    }
  }

  async updateProduct(req, res) {
    const productId = req.params.id;
    const { title, description, code, price, img, stock } = req.body;
    try {
      const updatedProduct = await Product.findByIdAndUpdate(productId, { title, description, code, price, img, stock }, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
    } catch (error) {
      console.error('Error actualizando producto:', error);
      res.status(500).json({ message: 'Error actualizando producto', error });
    }
  }

  async deleteProduct(req, res) {
    const productId = req.params.id;
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto eliminado con éxito', product: deletedProduct });
    } catch (error) {
      console.error('Error eliminando producto:', error);
      res.status(500).json({ message: 'Error eliminando producto', error });
    }
  }

  async getProducts(req, res) {
    try {
      const products = await Product.find({});
      res.status(200).json(products);
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      res.status(500).json({ message: 'Error obteniendo productos', error });
    }
  }
}

export default ProductController;