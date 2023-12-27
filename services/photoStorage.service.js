const { makePhotoItem } = require("../controllers/photo_item.controller.js");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");

// 버킷 연결
const storage = new Storage({
  projectId: "round-dreamer-409310",
  bucket: "cokothon_ones",
});

const photoStorage = multer({
  storage: multer.memoryStorage(),
});

const uploadPhoto = (req, res) => {
  photoStorage.single("file")(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading photo" });
    }

    const bucketName = "cokothon_ones";
    const filename = `uploads/${Date.now()}_${req.file.originalname}`;
    const file = storage.bucket(bucketName).file(filename);

    // 이미지 업로드
    file
      .save(req.file.buffer, {
        metadata: {
          contentType: req.file.mimetype,
        },
      })
      .then(() => {
        const photoUrl = `https://storage.googleapis.com/${bucketName}/${filename}`;
        // res.json({ success: true, photoUrl, photoItem: createdPhotoItem });
        makePhotoItem(req, res);
      })
      .catch((uploadError) => {
        console.error(uploadError);
        res.status(500).json({ error: "이미지 업로드 실패" });
      });
  });
};

module.exports = { uploadPhoto };
