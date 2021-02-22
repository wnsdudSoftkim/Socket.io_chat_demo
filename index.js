const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;



// Routing
app.use(express.static(path.join(__dirname, 'public')));

//socket이 파라미터로 전달 된 후 

var count = 1
io.on('connection',(socket)=> {
  console.log("user connected : ",socket.id)
  const name ="user " + count++;
  io.to(socket.id).emit('change name',name)

  socket.on('disconnect',()=> {
    console.log('user disconnected : ',socket.id)

  })
  //emit을 통해 모든 클라이언트들에게 msg를 전달한다
  socket.on('send message',(name,text)=> {
    const msg = name+":"+text
    console.log(msg)
    io.emit('receive message',msg)
  })
})
server.listen(port, () => {
  console.log('Server listening at port %d', port);
});