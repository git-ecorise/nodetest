const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

const routes = require("./routes/treeRootsRoutes");
const childrenRoutes = require("./routes/childrenRoutes");

var corsOptions = {
  origin: "http://bizlypos.com:4000",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

let DB = process.env.DB;

mongoose
  .connect("mongodb://localhost:27017/nodetestdb", {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => console.log("mongoDB connected Successfully"))
  .catch((err) => console.log(err));

app.use("/api/treeroots", routes);
app.use("/api/childrens", childrenRoutes);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
