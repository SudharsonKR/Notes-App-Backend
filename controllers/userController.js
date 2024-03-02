import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import Users from "../models/userModel.js";

const userCtrl = {
    registerUser: async (req, res)=>{
        try{
            const {username, email, password} = req.body

            if (!username) {
                res.status(400).send({ error: "Error in Name Validation" });
              } else if (!email) {
                res.status(400).send({ error: "Error in Email Validation" });
              } else if (!password) {
                res.status(400).send({ error: "Error in password Validation" });
              } 

           const user = await Users.findOne({email: email})
            if(user) return res.json({msg: "This Email already Exist"})

            const pswdHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                username: username,
                email: email,
                password: pswdHash
            })
            await newUser.save()

            res.json({msg: "User Registered Successfull"})

        }catch(err){
            return res.status(500).json({Errormsg: err.message})
        }        
    },
    loginUser: async (req, res)=>{
        try{

            const{email, password} = req.body
            
            const user = await Users.findOne({email: email})
            if(!user) return res.status(400).json({msg: "User does not exist"})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect Password"})

            //login success
            const payload = {id: user._id, name: user.username}
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
            res.json({token})

        }catch(err){
            return res.status(500).json({ErrorMsg: err.message})
        }
    },
    verifiedToken: (req, res)=>{
        try{
            const token = req.header("Authorization")
            if(!token) return res.send(false)

            jwt.verify(token, process.env.JWT_SECRET_KEY, async(err, verified)=>{
                if(err) return res.send(false)

                const user = await Users.findById(verified.id)
                if(!user) return res.send(false)

                return res.send(true)
            })

        }catch(err){
            res.status(500).json({msg: err.message})
        }
    }
}

export default userCtrl