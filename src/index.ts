import express from "express";
const app = express();
const port = 3000;
import bodyParser from "body-parser";

import route from "./routes/index";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
