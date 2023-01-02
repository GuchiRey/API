const argon2 = require("argon2");
const userModel = require("../models/user");

const userService = {
  getByEmail(email, { getPassword } = { getPassword: false }) {
    let projection = { wallets: 0, budgets: 0, savings: 0 };
    if (!getPassword) {
      projection.password = 0;
    }
    return userModel.findOne({ email }, projection).lean();
  },
  async createUser(userData) {
    try {
      if (!userData.password) {
        throw new Error("Debes proveer una contraseña para éste usuario");
      } else {
        const hashedPassword = await argon2.hash(userData.password);
        userData.password = hashedPassword;
      }
      return userModel.create(userData);
    } catch (e) {
      throw e;
    }
  },
  async getUsers(page = 1, query) {
    const PAGE_SIZE = 10;
    const skip = (page - 1) * PAGE_SIZE;
    let searchParameter = { $regex: query, $options: 'ig' }
    let users;
    let amountOfDocuments;
    if (query){
      users = await userModel.find({ email: searchParameter }).skip(skip).limit(PAGE_SIZE).lean();
    amountOfDocuments = await userModel.find({ email: searchParameter }).count();
    } else {
      users = await userModel.find({}).skip(skip).limit(PAGE_SIZE).lean();
      amountOfDocuments = await userModel.estimatedDocumentCount();
    }
    return { users, numberOfPages: Math.ceil(amountOfDocuments / PAGE_SIZE), usersLength: amountOfDocuments }
  }
};

module.exports = userService;
