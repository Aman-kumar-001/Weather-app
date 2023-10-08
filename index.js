const http = require("http");

const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempVal, orgVal) => {
    let temperature = tempVal.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempval%}",orgVal.main.temp);
    return temperature;
}

const server = http.createServer((req, res) => {
  if ((req.url = "/")) {
    requests(
      "https://api.openweathermap.org/data/2.5/weather?q=pune&appid=7486cf83fed0d02f8fd0e82fe0959d21"
    ).on("data", (chunk) => {
      const objdata = JSON.parse(chunk);
      const arrdata = [objdata];
    //   console.log(arrdata[0].main.temp);
    const realTimeData = arrdata.map((val) => replaceVal(homeFile , val))
    .join(" ");
    res.write(realTimeData);
    console.log(realTimeData);
    })
    .on("end", (err) =>{
       if (err) return console.log("connection closed due to error",err);
       console.log("end"); 
       res.end();
    });
  }
});

server.listen(8000, "127.0.0.1");
