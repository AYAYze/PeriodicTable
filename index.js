const express = require('express');
const ejs = require('ejs');

const PORT = 80;
let app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");	

app.use(express.static("docs"));

app.get('/', (req,res)=>{
    res.render('index');
});

app.listen(PORT, ()=>{
	console.log(`Open in ${PORT}`);
});