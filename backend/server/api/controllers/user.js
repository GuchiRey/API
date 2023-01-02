const userService = require("../../service/user");

module.exports = {
  async getUsers(req, res) {
    try {
      const page = req.query.page
      const search = req.query.search
      const { users, numberOfPages, usersLength } = await userService.getUsers(page, search);
      return res.status(200).json({users, numberOfPages, usersLength});
    } catch (e) {
      return res.status(400).json({ message: e.message, stack: e.stack });
    }
  }
};
