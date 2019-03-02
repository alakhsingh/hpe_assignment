var express = require("express");
var cors = require("cors");
var app = express(),
  bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fs = require("fs");

app.get("/", (req, res) => {
  const { spawn } = require("child_process");
  const ls = spawn("python3", [
    "/Users/AlakhSingh/PycharmProjects/hpe/thread.py",
    null
  ]);
  ls.stdout.on("data", data => {
    if (data.toString().indexOf("123456789") >= 0) {
      fs.readFile("output_100.txt", function(err, s) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(s);
        res.end();
      });
    }
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
    res.status(400).json({
      status: {
        type: "Failure",
        data: data,
        code: "400",
        error: "True"
      }
    });
  });
});

app.post("/search", function(req, res) {
  var item = req.body.search_item;
  console.log("search item " + item);
  const { spawn } = require("child_process");
  const ls = spawn("python3", [
    "/Users/AlakhSingh/PycharmProjects/hpe/thread.py",
    item
  ]);
  var result = 0;
  var str = "";
  ls.stdout.on("data", data => {
    if (data.toString().indexOf("123456789") >= 0) {
      fs.readFile("search.txt", function(err, s) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(s);
        res.end();
      });
    }
    console.log(`stdout: ${str}`);
  });

  ls.stderr.on("data", data => {
    console.log(`stderr: ${data}`);
    res.status(400).json({
      status: {
        type: "Failure",
        data: data,
        code: "400",
        error: "True"
      }
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
