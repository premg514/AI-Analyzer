import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { authModel } from "./authModel.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());



const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// GeminiAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });



// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// JWT Middleware
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(403).json({ message: "Access Denied! No token provided." });
    }
    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token!" });
    }
};

// Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { name, profession, password } = req.body;


        if (!password) {
            return res.status(400).json({ message: "Password is required" });
        }

        const existingUser = await authModel.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new authModel({
            name,
            profession,
            password: hashedPassword,

        });

        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id, name: newUser.name }, SECRET_KEY, { expiresIn: "1h" });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { name, password } = req.body;

        const existingUser = await authModel.findOne({ name });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: existingUser._id, name: existingUser.name }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token, userDetails: existingUser });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


// Generate Content with Gemini AI
app.post("/generate", verifyToken, async (req, res) => {
    const { prompt } = req.body;
    try {
        const result = await model.generateContent(prompt);
        res.status(200).json({ data: result.response.text() });
    } catch (error) {
        res.status(500).json({ message: "Error generating content", error: error.message });
    }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
