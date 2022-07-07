const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

module.exports = upload;
