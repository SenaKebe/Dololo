const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const pool =  mysql.createpool({
host: process.env.DB_HOST,
port: process.env.DB_PORT,
password: process.env.DB_PASS,
user: process.env.DB_USER,
database: process.env.DB_NAME
});











async function query (sql,param){
    const [rows,fields] = await pool.execute(sql,param);
    return rows;
 } 
 
 module.exports = query;