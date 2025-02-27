const express = require("express")
const { add_Slider_image, slider } = require("../controllers/Slider")

const router = express.Router()

router.post("/sliderimg", add_Slider_image)
router.get("/slider",slider)

module.exports=router