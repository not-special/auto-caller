import Call from "./Call"

const Calls = ({ calls }) => {
  return (
    <ul>
      { calls.map(c => <Call key={c.id} call={c} />) }
    </ul>
  )
}

export default Calls;
