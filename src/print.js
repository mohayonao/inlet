"use strict";

class InPrint extends require("./object") {
  constructor(opts) {
    super(1, 0);

    this._printId = opts.printId;
  }

  recv(msg) {
    console.log(this._printId + ": " + msg.value);
  }
}

require("./exports").print = (printId = "printId") => {
  return new InPrint({ printId });
};

export default InPrint;
