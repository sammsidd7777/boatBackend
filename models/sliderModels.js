
const mongoose =require("mongoose")


const Sliderschema= new mongoose.Schema({
    Sliderimage:{
        type: [String],
        required:[true, "please provide slider images"]
    },

})

const slider = mongoose.model("slide",Sliderschema)

module.exports= slider