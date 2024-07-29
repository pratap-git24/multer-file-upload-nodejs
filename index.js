const express = require('express');
const path = require('path')
const multer  = require('multer');
const { render } = require('ejs');

const app = express();
const PORT = 8004;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
     return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage })

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('home')
})

app.post('/upload', upload.single('imageUpload'),(req,res,next)=>{
    return render("home")
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})