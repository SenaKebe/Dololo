const userService = require('../services/user.service');
const dotenv =  require('dotenv');
const  bcrypt = require('bcrypt'); 
const  jwt = require('jsonwebtoken');
dotenv.config();

const userController ={
   getAllUsers: async (req,res)=>{
         const rows = await  userService.getAllUser();
         res.status(200).json({
            sucess: true,
            data: rows
         });

   },

   getAllUsersInfo: async (req,res)=>{
      const rows = await  userService.getAllUsersInfo();
     
    
      res.status(200).json({
         sucess: true,
         data: rows
      });

},

   getSingleUser: async (req,res)=>{
      const id = req.params.id.substring(1);
      const rows = await  userService.getSingleUser(id);
      res.status(200).json({
         sucess: true,
         data: rows
      });

   },

   deleteSingleUser: async (req,res)=>{
      const id = req.params.id.substring(1);
      const isuser =await userService.getSingleUser(id);
      if(!isuser.length){
         return  res.status(500).json({
            sucess: false,
            message: `user is not found to delete`
         })
      }
      const isDelatedProfile = await userService.deleteSingleUsersProfile(id);

      const isDeleted = await userService.deleteSingleUser(id);
      
      if(!isDeleted){
        return  res.status(500).json({
            sucess: false,
            message: `fail to delete user`
         })

      }
      res.status(200).json({
         sucess: true,
         message: "User delated sucessfully"
      })
   

   },

   updateSingleUser: async (req,res)=>{
       const id = req.params.id.substring(1);
      const {username, password ,role,lastname,firstname,gender} = req.body;
      // console.log({username, password ,role,lastname,firstname,gender} );


      if(!username || !password || !id || !role || !lastname ||!firstname || !gender){
         return res.status(500).json({
            success: false,
            message: 'all fields are required '
          });
       }
       req.body.id = id;  
       // encript password
      const saltRounds = 10; // Specify a number of rounds
      const salt = bcrypt.genSaltSync(saltRounds);
      req.body.password = bcrypt.hashSync(password, salt);

       const isUserUpdated = await userService.updateSingleuser(req.body); 
  
       const isUserProfileUpdated = await userService.updateSingleuserProfile(req.body);


      return res.status(200).json({
       success: true,
       message: 'user updated sucessfully'
      });

   },

   registerSingleUser: async (req,res)=>{
      const {username, password,firstName,lastName,gender ,role} = req.body;
     
      if(!password	 || !username || !firstName || !lastName || !gender || !role ){
        return res.status(500).json({
           success: false,
           message: 'all fields are required '
         });
      }
      const userNameIsUsed = await userService.getSingleUserByUserName(username);
    
      if(userNameIsUsed.length){
         return res.status(500).json({
            success: false,
            message: 'username is alredy taken '
          });

      }
      else{

         // encript password
         const saltRounds = 10; // Specify a number of rounds
         const salt = bcrypt.genSaltSync(saltRounds);
        req.body.password = bcrypt.hashSync(password, salt);
         
         const isUserAdded = await userService.registerSingleUser(req.body); 
         
         if(!isUserAdded){
         return res.status(500).json({
            success: false,
            message: 'fail to add user '
            });
         }
         else{
             req.body.userId = isUserAdded.insertId;
             
            //profile section
            const isUserProfileAdded = await userService.createSingleUserProfile(req.body); 
            
              return res.status(200).json({
         success: true,
         message: 'user added sucessfully'
         });

         }

      }
  
      

   },



}

module.exports = userController;
