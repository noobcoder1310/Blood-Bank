const userModel=require('../models/usermodel');
const  bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
const registerController=async(req,res)=>{
    try {
        console.log('Request body:', req.body); // 
        const existingUser=await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'User already exists'
            });
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(req.body.password,salt)
        req.body.password=hashedpassword
        const user=new userModel(req.body)
        const savedUser =await user.save();
        return res.status(201).json({
            success:true,
            message:'User registered successfuly',
            data:savedUser,
            
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in register API',
            error
        })
        
    }

};
const loginController=async (req,res)=>{
    try {
        const existingUser=await userModel.findOne({email:req.body.email})
        if(! existingUser){
            return res.status(404).send({
                success:false,
                message:"User not exists"

            })
        }
        if(existingUser.role!==req.body.role){
            return res.status(500).send({
                success:false,
                message:'role does not match'
            })
        }
            const comparePassword=await bcrypt.compare(req.body.password,existingUser.password);
            if(!comparePassword){
                return res.status(404).send({
                    success:false,
                    message:"Invalid Password"
                })
            }

            const token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:"8d"})
            return res.status(200).send({
                success:true,
                message:"Loggined successfully",
                token,
                existingUser
            })
        }
     catch (error) {
        console .log(error)
         res.status(500).send({
            success:false,
            message:"error in login API",
             error
        })
    
    }

}
const currentUserController=async(req,res)=>{
    try {
        console.log("USER ID FROM TOKEN:", req.user.userId);
        const user=await userModel.findOne({_id:req.user.userId})
        return res.status(200).json({
           success:true,
           message:"user fetched successfully",
           user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"unable to get user",
            error

        })
        
    }

}
module.exports={registerController,loginController,currentUserController}