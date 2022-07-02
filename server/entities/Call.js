const numDialerService = require("../services/numDialer");

class Call {
  static nextId = 0;

  constructor(phoneNumber) {
    this.id = Call.nextId++;
    this.phoneNumber = phoneNumber;
    this.status = "idle";
    this.liveCallId = null;
  }

  setStatus(newStatus) {
    if (!(this.status === "completed" && newStatus !== "idle")) {
      this.status = newStatus;
    }
  }

  isCompleted() {
    return this.status === "completed"; 
  }

  async dial() {
    const { id } = await numDialerService(this.phoneNumber);
    this.liveCallId = id;
    this.status = "dialing";
    return this.liveCallId;
  }
}

module.exports = Call;
