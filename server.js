var express=require("express")
var mysql=require("mysql")
var bcrypt=require("bcrypt")
var db=require("./routes/database")
var bodyParser=require("body-parser")
var session=require("express-session")
var app=express();
var ejs=require("ejs");
var fileUpload=require("express-fileupload");
var path=require("path");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('view engine','ejs');
app.use(session({secret:"wesdfgtrftt564324", saveUninitialized:true, resave:true}))
app.use(express.static('public'))
app.use(fileUpload())
//session

var auth=function(req,res,next){
	if(req.session.loggedIn){
		next();
	}
	else{
		res.redirect("/")
	}
}



//register 
var register=require("./routes/register")
app.route('/register').post(register)

//login
var login=require("./routes/login")
app.route('/login').post(login)
app.get("/login",(req,res)=>{
	res.sendFile(__dirname+"/login.html")
})

//homepage
app.get("/",(req,res)=>{
	res.sendFile(__dirname+"/dashboard.html")
})

//add_skills
var add=require("./routes/add")
app.route('/add').post(add)
app.get("/add",auth,(req,res)=>{
	res.sendFile(__dirname+"/add.html")
})
//my profile

app.get('/profile',auth,(req,res)=>{
	var email=req.session.email;
	var sql="select * from users where email='"+email+"'";
	db.query(sql,(error,results)=>{
		res.render('profile',{
			user:results
		})
		console.log(results)

	})
	
})


//update_skills
app.get("/update/:id",auth,(req,res)=>{
	db.query("select * from skills where skill='"+req.params.id+"' and email='"+req.session.email+"'",(error,results)=>{
		res.render('update',{
			update:results
		})
	})
})
//update route
var update=require("./routes/update")
app.route("/update").post(update)

//delete

app.get('/delete/:id',auth,(req,res)=>{
	db.query("delete from skills where email='"+req.session.email+"' and skill='"+req.params.id+"'",(error,results)=>{
		res.redirect('/skills')
	})
})

//show my skills
app.get('/skills',auth,(req,res)=>{
	var email=req.session.email;
	var sql="select * from skills where email='"+email+"'"
	db.query(sql,(error,results)=>{
		res.render('skills',{
			skills:results
		})
	})
})

//searching
var search= require("./routes/search")
app.route('/search').post(search)
app.get('/search',auth,(req,res)=>{
	var sql="select distinct skill from skills order by skill";
	db.query(sql,(error,results)=>{
		var sql2="select distinct name from users order by name";
		db.query(sql2,(error,results2)=>{
		res.render('search',{
			names:results2,
			skills:results

		})
	})
		
	})
	
	
	
})
//search by name
var search_name=require("./routes/search_name")
app.route('/search_name').post(search_name)

//update profile
var update_profile=require("./routes/update_profile")
app.route("/update_profile").post(update_profile)
app.get("/update_profile",auth,(req,res)=>{
	var sql="select * from users where email='"+req.session.email+"'";
	db.query(sql,(error,results)=>{
		res.render('update_profile',{
			user:results
		})
	})
	
})

//logout
app.get("/logout",(req,res)=>{
	req.session.loggedIn=false;
	res.redirect("/")
})

app.listen(3000)
console.log("App listening on port 3000")

