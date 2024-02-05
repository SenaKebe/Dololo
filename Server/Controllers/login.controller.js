const loginService = require('../services/login.service')

const loginController=  {
  getUserByUserName: async(req,res)=>{
    try {
        const {username, password} = req.body;
        if(!username || !password){
          return  res.status(404).json({
                success: false,
                message: `All fields are required`
            });
        }
        const user = await loginService.getUserByUserName(username)
        if(!user.length){
           return res.status(404).json({
                success: false,
                message:`No user is found plase register first`
            })
        }
       else{

        const userId = user[0].userId;

        const dbPassword = user[0].password;
        const isMatch = bcrypt.compareSync(password, dbPassword);


        if (!isMatch) {
            res.status(401).json({ message: 'incorrect password' });
         } else {
            const token = jwt.sign(
               {  employee_id:  userId,employee_first_name: username ,employee_role:user[0].role},
               process.env.JWT_SECRET,
               { expiresIn: '1h' }
            );
         
            res.status(200).json({ message: 'Login successful', token, userId });
         }
       }
    }
      catch (error) {
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
        
},
};


module.exports= loginController;
