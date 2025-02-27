const express = require("express");
const multer = require("multer");
const path = require("path");
const Slider = require("../models/sliderModels")
const sizeOf = require("image-size");



const storages = multer.diskStorage({

  filename: (req, file, cb) => {
    const randomString =
      Math.floor(Math.random() * 100000).toString() + Date.now();
    cb(null, randomString);
  },
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Fixing the upload directory path
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/webp", "image/png", "image/jpg", "image/AVIF", "image/avif"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed."));
  }
  cb(null, true);
};

const upload = multer({

  storage: storages,
  limits: { fileSize: 70 * 1024 * 1024 }, // 50 MB max file size
  fileFilter: fileFilter,
}).array("Sliderimage", 999); // Handle multiple file uploads




exports.add_Slider_image = async (req, res) => {



  upload(req, res, (err) => {
    if (err) {
      console.log("Error in file upload", err);
      // return res.status(500).send("Error in file upload");
      return res.status(500).json({ status: "500", message: err.message })
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ status: "401", message: "file not coming" });
    }
    cretenewslider(req, res);
  });
};


const cretenewslider = async (req, res) => {

  try {
    const img = req.files.map((file) => file.filename)
    console.log("images", img)
  

    let newSlider =await Slider.findOne({})
    newSlider.Sliderimage =img
    // const newSlider = await Slider.create({
    //   Sliderimage:img
    // })

    await newSlider.save()


    res.status(200).json({ status: "200", message: newSlider })
  } catch (error) {
    res.status(400).json({ status: "400", message: error.message })
  }
}

exports.slider=async(req,res)=>{
  try {
   
    const slider = await Slider.find()


    res.status(200).json({status:"200",message: slider})

    
  } catch (error) {
    res.status(400).json({status:"400",message:error.message})
  }
}

