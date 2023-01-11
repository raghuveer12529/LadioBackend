const express = require("express");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const Image = require("./models/Image");
const fs = require("fs");
const { toJSON } = require("flatted");

dotenv.config();
mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/uploads", upload.single("testImage"), (req, res) => {
  const saveImage = new Image({
    name: req.body.name,
    img: {
      data:  req.file.filename,
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => console.log(res + " image saved"))
        .catch((err) => console.log(err));
    const str = toJSON(res);
    res.status(200).send(str);
});
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend is running");
});
