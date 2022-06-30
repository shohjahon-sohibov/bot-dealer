const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    const imageName = Date.now() + path.extname(file.originalname);
    cb(null, imageName);
    file.originalname = imageName;
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
