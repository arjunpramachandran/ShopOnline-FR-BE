const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        index:true
    },
    price:Number,
    discription:String,
    imageUrl:String
})


const Product = mongoose.model('products',productSchema)

module.exports = Product