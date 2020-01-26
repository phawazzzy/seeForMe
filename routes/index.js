var express = require('express');
var router = express.Router();
// const multer = require('multer')
// const mongoose = require('mongoose')
const Images = require('../model/image')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,     //"dyieekcre"
  api_key:  process.env.CLOUD_KEY,        //"732513327822775"
  api_secret: process.env.CLOUD_SECRET    //"HzlXLGG447c9m92q6a8vhWoiR-c"
});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function(req, res, next) {
    // console.log(req.files.image)
    let Success = req.flash('Success')
    let Error = req.flash('Erroor')
    // let dataSaved = req.flash('dataSaved')
  res.render('indexx', {title: 'image source', Success, Error})
})

router.post('/upload', async (req, res, next) => {
  let files = req.files.image;
  console.log(files)
  const upload = await cloudinary.uploader.upload(files.tempFilePath, (err, result) => {
    if(err) {
      req.flash('Error', 'An error occured when during picture upload, please refresh and try again')
      res.redirect('/index')
    }
    return result
  })


  let imageDetails = {
    name: files.name,
    imgLink: upload.secure_url,
    publicid: upload.public_id
  }
  console.log(imageDetails)
  try {
    await Images.create(imageDetails).then((res) => {
      if(res){
        // req.flash('dataSaved', 'your file has been saved succesfully')
        req.flash('Success', 'picture successfully uploaded....Thanks you for your contribution')

      }
    })
  } catch (error) {
    throw error
  } 
  res.redirect('/index' )
})

module.exports = router;
