const path = require('path');
const bodyParser = require('body-parser')
let express = require('express');
let app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json()

let fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const { log } = require('console');




app.post('/displaybooks', jsonParser, async function(req, res) {
    console.log("je suis dans displaybooks");
 var file=fs.readFileSync('./database/books_database.json', "utf8");
console.log(file);
 res.status(200).send({file});


});

app.post('/changequantity', jsonParser, async function(req, res) {
    console.log("je suis dans changequantity");
    console.log(req.body);
    var camarche="OK";
    var idfound=false;
    var flag=true;
    var filedb="";
    while(idfound==false)
    {   
      
      var file=fs.readFileSync('./database/books_database.json', "utf8");//en json
        console.log(file);
        if(file && file.length!=0)
        {
          console.log("dans le read");
          var filejson = JSON.parse(file);
          console.log(filejson);//pas en json
  
          for (var i = 0; i < filejson.length; i++) {
            if(filejson[i]!=null && filejson[i].id==req.body.id)
            {  
              filejson[i].quantity=req.body.quantity;
               filejson[i].quantity=req.body.quantity;
              var newquantity=req.body.quantity*filejson[i].price;
              console.log(newquantity);
              var newquantitystring=newquantity.toString();
              filejson[i].priceall=newquantitystring;
              
  
              filedb = JSON.stringify(filejson);
              idfound=true;
            }
          }
          
        }
   else{
   idfound=true;
   flag=false;
   }
      
  
      
    }
    console.log(filedb);
    await fs.writeFileSync('./database/books_database.json', filedb, function (err) {
      if (err) throw err;
      console.log('File overwrite');
      console.log('The book was updated!');
  
    });
  
  if( flag===true && camarche==="OK"){
  console.log("OK");
   
  res.status(200).send({filedb});}
  

});




app.post('/deleteelement', jsonParser, async function(req, res) {
  console.log("je suis dans deleteelement");
  console.log(req.body);
  var camarche="OK";
  var idfound=false;
  var flag=true;
  var filedb="";
  var idarray=[];
  
    
    var file=fs.readFileSync('./database/books_database.json', "utf8");//en json
      console.log(file);
      if(file && file.length!=0)
      {
        console.log("dans le read");
        var filejson = JSON.parse(file);
        console.log(filejson);//pas en json

        for (var i = 0; i < filejson.length; i++) {
          console.log("la");
          if(filejson[i].id==req.body.id && filejson[i].exist!="false"  )
          {  console.log("hy");
            filejson[i].exist="false";
            console.log(filejson[i]);
            idfound=true;
            filedb = JSON.stringify(filejson);
            
          }
        }
        
      }
 else{
 idfound=true;
 flag=false;
 }

 console.log(filedb);
 await fs.writeFileSync('./database/books_database.json', filedb, function (err) {
  if (err) throw err;
  console.log('File overwrite');
  console.log('The book was deleted!');

});

    
  if( flag===true && camarche==="OK"){
    console.log("OK");
     
    res.status(200).send({filedb});}


});


app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});