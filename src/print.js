"use strict";

class InPrint extends require("./object") {
  constructor(opts) {
    super(1, 0);

    this._printId = opts.printId;

    this.on("recv", (e) => {
      console.log(this._printId + ": " + e.value);
    });
  }
}

require("./exports").print = (printId = "printId") => {
  return new InPrint({ printId });
};

export default InPrint;
