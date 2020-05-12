const jwt = require("jsonwebtoken");
const config = require("config");
var login=require("../routes/login")

module.exports = function(req, res, next) {
  //console.log(token)
  //console.log(req.cookies)
  if(JSON.stringify(req.cookies.user)==undefined){
    res.redirect("/")
  }
  else{
  var token=req.cookies.user.access_token;

  //get the token from the header if present
  //const token = req.headers["x-access-token"] || req.headers["authorization"];
  //if no token found, return response (without going to the next middelware)
  if (!token) {
      console.log("Access Denied")
      res.render('login',{
          message:"Wrong Credentials"
      })
  }

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.get("myprivatekey"));
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    //res.status(400).send("Invalid token.");
    {
        res.redirect("/")
    }
  }
}
};