import userService from "../services/userService.js";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let state = await userService.handleLogin(email, password);
  if (state.errCode === 0) {
    return res.status(200).json(state);
  } else {
    return res.status(500).json(state);
  }
};

let getAllUser = async (req, res) => {
  let id = req.body.id;
  let result = await userService.getAllUser(id);
  if (result.errCode === 0) {
    return res.status(200).json(result);
  } else {
    return res.status(500).json(result);
  }
};

let handleCreateNewUser = async (req, res) => {
  let data = req.body;
  let result = await userService.createNewUser(data);
  if (result.errCode === 0) {
    return res.status(200).json(result);
  }
  return res.status(500).json(result);
};

let handleDeleteUser = async (req, res) => {
  let id = req.body.id;
  let result = await userService.deleteUser(id);
  if (result.errCode === 0) {
    return res.status(200).json(result);
  }
  return res.status(500).json(result);
};

let handleUpdateUser = async (req, res) => {
  let data = req.body;
  let result = await userService.updateUser(data);
  if (result.errCode === 0) {
    return res.status(200).json(result);
  }
  return res.status(500).json(result);
};

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: getAllUser,
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUser: handleDeleteUser,
  handleUpdateUser: handleUpdateUser,
};
