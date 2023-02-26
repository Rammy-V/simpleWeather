const express=require("express");
const https=require("https");
const bodyParser = require("body-parser");

const apiKey = "56e66770ba73e6c0da5c7989b13c378d";
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
 });

app.post("/",function(req, res){
    const city = req.body.cityName;
    const units= "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+units;
    https.get(url,function(response){  
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const ico = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/"+ ico +"@2x.png";
            res.send("<p>It is "+ desc +"</p>"+
            "<h1>The temperature in "+city+" is "+temp+" degrees Celcius.</h1>"+
            "<img src="+imgURL+">");
        })
    })
}) 


app.listen(4000,function(){
    console.log("Server is running on port 4000");
});