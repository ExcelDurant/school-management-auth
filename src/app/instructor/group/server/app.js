
const express = require('express');
const app = express();
let http=require('http');
let server=http.server(app);
let socketIO=require('socket.io');
let IO=socketIO(server);

IO.on('connection',(socket)=>{
  console.log('user connected');
});

server.listen(3000, ()=>{
  console.log('started on port 3000 and served on port 4200');
});
