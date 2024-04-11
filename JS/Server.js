const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Import the database module
const db = require("./DataBase").default;

app.use(bodyParser.json());

app.get("api/getUsernames", (req, res)=>{

})