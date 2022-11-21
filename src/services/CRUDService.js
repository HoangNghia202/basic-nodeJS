import bcrypt from "bcryptjs";
import e from "express";
import db from "../models/index.js";
import user from "../models/user.js";
const salt = bcrypt.genSaltSync(10);

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

let createNewUser = async (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      resolve(">>> OK! Create new user success");
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise((resolve, reject) => {
    try {
      let users = db.User.findAll({ raw: true });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
let getUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId } });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(">>> data edit", data);

    try {
      let user = await db.User.findOne({ where: { id: data.id } });
      if (user) {
        user.firstName = data.fname;
        user.lastName = data.lname;
        user.address = data.address;
        await user.save();
        let allUsers = await db.User.findAll();
        resolve(allUsers);
      } else {
        resolve({});
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({ where: { id: userId } });
      if (user) {
        await user.destroy();
      }
      let allUsers = await db.User.findAll();
      resolve(allUsers);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserById: getUserById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
