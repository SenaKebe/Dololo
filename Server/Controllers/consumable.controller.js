const consumableService = require("../services/consumable.service")
const consumableController={

    getAllConsumables: async(req,res)=>{
     const  rows= await consumableService.getAllConsumables()
     res.status(200).json({
        success: true,
        data : rows
     });
 },
 getSingleConsumableById: async(req,res)=>{
    const id = req.params.id.substring(id)
    res.status(200).json({
        success: true,
        data: rows
    });
 },
 getConsumableByCategory: async(req,res)=>{
    const id =  req.params.id.substring(1)
    const rows= await consumableService.getConsumableByCategory()
    res.status(200).json({
        success : true,
        data: rows
    })
 },
 getConsumableByUser: async(req,res)=>{

    const id= req.params.id.substring(1)
    const rows = await consumableService.getConsumableByUser()
    res.status(200).json({
        success: true,
        data : rows
         
    });
 },
 updateSingleConsumable: async(req,res)=>{
    const id = req.params.id.substring(1)
    const {consumableName, amharicName, price, imageURL} = req.body
    if(!consumableName || !amharicName || !price || !imageURL){
        res.status(500).json({
            success : false,
            message: `All fields are required`
        })
      const  isUpdated = await consumableService.updateSingleConsumable()
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
    const isDeleted = await consumableService.deleteSingleConsumable()
    const id = req.params.id.substring(1)
    if(!isDeleted){
        res.status(500).json({
            success: false,
            message: `Fail to delete`
        })
    }
    req.status(200).json(200)({
        success : true,
        message : `Consumable is deleted successfully`
    })
 },
 createSingleConsumable: async(req,res)=>{
    const {consumableName, amharicName, price, imageURL } = req.body
     if(!consumableName || !amharicName || !price || !imageURL){
        res.status(500).json({
            success: false,
            message : `All fields are required`
        })
     }
     const isCreated = await consumableService.createSingleConsumable()
     const id = req.params.id.substring(1)
     if(!isCreated){
        res.status(500).json({
            success: false,
            message: `Fail to update`
        })
     }
     res.status(200).json({
        success: true,
        message: `Updated successfully`
     })
 }
}
module.exports = consumableController;