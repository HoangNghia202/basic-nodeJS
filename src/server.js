const express = require("express");
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
