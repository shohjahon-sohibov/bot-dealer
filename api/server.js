require("dotenv").config();
const express = require("express");
const app = express();
const mongo = require("../utils/db");

const productRoutes = require("../routes/productRoutes");

app.use(express.json());
mongo()
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

app.get("/", (_, res) => {
  res.send("App works properly!");
});

// app.use("*", (_, res) => {
//   res.json("endpoint wrong!");
// });

app.use("/api/products/", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
