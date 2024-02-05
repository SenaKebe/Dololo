const query = require('../config/db')
const loginQuery = require('../queries/login.query')

loginService={
getUserByUserName: async(data)=>{
    try {
        const rows = await query(loginQuery.getUserByUserName,[data])
        return rows
    } 
    catch (e) {
        console.log(e);
        return null
    }
},
getUserById: async(data)=>{
    try {
        const rows= await query(loginQuery.getUserById,[data])
    } 
    catch (e) {
      console.log(e);
      return null  
    }
},
}

module.exports = loginService