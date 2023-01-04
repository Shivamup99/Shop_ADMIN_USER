import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    about:{
        type:String,
        default :''
    },
    image:{
        type:String,
        // required:true,\
        default:''
    },
    images:[{
        type:String,
    }],
    brand:{
        type:String,
        default:''
    },
    price:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    countInStock:{
        type:Number,
        required:true,
        min:0,
        max:256
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:''
    },
    reviews:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

productSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

productSchema.set('toJSON',{
    virtuals:true
})

const productModel = mongoose.model('Products',productSchema)
export default productModel;