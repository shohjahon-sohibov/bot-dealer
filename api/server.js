require("dotenv").config();
const express = require("express");
const app = express();
const mongo = require("../utils/db");
const cors = require('cors')

const productRoutes = require("../routes/productRoutes");

app.use(express.json());
app.use(cors());
app.use('/upload', express.static('upload'))
app.use(express.urlencoded({ extended: true }));

mongo()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.get("/", (_, res) => {
  res.send("App works properly!");
});

// app.get("*", (_, res) => {
//   res.json("endpoint wrong!");
// });

app.use("/api/products/", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
