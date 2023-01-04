import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    shippingAddress1:{
        type:String,
        required:true,
    },
    shippingAddress2:{
        type:String,
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    status:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    dateOrderd:{
        type:Date,
        default:Date.now
    }

},{timestamps:true})

orderSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

orderSchema.set('toJSON',{
    virtuals:true
})

const orderModal = mongoose.model('Order',orderSchema);
export default orderModal;