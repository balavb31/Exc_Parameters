const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

const mysql = require('mysql');

const db = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "exc_parameters"
});


//Connecting to DB
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to the database");
});



app.use(express.static(__dirname));

app.listen(process.env.PORT || 3000, function(req,res){
    console.log("Server started and runnning");
})

app.get("/",function(req,res){
    res.sendFile("index.html");
})

app.post("/",function(req,res){

    let date = new Date().toISOString().slice(0, 10);
    console.log(date);

    res.sendFile(__dirname + "/report.html");

    //const sql = `SELECT * FROM exc_parameters;`;

    const sql = `INSERT INTO exc_parameters values ("${date}", 25,"Yes",8000,3,"No","Evening Yoga");`;

        db.query(sql, (err, results) => {
            if (err) {
                throw err;
            }

            // Render the search results
            else{
                console.log(results);
            }
        });

})


function toggleTextBox(checkboxId, textboxId) {
    const checkbox = document.getElementById(checkboxId);
    const textbox = document.getElementById(textboxId);

    if (checkbox.checked) {
        textbox.style.display = "none";
        textbox.value = "";
        textbox.removeAttribute("required");
      } else {
        textbox.style.display = "block";
        textbox.setAttribute("required", "required");
      }

}