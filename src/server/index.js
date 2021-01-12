var app=require("express")();
var http=require("http").createServer(app);
var io=require("socket.io")(http);
var cors = require('cors')
app.use(cors())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
   // Add this
   if (req.method === 'OPTIONS') {
  
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Max-Age', 120);
        return res.status(200).json({});
    }
  
    next();
  
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