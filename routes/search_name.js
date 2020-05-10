var db=require("./database")
module.exports=(req,res)=>{
    var name=req.body.name;
    //console.log(name);
    var sql="select name,contact,skill,level,picture,users.email from users inner join skills on skills.email=users.email where name='"+name+"'";
    
    db.query(sql,(error,results)=>{
					//console.log(results)
				db.query("select distinct skill from skills",(error,results2)=>{
					db.query("select distinct name from users",(error,results3)=>{
						db.query("select * from users where name='"+name+"'",(error,result4)=>{
							//console.log(result4)
							res.render('display_name',{
								message:name,
								skills:results2,
								display:results,
								names:results3,
								user:result4
		
		
							})

						})
						//console.log(results2)
					    
					})
					
				})
					
				})
}