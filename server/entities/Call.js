class Call {
  static nextId = 0;

  constructor(phoneNumber, id) {
    this.id = Call.nextId++;
    this.phoneNumber = phoneNumber;
    this.status = "idle";
    this.liveCallId = null;
  }

  setStatus(newStatus) {
    this.status = newStatus;
  }

  isCompleted() {
    return this.status === "completed" 
  }
}

module.exports = Call;
