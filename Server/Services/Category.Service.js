const categoryQuery = require('../queries/Category.Query');
const query = require('../config/db');

const categoryService = {
 getAllCategories : async() =>{
   try {
        const rows = await query (categoryQuery.getAllCategories)
        return rows
    } catch (e) {
        console.log(e);
        return null
    } 
 },
 getsingleCategory : async(categoryId)=> {
    try {
       const  rows = await query (categoryQuery.getSingleCategory, [categoryId])
      return rows 
    } catch (e) {
        console.log(e);
        return null

    }
 },
 updateSingleCategory: async(data) =>{
    try {
       const  rows = await query(categoryQuery.updateSingleCategory,[data.categoryId,data.categoryName, data.amharicName,data.imageURL])
        return rows;
    } catch (e) {
        console.log(e);
        return null
    }
 }, 
 deleteSingleCategory: async(categoryId)=>{
    try {
       const  rows = await query(categoryQuery.deleteSingleCategory,[categoryId])
        return rows
    } catch (e) {
        console.log(e);
        return null;
    }
 },
 createSingleCategory: async(data)=>{
    try {
        const rows = await query(categoryQuery.createSingleCategory,[data.categoryName,data.amharicName,data.imageURL])
        return rows;
    } catch (e) {
       console.log(e);
       return null; 
    }
 },

     
      

}



module.exports =categoryService