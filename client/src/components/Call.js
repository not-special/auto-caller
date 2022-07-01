const Call = ({ call }) => {
  return (
    <li>
      {call.phoneNumber}: {call.status}
    </li>
  )
}

export default Call;
