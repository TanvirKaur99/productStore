var express=require('express');
var app=express();
var multer=require('multer');

var bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//this is for displaying product.html page....
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/product.html");
})

//body parser for fetching data from the form.....


var st=multer.diskStorage({

    destination:(req,file,cb)=>{
            cb(null,"./productImage");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
    
    });
    
    var fileupload=multer({storage:st}).single('image');
    
app.post('/getData',(req,res)=>{

    
   

    //for getting image

    fileupload(req,res,(err)=>{
        if(err){
            console.log("file uploading failed" +err);
            res.send(err);
        }
        else{

            var productname=req.body.pname;
            var quantity=req.body.pqty;
            var pri=req.body.price;

          console.log("file uploaded successfully");
        
          res.send("file uploaded successfully"+"Name:" +productname
          + "  Quantity:" +quantity+ "  Price:" +pri+ "  Bill:" +pri*quantity);

        }
    })

})


app.listen(3200,(err)=>{

if(err){
    console.log(err)
}
else{
    console.log("server is running at http://localhost:3000")}
})