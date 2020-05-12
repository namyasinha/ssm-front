var db=require("./database")
var mv=require("mv")
var fs=require("fs")
module.exports=(req,res)=>{
    var name=req.body.name;
    var email=req.cookies.user.email;
    var contact=req.body.contact;
    var file = req.files.upload;
    if(file){
    var file_name = file.name;
    //console.log(file_name); 
    var uploadpath ="./public/"+file_name;
    var sql=`update users set picture='${file_name}',name='${name}',contact='${contact}' where email='${email}'  `;
    db.query(sql,(error,results)=>{
        if(error)console.log(error)
        
        
    })
    file.mv(uploadpath, err => {
        if (err)
            throw err;
        else {
            console.log("uploaded");
            //res.send("file uploaded");
            res.redirect("/profile")
        }
    });
}
else{
    var sql=`update users set name='${name}',contact='${contact}' where email='${email}'  `;
    db.query(sql,(error,results)=>{
        if(error)console.log(error)
        
        
    })

}
    
    






}


