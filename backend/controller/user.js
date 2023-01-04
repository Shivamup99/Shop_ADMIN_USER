import User from '../model/user.js'
import bcrypt from 'bcryptjs'


export const fetchUser = async (req, res) => {
    try {
      let user = await User.find().sort({ _id: -1 }).select('-password');
      if (!user) return res.status(404).json({ success: false });
      res.status(200).json({ success: true, result: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const fetchUserById = async (req, res) => {
    try {
      let user = await User.findById(req.params.id).select('-password');
      if (!user)
        return res
          .status(404)
          .json({ message: "user not found by this ID !" });
      res.status(200).json({ success: true, result: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const updateUser = async(req,res)=>{
    const userExist = await User.findById(req.params.id);
    let newPassword;
    if(req.body.password){
        newPassword = bcrypt.hashSync(req.body.password,10)
    }
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name:req.body.name,
                email:req.body.email,
                password:newPassword,
                phone:req.body.phone,
                isAdmin:req.body.isAdmin,
                zip:req.body.zip,
                street:req.body.street,
                apartment:req.body.apartment,
                country:req.body.country,
                city:req.body.city,
                image:req.body.image
            },
            { new: true }
          );
          res.status(200).json({ success: true, result: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }

  export const deleteUser = async (req, res) => {
    try {
      let user = await User.findByIdAndRemove(req.params.id);
      if (user) {
        res
          .status(200)
          .json({ success: true, message: "the user deleted successfully" });
      } else {
        res.status(404).json({ success: false, message: "user not found !" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const countUser = async(req,res)=>{
    try {
        let cuser = await User.countDocuments();
        //console.log(cuser)
        if(!cuser) return res.status(404).json({success:false});
        res.status(200).json({user:cuser})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  }