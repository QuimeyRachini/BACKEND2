import User from '../models/userModel.js';
import { generateToken } from '../utils/jwtUtils.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';

class UserController {
  constructor() {
    this.userModel = User;
  }

  async register(req, res) {
    const { first_name, last_name, email, age, password } = req.body;
    try {
      const hashedPassword = hashPassword(password);
      const newUser = await this.userModel.create({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role: 'user'
      });
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      console.log('Login attempt:', { email, password });
      const user = await this.userModel.findOne({ email });
      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      console.log('User found:', user);
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        console.log('Invalid password');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = generateToken(user);
      res.cookie('jwt', token, { httpOnly: true });
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in', error });
    }
  }

  async currentUser(req, res) {
    try {
      const user = await this.userModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ message: 'Error fetching user data', error });
    }
  }
}

export default UserController;