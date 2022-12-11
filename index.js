const express = require("express");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");

dotenv.config();
mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null,'uploads')
    }
})
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running");
});
