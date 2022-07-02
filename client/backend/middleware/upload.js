const multer = require("multer");
const {GridFsStorage} = require("multer-gridfs-storage");
var crypto = require('crypto');

const storage = new GridFsStorage({
    url: require("../config/keys").mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err)
          }
          const filename = file.originalname
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          }
          resolve(fileInfo)
        })
      })
    },
  })

module.exports = multer({ storage });