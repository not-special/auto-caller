const Call = ({ call }) => {  
  return (
    <li>
      {call.phoneNumber}: <span className={call.status}>{call.status}</span>
    </li>
  )
}

export default Call;
