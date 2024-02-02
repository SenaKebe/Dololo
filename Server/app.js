const express = require ('express')
const cors = require ('cors')
const mysql = require ( 'mysql2/promise')
const dotenv = require ('dotenv');
dotenv.config();

const server = express();

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
console.log(port);


server.get('/', async (req,res) =>{
   await res.send("test url")
})

server.listen(port,host, (err)=>{
    if (err) console.log (err)
    console.log(`server is running on http://${host}:${port}`);
}
)


