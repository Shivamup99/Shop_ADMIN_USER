import Category from "../model/category.js";

export const createCategory = async (req, res) => {
  try {
    let oldCat = await Category.findOne({ name: req.body.name });
    if (oldCat)
      return res.status(400).json({ message: "same category name exist !" });
    let category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
      image: req.body.image,
    });
    if (!category)
      return res.status(404).json({ message: "category can not be created !" });
    let newCat = await category.save();
    res
      .status(201)
      .json({
        success: true,
        result: newCat,
        message: "category created successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchCategory = async (req, res) => {
  try {
    let category = await Category.find().sort({ _id: -1 });
    if (!category) return res.status(404).json({ success: false });
    res.status(200).json({ success: true, result: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchCategoryById = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .json({ message: "category not found by this ID !" });
    res.status(200).json({ success: true, result: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ success: true, result: category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    let category = await Category.findByIdAndRemove(req.params.id);
    if (category) {
      res
        .status(200)
        .json({ success: true, message: "the category deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "category not found !" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const countCategory =async(req,res)=>{
  try {
      let category = await Category.countDocuments()
      if(!category) return res.status(404).json({success:false});
      res.status(200).json({count:category})
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}