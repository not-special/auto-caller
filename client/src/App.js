import React, { useState, useEffect } from 'react'
import {io} from 'socket.io-client'
import Calls from './components/Calls';
import { initiateCalls, resetCalls } from './services/callService';

const App= ()=> {
  const [calls, setCalls] = useState([]);
  
  useEffect(() => {
    const socket = io('http://localhost:5001')
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(() => socket.connect(),5000)
    })

    socket.on('calls', (data) => {
      setCalls(data.calls)
    })

    socket.on('disconnect',() => console.log('server disconnected'))
 
  },[])

 const handleCallButtonClick = () => {
  initiateCalls();
 }

 const handleResetCallsButtonClick = () => {
  resetCalls();
 }

 const showCallButton = () => {
  return calls.length > 0 && !calls.find(c => c.status !== "idle");
 }

 const showResetCallsButton = () => {
  return calls.length > 0 && !calls.find(c => c.status !== "completed");
 }

 return (
   <div className="App">
    { showCallButton() ? <button onClick={handleCallButtonClick}>Call!</button> : ""}
    { showResetCallsButton() ? <button onClick={handleResetCallsButtonClick}>Reset</button> : ""}
    <Calls calls={calls}/>
   </div>
 )
}
export default App;
