import axios from "axios"
const SERVER_URL = "http://localhost:5001"

export const initiateCalls = async () => {
  axios.post(`${SERVER_URL}/call`);
}
