import userDAO from '../dao/userDAO.js';

class UserRepository {
  async registerUser(userData) {
    return await userDAO.createUser(userData);
  }

  async loginUser(email) {
    return await userDAO.findUserByEmail(email);
  }

  async getUserById(id) {
    return await userDAO.findUserById(id);
  }

}

export default new UserRepository();