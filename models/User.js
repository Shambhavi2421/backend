const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
});

module.exports= mongoose.model('User',UserSchema)


// //  Set Up Multer for Image Uploads
// const storage = multer.diskStorage({
//     destination: "./uploads/",
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//     },
//   });
  
//   const upload = multer({ storage });