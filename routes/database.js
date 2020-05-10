var mysql=require("mysql")

var connection = mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"",
    database:"skillset"
})

connection.connect((err)=>{
    if(err)
    console.log(err);
    else
    console.log("Database connected...")
})

module.exports=connection
