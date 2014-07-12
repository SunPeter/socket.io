var http = require("http");
var path=require("path");
var fs=require("fs");

var server=http.createServer(function(req,res){
    fs.readFile(__dirname+"/views/demo.html",function(err,data){
        if(err){
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        else{
            res.writeHeader(200,{"Content-Type":"text/html"});
            res.end(data);
        }
    })
});

var io=require("socket.io")(server);
io.on("connection",function(socket){
    socket.on("MSG",function(data){
          //对当前客户端
          socket.emit("MSG",data);

          //对除开当前的其他客户端
          socket.broadcast.emit("MSG",data);

          //所有客户端
          io.sockets.emit('MSG', data);

    })
});
server.listen(8080);