const express = require("express");
require("./db/config");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", productRoutes);

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
