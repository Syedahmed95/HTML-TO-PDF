var express = require("express");
var app = express();
//var webshot = require('webshot');
var fs = require('fs');
const requestPromise = require('request-promise');
require('dotenv').config()
var pdf = require('html-pdf');
var html = fs.readFileSync('views/crm.ejs', 'utf8');
var options = { format: 'A4', base: 'file:///'+__dirname +'/public/', orientation: "landscape" };
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"))

app.get("/",function(req,res){
    res.render("Challan1.ejs");
});
app.get("/zubairbhai", (req,res)=>{
res.render("crm.ejs")
})
app.post("/crm",function(req,res){
    console.log(req.body);
    var details = req.body;
    console.log(details)
    res.render("Challan1.ejs", { details: details }, function (err, html) {
      pdf.create(html, options).toFile('./public/pdf/businesscard.pdf', function (err, res) {
        if (err) {
          console.log(err);
        }
        else { console.log(res); }
      });
  
      res.send(html);
    });
  });
app.post("/check",()=>{
  const core_backend_service = {
    baseurl: process.env.FEE_MODULE_BASE_URL,
    fetchStudents: {
        method: 'post',
        route: '/v1/fee-challan/create"'
    }
}
let challancreate = {
  method: core_backend_service.fetchStudents.method,
  uri: core_backend_service.baseurl+core_backend_service.fetchStudents.route,
  json: true
};
 requestPromise(challancreate).then(function(response){console.log(response)}).catch(function(error){console.log(error)});
// console.log(studentFetchResponse)

});
app.listen(4000,function(){
    console.log("Server started successfully!!");
}); 