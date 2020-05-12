var db=require("./database")

module.exports=(req,res)=>{
	var email=req.cookies.user.email;
	
	var skill=req.body.skill;
	var level=req.body.level;

	var sql1="select * from skills where skill='"+skill+"' and email='"+email+"'"
   	db.query(sql1,(error,results)=>{
   		if(error)
   		{
   			console.log(error)
   		}
   		else{
   			var sql2="update skills set email='"+email+"',skill='"+skill+"',level='"+level+"' where email ='"+email+"' and skill='"+skill+"'" 
   			db.query(sql2,(error,results)=>{
   				if(error){
   					console.log(error)
   				}
   				else
   					res.redirect('/skills')
   			})	
   		}
   	})	
}