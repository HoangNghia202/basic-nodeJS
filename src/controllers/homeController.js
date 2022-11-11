import db from "../models/index.js";
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(">>>getHomePage");
    console.log(">>>data", data);
    return res.render("homePage.ejs", { userData: JSON.stringify(data) });
  } catch (err) {
    console.log(err);
  }
};

let getAboutPage = (req, res) => {
  console.log(">>>getAboutPage");
  return res.render("aboutPage.ejs");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
};
