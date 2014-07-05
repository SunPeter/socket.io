var path=require("path");
var express = require('express')
    ,app=express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

//此行设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

server.listen(80,function(){
    console.log("server has started");
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/views/index.html');
});

/**
 * io.on("connection",function(socket){  //监听连接，创建获取socket
 *      socket.on("disconnected",function(){  //根据socket，创建事件监听以及处理方法
 *
 *      })
 * });
 */
io.on('connection', function (socket) {
    console.log("a user connected");
    socket.on('disconnect', function (){
        console.log("a user disconnected");
    });


    socket.on("msg",function(msg){
        if(msg!=""){
            console.log("msg:"+msg);
        }
        socket.emit("msg",msg);
    });

});

