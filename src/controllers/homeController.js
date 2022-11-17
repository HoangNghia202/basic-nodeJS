import db from "../models/index.js";
import CRUDService from "../services/CRUDService.js";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(">>>getHomePage");
    // console.log(">>>data", data);
    return res.render("homePage.ejs", { userData: JSON.stringify(data) });
  } catch (err) {
    console.log(err);
  }
};

let getAboutPage = (req, res) => {
  console.log(">>>getAboutPage");
  return res.render("aboutPage.ejs");
};

let getCRUD = (req, res) => {
  console.log(">>>getCRUD");
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  console.log(">>>postCRUD method");
  let message = await CRUDService.createNewUser(req.body);
  console.log("", message);
  return res.send("postCRUD form server");
};

let displayGetCRUD = async (req, res) => {
  let users = await CRUDService.getAllUser();
  console.log("", users);

  return res.render("displayCrud.ejs", { users: users });
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
};
