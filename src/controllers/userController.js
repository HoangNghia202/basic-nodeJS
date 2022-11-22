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

module.exports = {
  handleLogin: handleLogin,
};
