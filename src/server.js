const express = require("express");
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDb";
import cors from "cors";
require("dotenv").config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();
viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
