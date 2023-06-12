const dotenv = require('dotenv');

const SECRET_KEY = "$2b$10$bqgY5QHENX0IcRDfg8.upO";
const REDIS_SECRET_KEY = "2(DCA4Vjjdt)y#B*W8Fu38#gD2a$qTV5Wsb23Du#pW7&WVsk3TW%8IIF!*R%MTy^";
const type = "mysql";
const host = "localhost";
const port = 3306;
const username = "test";
const password = "test";
const database = "test";
const tokens = require('csrf');
const multer = require('multer');
const {join} = require("path");
const upload = multer({dest: join(__dirname, 'uploads')});
module.exports = {
    SECRET_KEY,
    REDIS_SECRET_KEY,
    type,
    host,
    port,
    username,
    password,
    database,
    tokens,
    upload
};
