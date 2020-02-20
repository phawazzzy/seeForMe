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
  res.render('index', { title: 'Express', loading, success });
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
      console.log('some error occured, your images were not uploaded')
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
    console.log(err)
  })

  res.redirect('/')
})


router.get('/index', function (req, res, next) {
  // console.log(req.files.image)
  let Success = req.flash('Success')
  let Error = req.flash('Erroor')
  // let dataSaved = req.flash('dataSaved')
  res.render('indexx', { title: 'image source', Success, Error })
})

// router.post('/upload', async (req, res, next) => {
//   let files = req.files.image;
//   console.log(files)
//   const upload = await cloudinary.uploader.upload(files.tempFilePath, (err, result) => {
//     if(err) {
//       req.flash('Error', 'An error occured when during picture upload, please refresh and try again')
//       res.redirect('/index')
//     }
//     return result
//   })


//   let imageDetails = {
//     name: files.name,
//     type: req.body.type,
//     imgLink: upload.secure_url,
//     publicid: upload.public_id
//   }
//   console.log(imageDetails)
//   try {
//     await Images.create(imageDetails).then((res) => {
//       if(res){
//         // req.flash('dataSaved', 'your file has been saved succesfully')
//         req.flash('Success', 'picture successfully uploaded....Thanks you for your contribution')

//       }
//     })
//   } catch (error) {
//     throw error
//   } 
//   res.redirect('/index' )
// })


module.exports = router;
