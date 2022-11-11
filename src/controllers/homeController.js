let getHomePage = (req, res) => {
  console.log(">>>getHomePage");
  return res.render("homePage.ejs");
};

let getAboutPage = (req, res) => {
  console.log(">>>getAboutPage");
  return res.render("aboutPage.ejs");
};
module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
};
