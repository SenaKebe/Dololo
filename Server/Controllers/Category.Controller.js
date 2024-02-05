const categoryService = require('../services/category.service');
const dotenv = require('dotenv');
dotenv.config();

const categoryController ={
     getAllCategories: async(req,res)=>{
        const rows = categoryService.getAllCategories;
        res.send(200).json({
       success: true,
       data : rows
        })
     } , 
     getSingleCategories: async(req,res)=>{
        const id = req.params.id.substring(1);
        const rows = await categoryService.getsingleCategory(id)
        res.status(200).json({
            success: true,
            data : rows
        })
     },
     deleteSingleCategory: async (req, res) => {
        const id = req.params.id.substring(1);
        const isDeleted = await categoryService.deleteSingleCategory(id);
        if (!isDeleted) {
          res.status(500).json({
            success: false,
            message: `Fail to delete category`
          });
        } else {
          res.status(200).json({
            success: true,
            message: `Category is deleted successfully`
          });
        }
      },
updateSingleCategory: async(req,res)=>{
const id = req.params.id.substring(1)
  const {categoryName, amharicName,imageURL} = req.body
  if(!categoryName || !amharicName || !imageURL || !id){
     return res.send({
  success: false,
  message: 'all fields are required '
}) ;


}
req.body.categoryId = id;
 const isCategoryUpdated= await categoryService.updateSingleCategory()
 if (!isCategoryUpdated){
  res.status(500).json({
    success: 'false',
    message: `Fail to delete`
  })}
  else{
    res.status(200).json({
   success: 'true',
   message : `Updated successfully `
    })
  }
 },
 createSingleCategory : async(req,res)=>{
const {categoryName, amharicName, imageURL} = req.body
if(!categoryName || !amharicName || imageURL){
  return res.status(500).json({
success : 'false',
message: `All fields are required`
  })
}
const id= req.params.id.substring(1)
isCategoryAdded= await categoryService.createSingleCategory
if(!isCategoryAdded){
return res.status(500).json({
  success: true,
  message: `Fail to create`
})
}
else {
  return res.status(200).json({
    success: 'true',
    message :`Created successfully`
  })
}
 }

 }
  
module.exports = categoryController;