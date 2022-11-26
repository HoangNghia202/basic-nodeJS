import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/postCrud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCrud);
  router.post("/put-crud", homeController.putCrud);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-user", userController.handleGetAllUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
