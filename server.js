const express = require('express')
const { register } = require('module')
const mongoose =require('mongoose')
require('dotenv').config()
const User = require('./models/User')
const Recipe = require('./models/Recipe');
const bcrypt = require('bcryptjs')
const cors = require('cors');
const multer = require('multer');

const app = express()
const PORT = 3000
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


// Home page api
app.get('/', (req, res)=>{
    res.send("<h1>Welcome to Mern Stack<h1>")
})

// Registration page api

app.post('/register',async(req, res)=>{
    const {username, email, password} =req.body
    try{
        const hashedPassword= await bcrypt.hash(password,10)
        const user = new User({username, email, password:hashedPassword})
        await user.save()
        res.json({message: "User Registered"})
        console.log("User Registration completed")
    }
    catch(err)
    {
        console.log(err)
    }
});

// Login page api
app.post('/login',async(req, res)=>{
    const {email, password} =req.body
    try{
        
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password)))
        {
            return res.status(400).json ({message:"Invalid Credentials"});
        }
        res.json({message:"Login Suceessfully", username: user.username});
    }
    catch(err)
    {
        console.log(err)
    }
});

//  Set Up Multer for Image Uploads
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });
  
  const upload = multer({ storage });

//  Add Recipe API (POST)
app.post("/create", upload.single("photo"), async (req, res) => {
    try {
      const { name, description, ingredients, steps, time, instruction } = req.body;
      const photo = req.file ? `/uploads/${req.file.filename}` : "";
  
      const newRecipe = new Recipe({ name, description, ingredients, steps, time, instruction, photo });
      await newRecipe.save();
      res.json({ message: `Recipe "${name}" added successfully!` });
    } catch (error) {
      console.error("Error adding recipe:", error);
      res.status(500).json({ error: "Database error" });
    }
  });
  
  //  Get All Recipes API (GET)
  app.get("/create", async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ error: "Database error" });
    }
  });

mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("DB connect suceessfully")
).catch(
    (err) => console.log(err)
)

app.listen(PORT, (err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port:" +PORT)
})