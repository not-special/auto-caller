const Call = require("./Call");

class Calls {
  // static phoneNumbers = [
  //   "13018040009", "19842068287", "15512459377", "19362072765", "18582210308", 
  //   "13018040009", "19842068287", "15512459377", "19362072765" ];
   
  constructor(phoneNumbers) {
    // this.calls = this.createCalls()
    this.calls = phoneNumbers.map(num => new Call(num))
  }

  nextIdleCall() {
    return this.calls.find(c => c.status === "idle");
  }

  findByLiveCallId(liveCallId) {
    return this.calls.find(c => c.liveCallId === liveCallId);
  }
}

module.exports = Calls;
