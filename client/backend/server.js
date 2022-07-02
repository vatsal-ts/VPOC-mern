const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");
const Grid = require("gridfs-stream");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let gfs, gridfsBucket;

const uri = require("./config/keys").mongoURI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: "uploads",
  });
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("MongoDB database connection established successfully");
});

//get image
app.get("/file/:filename", (req, res) => {
  console.log(1);
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(400).json("Error: " + "No file exists");
    }
    // Check if image
    console.log(2);
    if (
      file.contentType === "image/jpeg" ||
      file.contentType === "image/png" ||
      file.contentType === "image/jpg"
    ) {
      // Read output to browser
      console.log(3);
      // const readstream = gfs.createReadStream(file.filename)
      const readstream = gridfsBucket.openDownloadStream(file._id);
      readstream.pipe(res);
    } else {
      console.log(4);
      res.status(400).json("Error: " + "Not an image");
    }
  });
});

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const categoryRouter = require("./routes/category");

app.use("/products", productsRouter);
app.use("/category", categoryRouter);
app.use("/", usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});
