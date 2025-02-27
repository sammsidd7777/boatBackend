const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
    productName: {
        type: String,  
        required: true,  
    },
    
    productBrand: {
        type: String,  
        default:["Boat"]
    },
    
    productPrice: {
        type: Number,  
        required: true,  
        min: 0,           
    },
    productRating:{
        type:Number
    },
    productOffer:{
            type:String
    },
    
    productCategory: {
        type: [ ],    
        required: true,  

    },
    
    productType: {
        type: [String],   
        required: true,   
       
    },
    
    productDescription: {
        type: String,   
        default: '',     
    },
    
    productImg: {
        type: [String],  
        required: true, 
    },
    productDescriptionImg:{
        type:[String]
    },
    productKeySpecfication:{
        type:String
    }
});

// Create model
const Products = mongoose.model('Product', productSchema);

// Export the model
module.exports = Products;
