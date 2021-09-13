const mongoose = require('mongoose');

const PropertySchema=new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    type:{type:String,required:true},
    bedrooms:{type:String,required:true},
    createdAt: { type: Date, default: new Date() },
    price:{type:Number,required:true},
    furnitureTypes:{type:String},
    notes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
    reporter:{type:String,required:true}
})

const Property = mongoose.model('Property',PropertySchema,"Property");

module.exports={
    Property
}