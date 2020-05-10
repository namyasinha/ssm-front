var db=require("./database");
var bcrypt=require("bcrypt");

module.exports=(req,res)=>{
	var email=req.body.email;
	var password=req.body.password;

	var sql="select * from users where email='"+email+"'";
	db.query(sql,(error,results)=>{
		if(results.length>0)
		{ 
			var hash=results[0].password;
			//console.log(hash);
			bcrypt.compare(password,hash).then(function(response){
				if(response==true)
					{//console.log("logged in");
				      req.session.loggedIn=true;
				      req.session.email=email;
				      
				    res.redirect("/skills")}
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
