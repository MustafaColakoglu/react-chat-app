var app=require("express")();
var http=require("http").createServer(app);
var cors = require('cors')
app.use(cors())

const io = require("socket.io")(http, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
 
    }
  });



app.get("/",function(req,res){
    res.send("<h1>Hello World</h1>")
});



io.on("connection",function(socket){
    console.log("a user connected")
    socket.on("chat message",function(msg){
        console.log("message"+msg)
        io.emit("chat message",msg)
    })
})

http.listen(3001,function(){
    console.log("listening")
})