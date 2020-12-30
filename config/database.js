const {createPool} = require('mysql')
require("dotenv").config();

const pool = createPool({
    host:'localhost',
    user:"root",
    password:"",
    database:"mockupdatabase"
})



module.exports = pool;
