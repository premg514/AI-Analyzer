import mongoose from "mongoose"

const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Username is required"],
            unique: true,
            trim: true,
        },
        profession: {
            type: String,
            required: [true, "Profession is required"],
            trim: true,
        },
       
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        image: {
            type: String,
            required: [true, "Profile image is required"]
        }
    },
    { timestamps: true },
)

export const authModel = mongoose.model("User", authSchema)

