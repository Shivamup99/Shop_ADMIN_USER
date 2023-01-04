import mongoose from "mongoose";
import Category from "../model/category.js";
import Products from "../model/product.js";

export const createProduct = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid category !");
    const fileName = req.file.filename;
    const basepath = `${req.protocol}://${req.get('host')}/public/uploads/`
    let product = new Products({
      name: req.body.name,
      description: req.body.description,
      about: req.body.about,
      brand: req.body.brand,
      image: `${basepath}${fileName}`,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      reviews: req.body.reviews,
      isFeatured: req.body.isFeatured,
    });
    if (!product) return res.status(400).json({ success: false });
    let newProduct = await product.save();
    res
      .status(201)
      .json({
        success: true,
        message: "product created successfully",
        result: newProduct,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fetch product by category also

export const fetchProduct = async (req, res) => {
    let filter ={};
    if(req.query.categories){
        filter = {category:req.query.categories.split(',')}
    }
  try {
    let product = await Products.find(filter).sort({ _id: -1 }).populate("category");
    if (!product) return res.status(404).json({ success: false });
    res.status(200).json({ success: true, result: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// fetch product for only name , image , rating
export const fetchProductByCondition = async (req, res) => {
  try {
    let product = await Products.find().select("name image -_id");
    if (!product) return res.status(404).json({ success: false });
    res.status(200).json({ success: true, result: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchProductById = async (req, res) => {
  try {
    let product = await Products.findById(req.params.id).populate("category");
    if (!product)
      return res
        .status(404)
        .json({ message: "product not found by this ID !" });
    res.status(200).json({ success: true, result: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    let product = await Products.findByIdAndRemove(req.params.id);
    if (product) {
      res
        .status(200)
        .json({ success: true, message: "the product deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "product not found !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('Invalid Id')
    }
  try {
    
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send("Invalid category !");
    let updateImage = await Products.findById(req.params.id)
    if(!updateImage) return res.status(400).success({success:false,message:'Invalid product image'})
    const file = req.file;
    let imagePath;
    if(file){
      const fileName = req.file.filename;
      const basepath = `${req.protocol}://${req.get('host')}/public/uploads/`
      imagePath = `${basepath}${fileName}`
    } else{
         imagePath = updateImage.image;
    }
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        about: req.body.about,
        brand: req.body.brand,
        image: imagePath,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        reviews: req.body.reviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );
    if (!product) return res.status(400).json({ success: false });
    res.status(200).json({ success: true, result: product,messge:'product updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// count products for admin

export const countProduct =async(req,res)=>{
    try {
        let product = await Products.countDocuments()
        if(!product) return res.status(404).json({success:false});
        res.status(200).json({count:product})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// featured product and limitation with api

export const featuredProduct = async(req,res)=>{
    const count = req.params.count ? req.params.count : 0;
    try {
        let product = await Products.find({isFeatured:true}).limit(+count);
        if(!product) return res.status(400).json({success:false})
        res.status(200).json({success:true,result:product})
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

// upload image galary

export const updateProductGallery = async(req,res)=>{
  try {
    const files = req.files;
   // console.log(req.files)
    let imagesPath =[];
    const basepath = `${req.protocol}://${req.get('host')}/public/uploads/`
    if(files){
      files.map(file=>{
        imagesPath.push(`${basepath}${file.filename}`)
      })
    } 
   
     const product = await Products.findByIdAndUpdate(
        req.params.id,
        {
         images : imagesPath
        },
        { new: true }
      );
       if (!product) return res.status(400).json({ success: false });
      res.status(200).json({ success: true, result: product }); 
  
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
}