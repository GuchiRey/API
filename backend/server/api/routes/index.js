const authRoutes = require("./auth");
const userRoutes = require("./user");

const setupRoutes = (app) => {
  authRoutes(app);
  userRoutes(app);
};

module.exports = setupRoutes;
