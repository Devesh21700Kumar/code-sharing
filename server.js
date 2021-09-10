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

app.get("/", (req, res) => {
    const code = `Welcome to WasteBin!
  Use the commands in the top right corner
  to create a new file to share with others.`
  
    res.render("code-display", { code, language: "plaintext" })
  })
  
  app.get("/new", (req, res) => {
    res.render("new")
  })
  
  app.post("/save", async (req, res) => {
    const value = req.body.value
    try {
      const document = await Document.create({ value })
      res.redirect(`/${document.id}`)
    } catch (e) {
      res.render("new", { value })
    }
  })
  
  app.get("/:id/duplicate", async (req, res) => {
    const id = req.params.id
    try {
      const document = await Document.findById(id)
      res.render("new", { value: document.value })
    } catch (e) {
      res.redirect(`/${id}`)
    }
  })
  
  app.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
      const document = await Document.findById(id)
  
      res.render("code-display", { code: document.value, id })
    } catch (e) {
      res.redirect("/")
    }
  })
  
  app.listen(process.env.PORT || 3000)