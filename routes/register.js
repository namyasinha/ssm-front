var db=require("./database")
var mysql=require("mysql")
var bcrypt=require("bcrypt")
 

 module.exports=(req,res)=>{

 	var name=req.body.name;
 	var email=req.body.email;
 	var contact=req.body.contact;
 	var password=req.body.password;

 	var sql1="select * from users where email='"+email+"'"
 	db.query(sql1,(error,results)=>{
 		if(results.length>0){
 			console.log("email already registered");
 			res.render('register',{
 				message:"Email already exist"
 			})
 		}
 		else{
			 			bcrypt.hash(password,10,(err,hash)=>{
					var sql="insert into users values('"+name+"','"+email+"','"+contact+"','"+hash+"',null)";
				db.query(sql,(error,results)=>{
					if(error)
						console.log(error);
					else
						{//console.log(password);
						console.log("registered");
						res.render('login',{
				 				message:"Congratulations!!!"
				 			})
					}
				})
				})
 		}
 	})

 	




 }
