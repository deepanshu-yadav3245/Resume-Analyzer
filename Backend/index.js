// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");
// const pdfParse = require("pdf-parse");
// const path = require("path");

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// // File upload setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads"),
//   filename: (req, file, cb) =>
//     cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// // Resume upload route
// app.post("/upload", upload.single("resume"), async (req, res) => {
//   try {
//     const filePath = path.join(__dirname, req.file.path);
//     const pdfBuffer = fs.readFileSync(filePath);
//     const data = await pdfParse(pdfBuffer);

//     res.json({
//       message: "Resume parsed successfully!",
//       content: data.text.slice(0, 1000), // just preview
//     });
//   } catch (error) {
//     console.error("PDF parse error:", error);
//     res.status(500).json({ error: "Resume parsing failed" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running at http://localhost:${PORT}`);
// });
// 
// // server.js or index.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
require("dotenv").config();

const jobRoutes = require("./routes/jobRoutes");
const joobleRoutes = require("./routes/joobleRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("✅ Smart Resume Analyzer Server is running!");
});

app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(dataBuffer);

    res.json({
      fileName: req.file.originalname,
      text: parsed.text,
    });
  } catch (err) {
    console.error("❌ Error parsing resume :", err.message);
    res.status(500).json({ error: "Failed to parse resume" });
  }
});

app.use("/api", jobRoutes);
app.use("/", joobleRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
