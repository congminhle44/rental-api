/** @format */

const multer = require('multer');

module.exports.uploadFile = (type, allowFileType) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${type}s`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      const switchAllowFileType = () => {
        switch (allowFileType) {
          case 'image':
            return (
              file.mimetype == 'image/jpg' ||
              file.mimetype == 'image/jpeg' ||
              file.mimetype == 'image/png'
            );
          case 'video':
            return file.mimetype == 'video/mp4';
          default:
            return '';
        }
      };

      if (switchAllowFileType()) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error(`Only ${allowFileType} file format allowed`));
      }
    },
  });

  return upload.single(type);
};
