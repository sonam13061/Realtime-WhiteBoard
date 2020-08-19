const express=require("express");
const app=express();
const httpserver=require("http").createServer(app);
app.use(express.static("activity"));
const socketServer=require("socket.io")(httpserver);
socketServer.on("connection",function(socket){
    console.log("New Client Connected");
    console.log(socket.id);
    socket.on("colorChange",function(color){
        console.log(color);
        socket.broadcast.emit('rColorChange',color);
    })
    socket.on("md",function(point){
        socket.broadcast.emit('onmd',point);
    })
    socket.on("mmo",function(point){
        socket.broadcast.emit('onmm',point);
    })
})
httpserver.listen(3000,function(){
    console.log("Server is listening to request at port 3000");
})