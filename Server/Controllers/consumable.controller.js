const consumableService = require('../services/consumable.service')
const dotenv = require('dotenv');
dotenv.config();
const multer= require('../config/multer')
const consumableController={

    getAllConsumables: async(req,res)=>{
     const  rows= await consumableService.getAllConsumables()
     res.status(200).json({
        success: true,
        data : rows
     });
 },
  getSingleConsumableById: async(req,res)=>{
 const id = req.params.id.substring(1)
 const rows = await consumableService.getSingleConsumableById(id);
    res.status(200).json({
        success: true,
        data: rows
    });
 },  
 getConsumableByCategory: async(req,res)=>{
    const id =  req.params.id.substring(1)
    const rows= await consumableService.getConsumableByCategory(id)
    res.status(200).json({
        success : true,
        data: rows
    })
 },
 getConsumableByUser: async(req,res)=>{

    const id= req.params.id.substring(1)
    const rows = await consumableService.getConsumableByUser(id)
    res.status(200).json({
        success: true,
        data : rows
         
    });
 },
 updateSingleConsumable: async(req,res)=>{

    const id = req.params.id.substring(1)
   const {consumableName, amharicName, price, categoryId} = req.body

   if(!consumableName || !amharicName || !id || !price || !categoryId){
        res.status(500).json({
            success : false,
            message: `All fields are required`
        })
      const  isUpdated = await consumableService.updateSingleConsumable(id)
    }
    if(!isUpdated){
        res.status(500).json({
          success: false,
          message: `Fail to update`
        })
    } else{
        res.status(200).json({
            success: true,
            message: `Consumable updated successfully`
        })
    }  
 },

 deleteSingleConsumable : async(req,res)=>{
    const isDeleted = await consumableService.deleteSingleConsumable(id)
    const id = req.params.id.substring(1)
    if(!isDeleted){
        return res.status(500).json({
            success: false,
            message: `Fail to delete`
        })
    }
    res.status(200).json(200)({
        success : true,
        message : `Consumable is deleted successfully`
    })
 },
 createSingleConsumable: async(req,res)=>{
    //let newFileName = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/uploads/`;
  //  newFileName= "rrrrr"
    //${req.file.filename}
   // req.body.imageUrl = newFileName;
   
console.log(req.body);

    const {consumableName, amharicName, price, categoryId } = req.body
    
     if(!consumableName || !amharicName || !price || !categoryId){
        res.status(500).json({
            success: false,
            message : `All fields are required`
        })
     }
     const isCreated = await consumableService.createSingleConsumable(req.body)
     const id = req.params.id.substring(1)
     if(!isCreated){
       return res.status(500).json({
            success: false,
            message: `Fail to update`
        })
     }
   return   res.status(200).json({
        success: true,
        message: `Updated successfully`
     })
 } 
}
module.exports = consumableController;