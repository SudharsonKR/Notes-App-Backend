import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type:String,
            required: true,
            unique: true,
            maxlength: 200,
        },
        password:{
            type: String,
            required: true,                       
        }

    },
    {
        timestamps: true
    }
)

const Users = mongoose.model("users", userSchema)

export default Users