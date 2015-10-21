var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "html/";

http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true, false);
  console.log("opening" + ROOT_DIR + urlObj.pathname);
  if (urlObj.pathname == "/getcity") {
    console.log("In REST service")
    res.writeHead(200);

    var jsonresult = [];
    var myReg = new RegExp("^" + urlObj.query["q"]);
    //console.log(myReg)
    fs.readFile('cities.dat.txt', function(err, data) {
      if (err) throw err;
      cities = data.toString().split("\n");
      for (var i = 0; i < cities.length; i++) {
        var result = cities[i].search(myReg);
        if (result != -1) {
          jsonresult.push({city: cities[i]});
        }
      }
      console.log(jsonresult);
      res.end(JSON.stringify(jsonresult));
    });
  } else {
    fs.readFile(ROOT_DIR + urlObj.pathname, function(err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}).listen(8080);
