const {Client} = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const client = new Client({
    user:   'postgres',
    host:   'localhost',
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
}); 
client.connect();   
module.exports = client;

