const controllers = require("../controllers");
const middlewares = require("../middlewares")

function userRoutes(app) {
  app.get("/api/user/users",
    middlewares.isAuth,
    controllers.user.getUsers
  );
}

module.exports = userRoutes;
