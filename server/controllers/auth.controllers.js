import User from '../models/user.js'
import { signupSchema } from '../validators/auth.validators.js'


export const Signup=async(req,res)=>{
    try{
       const result=signupSchema.safeParse(req.body)
       if(!result.success){
         return res.status(400).json({
            error:result.error.issues
         })
       }
      const {email,name,password}=result.data
      const exitingUser=await User.findOne({email})
      if(exitingUser){
        return res.status(409).json({
            message:"All redey exiting user"
        })
      }
      const user=await User.create({
        email,
        password,
        name
      })
      return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    }catch(error){
         if (error.code === 11000) {
      return res.status(409).json({
        message: "Email already registered"
      });
    }

    return res.status(500).json({
      message: "Internal server error"
    });
    }
}