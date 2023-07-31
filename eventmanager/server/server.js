const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);


const router = require("./router");
app.use("/", router);


const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
