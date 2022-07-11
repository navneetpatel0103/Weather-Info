const express = require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
    // res -> the response sent by our server to client
    res.sendFile(__dirname+ "/index.html");
});

app.post("/", function(req,res){
    const query=req.body.cityName;
    const apiKey="dc53c06ff82d739c3e0b27d25096461a";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey + "&units=" + unit + "&q=" + query;

    https.get(url, function(response){
    // response-> the response sent by external server to our server
    console.log(response.statusCode);
    response.on("data", function(data){
        const weatherData=JSON.parse(data);
        const city=weatherData.name;
        const temp=weatherData.main.temp;
        const description=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const iconURL= "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<h1>The temp " + "in " + city + " is "+ temp + " degree celsius and the weather is currently "+ description + "</h1>");
        res.write("<img src=" + iconURL +">");
    })
})
})

app.listen(3000,function(){
    console.log("Server is running");
})

