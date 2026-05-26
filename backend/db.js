const {Client} = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const client = new Client({
    user:   'postgres',
    host:   'localhost',
    database: '',
    password: '',
    port: 5432,
}); 
client.connect();   
module.exports = client;

