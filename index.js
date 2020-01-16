const express = require('express');
const ejs = require('ejs');

let app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");	

app.use(express.static("docs"));

app.get('/', (req,res)=>{
    res.render('index');
});

app.listen(80);