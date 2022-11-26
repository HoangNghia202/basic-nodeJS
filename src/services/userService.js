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

let hashPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let existUser = await getUserByEmail(userData.email);
      if (existUser) {
        resolve({
          errCode: 1,
          message: "Email already exists",
        });
      }
      let hash = await hashPassword(userData.password);
      await db.User.create({
        email: userData.email,
        password: hash,
        firstName: userData.fname,
        lastName: userData.lname,
        address: userData.address,
        phoneNumber: userData.phoneNum,
        gender: userData.gender == "1" ? true : false,
        roleId: userData.role,
      });
      resolve({
        errCode: 0,
        message: "Create new user success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUser = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userID } });
      if (user) {
        await user.destroy();
        resolve({
          errCode: 0,
          message: "Delete user success",
        });
      }
    } catch (error) {}
  });
};

let updateUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userData.id } });
      if (user) {
        user.firstName = userData.fname;
        user.lastName = userData.lname;
        user.address = userData.address;
        await user.save();
        resolve({
          errCode: 0,
          message: "Update user success",
        });
      } else {
        resolve({
          errCode: 1,
          message: "User not found",
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
  createNewUser: createNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
};
