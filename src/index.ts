import express from "express";
import bodyParser from "body-parser";
import routes from "./routes";
import { config } from "./config";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
