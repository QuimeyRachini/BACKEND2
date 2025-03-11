import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';
import Ticket from '../models/ticketModel.js';

class CartController {
  async addProductToCart(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }

      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = new Cart({ user: userId, products: [] });
      }

      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      res.status(200).json({ message: 'Producto añadido al carrito', cart });
    } catch (error) {
      console.error('Error añadiendo producto al carrito:', error);
      res.status(500).json({ message: 'Error añadiendo producto al carrito', error });
    }
  }

  async purchaseCart(req, res) {
    const cartId = req.params.cid;
    const userId = req.user.id;

    try {
      const cart = await Cart.findById(cartId).populate('products.product');
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      let totalAmount = 0;
      const productsNotPurchased = [];

      for (const item of cart.products) {
        const product = item.product;
        if (product.stock >= item.quantity) {
          product.stock -= item.quantity;
          totalAmount += product.price * item.quantity;
          await product.save();
        } else {
          productsNotPurchased.push(product._id);
        }
      }

      const purchasedProducts = cart.products.filter(item => !productsNotPurchased.includes(item.product._id));
      cart.products = cart.products.filter(item => productsNotPurchased.includes(item.product._id));
      await cart.save();

      if (purchasedProducts.length > 0) {
        const ticket = await Ticket.create({
          amount: totalAmount,
          purchaser: req.user.email
        });
        res.status(200).json({ message: 'Compra realizada con éxito', ticket, productsNotPurchased });
      } else {
        res.status(400).json({ message: 'No se pudo realizar la compra', productsNotPurchased });
      }
    } catch (error) {
      console.error('Error finalizando la compra:', error);
      res.status(500).json({ message: 'Error finalizando la compra', error });
    }
  }
}

export default CartController;