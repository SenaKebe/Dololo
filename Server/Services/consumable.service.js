const consumableQuery = require('../queries/consumable.query');
const query = require('../config/db');


const consumableService = {
getAllConsumables: async()=>{
    try {
       const  rows = query(consumableQuery.getAllConsumables)
        return rows
    } catch (e) {
        console.log(e);
        return null
    }
},
 getSingleConsumableById: async(consumableId)=>{
    try {
        const rows = query(consumableQuery.getSingleConsumableById,[consumableId])
        return rows
    } catch (e) {
        console.log(e);
        return null;
    }
},


getConsumableByCategory: async(categoryId)=>{
    try {
        const rows= query(consumableQuery.getConsumableByCategory,[categoryId])
        return rows
    } catch (e) {
        console.log(e)
        return null
    }
},
getConsumableByUser: async(userId)=>{
try {
    const rows= query(consumableQuery.getConsumableByUser,[userId])
    return rows
} catch (e) {
    console.log(e);
    return null
}
},
updateSingleConsumable: async(data)=>{
    try {
        const rows= await query(consumableQuery.updateSingleConsumable,[data.consumableName,data.amharicName,data.price,data.consumableId])
        return rows
    } catch (e) {
        console.log(e);
        return null;
    }
},
deleteSingleConsumable: async(consumableId)=>{
    try {
        const rows = query(consumableQuery.deleteSingleConsumable,[consumableId])
        return rows
    } catch (e) {
        console.log(e);
        return null
    }
},
createSingleConsumable: async(data)=>{
    try {
        rows = await query(consumableQuery.createSingleCategory,[data.consumableId,data.consumableName,data.amharicName,data.price,"data.imageURL"])
    } catch (e) {
        console.log(e);
        return null
    }
}, 
}

module.exports =consumableService;