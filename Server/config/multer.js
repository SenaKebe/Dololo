const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads/'); // Set the destination folder for your uploads
   },
   filename: function (req, file, cb) {
     // Create a unique filename for each uploaded file
     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
     //extraction
     const fileExtension = file.originalname.split('.').pop();
     console.log(file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
    
   }
 });
 

 const upload = multer({ storage: storage });


 module.exports= upload;

