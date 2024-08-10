const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productosRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// RUTAS
app.use("/api", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
