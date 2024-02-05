const express = require ('express')
const cors = require ('cors')

const dotenv = require ('dotenv');
dotenv.config();
const appRoutes = require('./routers/index')

const server = express();

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;


server.use(appRoutes);
/* console.log(port); */


server.get('/', async (req,res) =>{
   await res.send("test url")
})

server.listen(port,host, (err)=>{
    if (err) console.log (err)
    console.log(`server is running on http://${host}:${port}`);
}
)






