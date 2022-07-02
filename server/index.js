const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const numDialerService = require("./services/numDialer.js");
const Calls = require("./entities/Calls");

const PORT = process.env.PORT || 5001

const app = express()
const server = http.createServer(app)
const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:3000'
    }
})

io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id);
  socket.join('call-room');
  io.to('call-room').emit('calls', calls);
  socket.on('disconnect',(reason)=>{
    console.log(reason);
  })
})

app.use(express.json());

const calls = new Calls();

const updateClient = () => {
  io.to('call-room').emit('calls', calls);
}

app.post("/call", async (req, res) => {
  calls.initiateCalls();
  res.status(201).send("Call initiated");
})

app.post("/callStatus", async (req, res) => {
  const { id, status } = req.body;
  const call = calls.findByLiveCallId(id);
  call.setStatus(status);
  
  updateClient();

  if ( call.isCompleted() ) {
    const nextCall = calls.nextIdleCall();
    if (nextCall) {
      nextCall.dial();
    }
  }
  res.status(201).send("Status received");
})

app.post("/reset", (req, res) => {
  calls.reset();
  updateClient();
})

server.listen(PORT, err=> {
  if(err) console.log(err);
  console.log('Server running on Port ', PORT);
})
