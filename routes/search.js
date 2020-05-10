var db=require("./database")

module.exports=(req,res)=>{
	var skill=req.body.skill
	//console.log(skill)
	//var sql="select * from skills"
	//var sql2="select * from skills where skill='"+skill+"'"
	
			db.query("select users.name,users.contact,skills.level ,skills.skill,users.email from users inner join skills on users.email=skills.email where skills.skill='"+skill+"'",(error,results)=>{
					//console.log(results)
				db.query("select distinct skill from skills",(error,results2)=>{
					db.query("select distinct name from users",(error,results3)=>{
						//console.log(results2)
					    res.render('display',{
			        	message:skill,
			        	skills:results2,
			        	display:results,
						names:results3


					})
					})
					
				})
					
				})
		

	
}
