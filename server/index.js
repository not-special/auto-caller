const express = require('express')
const socketIo = require('socket.io')
const http = require('http')
const PORT = process.env.PORT || 5001
const numDialerService = require("./services/numDialer.js");
const Calls = require("./entities/Calls");

const app = express()
const server = http.createServer(app)
const io = socketIo(server,{ 
    cors: {
      origin: 'http://localhost:3000'
    }
}) //in case server and client run on different urls
io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)
  
  socket.join('clock-room')
  
  socket.on('disconnect',(reason)=>{
    console.log(reason)
  })
})


app.use(express.json());

const phoneNumbers = [
  "13018040009", "19842068287", "15512459377", "19362072765", "18582210308", 
  "13018040009", "19842068287", "15512459377", "19362072765" ];
  
const calls = new Calls(phoneNumbers);

// io.to('clock-room').emit('calls', calls)

setInterval(()=>{
  // console.log("calls: ", calls)
  io.to('clock-room').emit('calls', calls)
},2000)

app.post("/call", async (req, res) => {
  const call = calls.nextIdleCall();
  const { id } = await numDialerService(call.phoneNumber); //Does this matter, or use getter??
  call.liveCallId = id;
  
  // TODO: improve response, what's a better message? 
  res.json(id);
})

app.post("/callStatus", async (req, res) => {
  // handle the status update
  const { id, status } = req.body;
  const call = calls.findByLiveCallId(id);
  call.status = status;

  if ( call.isCompleted() ) {
    // initiate new call
    const nextCall = calls.nextIdleCall();
    if (nextCall) {
      const { id } = await numDialerService(nextCall.phoneNumber);
      nextCall.liveCallId = id;
    }
  }
  res.json({status: "ok"})
})

app.get("/calls", (req, res) => {
  res.json(calls);
})

server.listen(PORT, err=> {
  if(err) console.log(err)
  console.log('Server running on Port ', PORT)
})
