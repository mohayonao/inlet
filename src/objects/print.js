"use strict";

class InPrint extends require("./object") {
  constructor(opts) {
    super({
      numinlets: 1,
      numoutlets: 0
    });

    this._printId = opts.printId;
  }

  recv(value) {
    console.log(this._printId + ": " + value);
  }
}

require("../core/klass").register("print", (printId = "printId") => {
  return new InPrint({ printId });
});

export default InPrint;
