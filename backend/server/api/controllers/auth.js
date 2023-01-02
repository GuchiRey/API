const AuthService = require("../../service/auth");

module.exports = {
  async authenticate(req, res) {
    try {
      const { email, password } = req.body;
      const authenticationResult = await AuthService.authenticate(email, password);
      if (!authenticationResult) {
        return res.status(401).json({ message: authenticationResult.message });
      }
      if(authenticationResult.result) {
        return res.status(200).json({ result: authenticationResult });
      } else {
        return res.status(400).json({ result: authenticationResult.message });
      }
    } catch (e) {
      return res.status(400).json({ message: e.message, stack: e.stack });
    }
  },
  async signup(req, res) {
    try {
      const authenticationResult = await AuthService.signup(req.body);
      if (!authenticationResult) {
        return res.status(500).json({ message: "Error al crear un usuario, por favor intente nuevamente" });
      }
      return res.status(200).json({ result: authenticationResult });
    } catch (e) {
      return res.status(400).json({ message: e.message, stack: e.stack });
    }
  }
};
