import User from '../model/user.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    const preUser = await User.findOne({email:req.body.email})
    if(preUser) return res.status(400).json({success:false,message:'user allready exist'})
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password,salt)
    try {
        let user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword,
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,
            zip:req.body.zip,
            street:req.body.street,
            apartment:req.body.apartment,
            country:req.body.country,
            city:req.body.city,
            image:req.body.image
        })
        let regUser = await user.save()
        res.status(201).json({success:true,message:'profile created succesfully',result:regUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    
}

export const login = async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json({success:false,message:'wrong credentials'})
        const isValidPass = bcrypt.compareSync(req.body.password,user.password)
        if(!isValidPass) return res.status(403).json({success:false,message:'you enterd wrong password'})
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET,{expiresIn:'2d'})
            // const {password, ...otherDetails} = user._doc
            res.status(201).json({success:true,message:'user logged in succefully',token:token,user:user.email}) 
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}