import db from "../models/index";
import bcrypt from "bcryptjs";
import user from "../models/user";
const salt = bcrypt.genSaltSync(10);
let handleLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await getUserByEmail(email);

      if (!user) {
        resolve({
          errCode: 1,
          message: "User not found",
        });
      }
      let check = await checkUserPassword(password, user);
      if (!check) {
        resolve({
          errCode: 2,
          message: "Wrong password",
        });
      }
      delete user.password;
      console.log(">>> user", user);

      resolve({
        errCode: 0,
        message: "Login success",
        user: user,
      });
    } catch (err) {
      reject(err);
    }
  });
};

let getUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: {
          email: email,
        },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    } catch (err) {
      reject(err);
    }
  });
};

let checkUserPassword = (password, user) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await bcrypt.compareSync(password, user.password);
      resolve(check);
    } catch (err) {
      reject(err);
    }
  });
};

let getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = null;
      if (!userId) {
        user = await db.User.findAll(
          { attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
          { raw: true }
        );
        resolve({
          errCode: 0,
          message: "Get all user success",
          user: user,
        });
      } else {
        user = await db.User.findOne(
          { where: { id: userId } },
          { attributes: { exclude: ["password", "createdAt", "updatedAt"] } },
          { raw: true }
        );
        if (user) {
          resolve({
            errCode: 0,
            message: "Get user by id success",
            user: user,
          });
        }
        resolve({
          errCode: 1,
          message: "Get all user failed",
          user: user,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleLogin: handleLogin,
  getAllUser: getAllUser,
};
