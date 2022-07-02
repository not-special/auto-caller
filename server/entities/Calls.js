const Call = require("./Call");

class Calls {
  static maxConcurrentCalls = 3;

  static phoneNumbers = [
    "13018040009", "19842068287", "15512459377", "19362072765", "18582210308", 
    "13018040009", "19842068287", "15512459377", "19362072765" ];
   
  constructor(phoneNumbers) {
    this.calls = Calls.phoneNumbers.map(num => new Call(num));
  }

  nextIdleCall() {
    const call = this.calls.find(c => c.status === "idle");
    return call;
  }

  findByLiveCallId(liveCallId) {
    const call = this.calls.find(c => c.liveCallId === liveCallId);
    return call;
  }

  async initiateCalls() {
    for (let i = 1; i <= maxConcurrentCalls; i++) {
      const call = this.nextIdleCall();
      await call.dial();
    }
  }
}

module.exports = Calls;
