const express = require('express')
const { Addtocart, AllcartItem, DeletecartItem, updateQuantity } = require('../controllers/cartCantrolle')
const { protect } = require('../controllers/userCantroller')
const router = express.Router()

router.use(protect)

router.get('/add/:productId',Addtocart)
router.get("/all",AllcartItem)
router.get("/updateQuntity/:cartItemId/:quantity" , updateQuantity)
router.get("/Deletecartitem/:id",DeletecartItem)

module.exports = router;