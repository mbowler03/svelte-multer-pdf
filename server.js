//const conf = require("./config");
//const routes = require("./routes/api");
const bodyParser = require("body-parser");
//require("body-parser-csv")(bodyParser);
const express = require("express");
const path = require("path");
const multer = require("multer");
const app = express();
app.use("/upload", express.static(path.join(__dirname, "/uploads")));
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
// Auto parse body based on Content-Type header.
// app.use(bodyParser.json({ type: "application/json" }));
// app.use(
//   bodyParser.csv({
//     csvParseOptions: {
//       fastcsvParams: {
//         headers: true,
//         trim: true,
//       },
//     },
//   })
// );
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
//Upload route
// or upload.array('images', 100)
app.get("/", function (req, res) {
    res.send("Hello Mike")
})
app.post("/upload", upload.single("file"), (req, res, next) => {
    console.log('req.body', req.body);
  try {
    return res.status(201).json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error(error);
  }
});
// Set the base path for all routes included in routes/api.js.
//app.use(conf.api_base, routes);
app.listen(PORT, function() {
  console.log(`Server running on PORT ${PORT}!`);
});