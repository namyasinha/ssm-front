var db=require("./database");
var bcrypt=require("bcrypt");
var auth=require("../middleware/auth")
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports=(req,res)=>{
	//generating access token
	
	var email=req.body.email;
	var password=req.body.password;
	var generateAuthToken=function(){
		let token = jwt.sign({email:email,password:password},
			config.myprivatekey,
			{ expiresIn: '24h' // expires in 24 hours
			}
		  );
		  return token;
	}

	var sql="select * from users where email='"+email+"'";
	db.query(sql,(error,results)=>{
		if(results.length>0)
		{ 
			var hash=results[0].password;
			//console.log(hash);
			bcrypt.compare(password,hash).then(function(response){
				if(response==true)
					{//console.log("logged in");
				      
					  var token=generateAuthToken();
						//console.log(token)
						var user={
						
						email:email,
						access_token:token
						}
						res.cookie("user",user);
						res.header("x-auth-token", token)
				      
					res.redirect("/skills")
				}
				else
					{console.log("wrong credentials");
						res.render('login',{
				 				message:"Wrong credentials"
				 			})

					}
			})
		}
		else
			{console.log("no email registered");
				res.render('login',{
				 				message:"No email registered"
				 			})
			}
	})
}
