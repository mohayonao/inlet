"use strict";

class InObject extends require("events").EventEmitter {
  constructor() {
    super();

    this._connected = [];
  }

  send(e) {
    this._connected.forEach((target) => {
      target.emit("recv", e);
    });
  }

  connect(target) {
    var index = this._connected.indexOf(target);

    if (index === -1) {
      this._connected.push(target);
    }
  }

  disconnect(target) {
    var index = this._connected.indexOf(target);

    if (index !== -1) {
      this._connected.splice(index, 1);
    }
  }

  click() {}
}

export default InObject;
