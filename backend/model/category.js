import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    icon:{
        type:String,
    },
    color:{
        type:String
    },
    image:{
        type:String
    }

},{timestamps:true})

categorySchema.virtual('id').get(function(){
    return this._id.toHexString();
})

categorySchema.set('toJSON',{
    virtuals:true
})

const categoryModal = mongoose.model('Category',categorySchema);
export default categoryModal;