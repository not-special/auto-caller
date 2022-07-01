const axios = require("axios");
const API_URL = "http://localhost:4830/call";


const numDialer = async (phoneNum) => {
  const payload = {
    phone: phoneNum,
    webhookURL: "http://localhost:5001/callStatus"
  }

  try {
    const { data } = await axios.post(API_URL, payload);
    return data;
  } catch (e) {
    console.error(e);
  }
}

module.exports = numDialer;
