const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
const port = process.env.PORT || 3000;


async function connect(){
	try{
		await mongoose.connect(process.env.MONGOURL, { useUnifiedTopology: true, useNewUrlParser: true });
		console.log("Connected to DB");
	} catch(err){
		console.log("Error while connecting to DB");
		console.log(process.env.MONGOURL)
		process.exit(0);
	}
}

connect();