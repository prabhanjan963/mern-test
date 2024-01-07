import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '../utils/emailTemplate.js';
import User from '../models/user.js';

export const signup = async (req,res) => {
    const { name, email, password } = req.body;
    try {
        if(!name ||!email ||!password) return res.status(400).json({error: 'Fill all details'})
        if(!email.includes('@')) return res.status(400).json({error: 'Enter Valid Email!'})

        const hashedPassword = bcryptjs.hashSync(password,10)

        const secretKey = "dsjfsjfwiuyfgszftsh";

        const token = jwt.sign({email},secretKey,{ expiresIn:'5m' })
        const link = `http://localhost:5173/verify/${token}`

        sendEmail(link,email);

        const newUser = await User({...req.body,password:hashedPassword,isVerified:false})
        await newUser.save()
        res.status(201).send({success:"Registration Successfully"})

    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const signin = async (req,res) => {
    const { email, password } = req.body;
    try {
        if(!email ||!password) return res.status(400).json({error: 'Fill all details'})
        if(!email.includes('@')) return res.status(400).json({error: 'Enter Valid Email!'})

        const user = await User.findOne({email})
        if(!user) return res.status(404).json({error:"User Not Found!"})

        //email work

        const isVerifieDProfile = await User.findById(user._id);

        if(isVerifieDProfile.isVerified){
            const isCorrect = bcryptjs.compareSync(password, user.password)
            if(!isCorrect) return res.status(404).json({error:"Wrong Credentials!"})
    
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            const { password:hashedPassword,...rest } = user._doc;
    
            res.cookie('access_token',token,process.env.JWT_SECRET).status(200).json(rest)
        }else{
            res.status(400).json({error: "Please Verify Email"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const saveVerifiedEmail = async (req,res) => {
    const { token } = req.params;
    
    try {
        if(token){
            const secretKey = "dsjfsjfwiuyfgszftsh";
            const isEmailVerified = jwt.verify(token,secretKey)
            if (isEmailVerified) {
                
                const getuser = await User.findOne({email: isEmailVerified.email})

                const saveEmail = await User.findByIdAndUpdate(getuser._id, {
                    $set:{
                        isVerified:true,
                    }
                },{$new:true});

                if(saveEmail){
                    return res.status(200).json({error: "Email verification Successfully"})
                }

            } else {
                return res.status(500).json({error: "Link Expired"})
            }
        }else{
           return res.status(500).json({error: "Invalid URL"})
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}