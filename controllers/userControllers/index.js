const userService = require('../../services/userService');

exports.register = async (req, res) => {
  const result = await userService.register(req.body);
  res.status(result.status).json(result.data);
};

exports.login = async (req, res) => {
  const result = await userService.login(req.body);
  res.status(result.status).json(result.data);
};
