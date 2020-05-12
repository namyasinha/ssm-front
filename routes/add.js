var db=require("./database")

module.exports=(req,res)=>{

	var email=req.cookies.user.email;
	
	var skill=req.body.skill;
	var level=req.body.level;
	//console.log(level);

	var sql1="select * from skills where skill='"+skill+"' and email='"+email+"'"
    db.query(sql1,(error,results)=>{
    	if(results.length>0)
    	{
    		res.render('add',{
		    	message:"This skill already exist"
		    })
    	}
    	else{
    		var sql="insert into skills values('"+email+"','"+skill+"','"+level+"')"
	db.query(sql,(error,results)=>{
		if(error)
			{console.log(error)
				res.render('add',{
		    	message:"Error occured"
		    })
			}
		else
			{console.log("added skill");
		     /*res.render('add',{
		    	message:"Skill added"
		    })
		    */
		    res.redirect('/skills')
	}
	})

    	}
    })	

	


}
