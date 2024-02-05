const query = require('../config/db');
const userQuery = require('../querys/user.query');

const userService = {
   getAllUser: async ()=>{
     try{
      const rows = await query(userQuery.getAllUsers);
      return rows;
     }
     catch(e){
      console.log(e);
      return null;
     }
   },
   getAllUsersInfo: async ()=>{
    try{
     const rows = await query(userQuery.getAllUsersInfo);
     return rows;
    }
    catch(e){
     console.log(e);
     return null;
    }

  },

   getSingleUser: async (id)=>{
      try{
       const rows = await query(userQuery.getSingleUser,[id]);
       return rows;
      }
      catch(e){
       console.log(e);
       return null;
      }
 
    },

    getSingleUserByUserName :async (id)=>{
      try{
       const rows = await query(userQuery.getSingleUserByUsername,[id]);
       return rows;
      }
      catch(e){
       console.log(e);
       return null;
      }
 
    },


    updateSingleUser: async (data)=>{
      try{
       const rows = await query(userQuery.updateSingleUser,[data.username,data.password,data.id]);
       return rows;
      }
      catch(e){
       console.log(e);
       return null;
      }
 
    },

    updateSingleUserProfile: async (data)=>{
      try{
       const rows = await query(userQuery.updateSingleUserProfile,[data.firstname,data.lastname, data.gender, data.id ]);
       return rows;
      }
      catch(e){
       console.log(e);
       return null;
      }
 
    },

    deleteSingleUser: async (id)=>{
      try{
       const rows = await query(userQuery.deleteSingleUser,[id]);
       return rows;
      }
      catch(e){
       console.log(e);
       return null;
      }
 
    },
    deleteSingleUsersProfile: async (id)=>{
      try{
       const rows = await query(userQuery.deleteSingleUserProfile,[id]);
       return rows;
      }
      catch(e){
       console.log(e);
       return null;
      }
 
    },

    registerSingleUser: async (data)=>{
      try{
        // console.log(data);
        
       const rows = await query(userQuery.registerSingleUser,[data.username, data.password,data.role]);
       return rows;
      }
      catch(e){
       console.log(e);
       return null;
      }
 
    },

    createSingleUserProfile: async (data)=>{
      try{
       const rows = await query(userQuery.updateSingleUserProfile,[data.userId,data.firstName,data.lastName,data.gender,data.imageURL]);
       return rows;
      }
      catch(e){
       console.log(e);
       return null;
      }
 
    },

}

module.exports = userService;