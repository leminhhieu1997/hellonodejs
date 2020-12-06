var express =  require("express");
var app =  express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");


var server =  require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);

io.on("connection", function(socket){
    console.log("user connect: "+ socket.username);

    socket.on("disconnect", function(){
        console.log("user close: "+ socket.id);
    });

    socket.on("Client-send-data",function(data){
        console.log(data);
        socket.broadcast.emit("Client-send-data", data + "8888")
        //io.sockets.emit("Client-send-data", data + "8888");
    });
});

app.get("/", function(req, res){
    res.render("trangchu")
});