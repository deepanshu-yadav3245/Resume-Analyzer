const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const PDFParser = require("pdf2json");

const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST /upload
router.post("/", upload.single("resume"), async (req, res) => {
  const filePath = path.join(__dirname, "../uploads", req.file.filename);

  try {
    // Try pdf-parse first
    const dataBuffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(dataBuffer);

    return res.json({
      fileName: req.file.originalname,
      text: parsed.text,
    });
  } catch (err) {
    console.warn("⚠️ pdf-parse failed. Trying pdf2json...", err.message);
  }

  // Fallback to pdf2json
  try {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => {
      console.error("❌ pdf2json error:", errData.parserError);
      return res.status(500).json({ error: "Failed to parse resume using both parsers." });
    });

    pdfParser.on("pdfParser_dataReady", pdfData => {
      const text = pdfParser.getRawTextContent();
      res.json({
        fileName: req.file.originalname,
        text,
      });
    });

    pdfParser.loadPDF(filePath);
  } catch (fallbackError) {
    console.error("❌ Unexpected fallback error:", fallbackError.message);
    res.status(500).json({ error: "Resume parsing failed." });
  }
});

module.exports = router;
