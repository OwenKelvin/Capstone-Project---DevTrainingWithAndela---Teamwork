const multer = require('multer');
const fs = require('fs');

const { storage, cloudinary } = require('../services/storage.service');
const { GifService } = require('../services/gif.service');

const GifRoute = {
  store(req, res, done) {
    const upload = multer({ storage }).single('image');
    let fileName = '';
    let url = 'http://res.cloudinary.com/owenkelvin/image/upload/v1573321232/teamwork/';
    let { title } = req.body;
    if (!title) {
      title = 'image';
    }
    GifService.createGif({ ...req.body, url, title }, req.auth.id)
      .then(response => {
        const message = 'Gif successfully posted';
        const gifId = response.id;
        upload(req, res, err => {
          if (!err && req.file) {
            fileName = req.file.filename;
            const { path } = req.file;
            cloudinary.uploader.upload(
              path,
              { public_id: `teamwork/${fileName}`, tags: 'teamwork' }, // directory and tags are optional
              (err1, image) => {
                if (err1) return res.send(err1);
                // console.log(image);
                url = image.url;
                // remove file from server
                fs.unlinkSync(path);
                GifService.updateGifUrl(gifId, url)
                  .then(() => {})
                  .catch(() => {});
                return url;
              },
            );
          }
        });
        return res.status(201).send({
          status: 'success',
          message,
          data: { gifId, ...response },
        });
      })
      .catch(err => {
        const message = err;
        return res.status(500).send({ status: false, data: { message } });
      })
      .finally(() => {
        done();
      });
  },
  update(req, res, done) {
    GifService.updateGif(req.body, req.params.gifId)
      .then(response => {
        const message = 'Gif successfully updated';
        const gifId = response.id;
        return res.status(202).send({
          status: 'success',
          data: { gifId, message, ...response },
        });
      })
      .catch(err => {
        const message = err;
        return res.status(500).send({ status: false, data: { message } });
      })
      .finally(() => {
        done();
      });
  },
  destroy(req, res, done) {
    GifService.deleteGif(req.params.gifId)
      .then(() => {
        const message = 'Gif successfully deleted';
        return res.status(202).send({
          status: 'success',
          data: { message },
        });
      })
      .catch(err => {
        const message = err;
        return res.status(500).send({ status: false, data: { message } });
      })
      .finally(() => {
        done();
      });
  },
};

module.exports = { GifRoute };
