const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

const port = 9000;

app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use("/public", express.static(`${__dirname}/../frontend/public`));
app.use(
  "/profileImage",
  express.static(path.join(__dirname, "data/profileImage/"))
);

app.post("/", (req, res) => {
  const { image } = req.files;
  const imageUploadPath =
    __dirname + "/../backend/data/profileImage/profile.jpg";

  image.mv(imageUploadPath);

  const data = JSON.stringify(req.body);
  const uploadPath = __dirname + "/../backend/data/" + "profile.json";

  fs.writeFileSync(uploadPath, data, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
  res.status(200).send(data);
});

app.delete("/", (req, res) => {
  const pictureUploadPath =
    __dirname + "/../backend/data/profileImage/profile.jpg";
  const uploadPath = __dirname + "/../backend/data/" + "profile.json";

  if (fs.existsSync(pictureUploadPath)) {

    fs.unlinkSync(pictureUploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });
  }

  if (fs.existsSync(uploadPath)) {
    fs.unlinkSync(uploadPath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
    });
  }

  return res.status(200).send(JSON.stringify("done"));
});

app.listen(port, (_) => console.log("127.0.0.1:9000"));
