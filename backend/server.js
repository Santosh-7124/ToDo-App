const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/ToDoRoutes");

const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const uri = "Enter your URI";
mongoose
  .connect(uri)
  .then(() => console.log("MongoDb connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
