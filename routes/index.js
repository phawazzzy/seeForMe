var express = require('express');
var router = express.Router();
// const multer = require('multer')
// const mongoose = require('mongoose')
const Images = require('../model/image')
const upload = require('../middleware/fileUpload')

const cloudinary = require('../config/cloudinary');
const fs = require('fs')



/* GET home page. */
router.get('/', function (req, res, next) {
  let loading = req.flash('uploading')
  let success = req.flash('success')
  let imageError = req.flash('imageError')
  let saveError = req.flash('saveError')
  res.render('index', { title: 'Express', loading, success, imageError, saveError });
});

router.post('/currency', upload.array('images', 5), async (req, res, next) => {

  let contribution = {
    name: req.body.name,
    email: req.body.email,
    currency: req.body.currency,
  };
  // let files = req.files
  if (req.files) {
    console.log(req.files)
    try {
      const uploader = async (path) => await cloudinary.uploads(path, 'seeForMe');
      const urls = [];
      const files = req.files
      for (const file of files) {
        const { path } = file
        const newPath = await uploader(path)
        if(urls.length != files.length ){
          req.flash("uploading",'images are still being uploaded, please wait')
          urls.push(newPath)
          fs.unlinkSync(path)
        }
        
      }
      console.log(urls)
      contribution.images = urls
    } catch (error) {
      req.flash('imageError', `${error} occured during your uploads, please reload the page`)
      console.log(error)

    }

  }

  await Images.create(contribution).then(result => {
    if(result) {
      console.log(result)
      req.flash('success', 'your contribution has been saved')
    }

  })
  .catch(err => {
    req.flash('saveError', `${err} occured while trying to save your contribution, please try again`)
    console.log(err)
  })

  res.redirect('/')
})





module.exports = router;
