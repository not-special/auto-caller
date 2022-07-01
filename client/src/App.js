import React from 'react'
import {io} from 'socket.io-client'
import Calls from './components/Calls';
import { initiateCalls } from './services/callService';

const App= ()=> {
  const [time, setTime] = React.useState('fetching');
  const [calls, setCalls] = React.useState([]);
  
  React.useEffect(()=>{
    const socket = io('http://localhost:5001')
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })
  //  socket.on('time', (data)=>setTime(data))
  socket.on('calls', (data)=> {
    console.log("calls: ", data)
    setCalls(data.calls)
  })
  socket.on('disconnect',()=>setTime('server disconnected'))
 
 },[])

 const handleButtonClick = () => {
  initiateCalls();
 }

 return (
   <div className="App">
    <button onClick={handleButtonClick}>Call!</button>
    <Calls calls={calls || []}/>
   </div>
 )
}
export default App;
