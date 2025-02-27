const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/ProductModels");
const sizeOf = require("image-size");
const { error } = require("console");


const storage = multer.diskStorage({ 
  
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
  const allowedMimeTypes = ["image/jpeg", "image/webp","image/png","image/jpg","image/AVIF","image/avif"];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed."));
  }
  cb(null, true);
};

const upload = multer({

  storage: storage,
  limits: { fileSize: 70 * 1024 * 1024 }, // 50 MB max file size
  fileFilter: fileFilter,
}).fields([
  { name: 'productImg', maxCount: 5 },  // Handle multiple images for productImg
  { name: 'productDescriptionImg', maxCount: 2 }  // Handle multiple images for productDescriptionImg
]);// Handle multiple file uploads

  



exports.addProduct = async (req, res) => {
  console.log("Received product addition request");
 

  upload(req, res, (err) => {
    if (err) {
      console.log("Error in file upload", err);
      return res.status(500).send("Error in file upload");
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({status:"401",message:"file not coming"});
    }

    if (!req.body.productName || !req.body.productCategory || !req.body.productPrice||!req.body.productType||!req.body.productDescription ||!req.body.productBrand ) {
    
      return res.status(400).send("Missing required product fields.");
    }

    console.log("Product data:", req.body);
    console.log("Uploaded files:", req.files);
    
    createNewProduct(req, res);
  });
};




const createNewProduct = async (req, res) => {
  // console.log(req)
  try {
    const images = req.files.productDescriptionImg.map((file) => file.filename);
    const imagess = req.files.productImg.map((file) => file.filename);

    const newProduct = await Product.create({
    




      productName: req.body.productName,
      productBrand: req.body.productBrand || ["Boat"],  // Default to ["Boat"] if not provided
      productPrice: req.body.productPrice,
      productRating: req.body.productRating,
      productOffer: req.body.productOffer,
      productCategory: req.body.productCategory,
      productType: req.body.productType,
      productKeySpecfication: req.body.productKeySpecfication,
      productDescription: req.body.productDescription || '',
      productImg: imagess,
      productDescriptionImg:images,
    });

    const productData = JSON.parse(JSON.stringify(newProduct));
    res.status(200).json(productData);
    console.log("New product added:", newProduct);
  } catch (error) {
    console.log("Error creating product:", error.message);
    res.status(400).json({
      status: "error",
      message: ["Something went wrong while adding the product", error.message],
    });
  }
};



exports.allproduct = async (req, res) => {
  try {
        

    const product = await Product.find(); // Fetch all products from the database

    const cat = new Map(); // Using a Map to track unique categories with their images
    
    // Iterate over the products array
    product.forEach((item) => {
      const sam = String(item.productCategory);  // Convert productCategory to string
    
      // If the category is not already in the Map, add it with the product image


   

 
      
    
  
     
     

      if (!cat.has(sam)) {
        cat.set(sam, item.productImg); // Store the second image as the category image
      }
    });
    
    // Now create an array of objects with the 'cag' key and associated image
    const uniqueCategories = [...cat].map(([category, img]) => ({ cag: category, img }));
    
    
    
    
    
    
    
    
    const Categories = uniqueCategories ; // Initialize an empty array to store categories and images
    
   
  
    const products = { product, Categories };

   

    // Send the response to the client
    res.status(200).json({ status: "OK", message: products });

  } catch (error) {
    console.error('Error fetching products:', error); // Log the error for debugging
    res.status(500).json({ error: 'Server error occurred while fetching products.' });
  }
};



exports.detail=async(req,res)=>{
  let id = req.params.id
  console.log(id,"id")
try {
      const product_detail = await Product.findById(id);

      const Category  = product_detail.productCategory

      
      const similar = await Product.find({productCategory :Category})
      console.log(similar)

 

  res.status(200).json({status: "OK", message:{product_detail,similar}})
  
} catch (error) {
  console.log(error);
      res.status(400).json({status:"400",message:error.message })    
}
  

}


exports.DeleteProduct=async(req,res)=>{
      
  try {
    const productId=req.params.id;
    // console.log(productId)
    

    const product=await Product.findByIdAndDelete(productId)

    // product.save()

    Product.save()
    res.status(200).json({status:"200",message:"product Removerd"})
    
  } catch (error) {
    res.status(401)
    
  }
}
