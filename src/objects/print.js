"use strict";

var util = require("../util");

class InPrint extends require("./object") {
  constructor(args, opts) {
    super(util.merge({
      numinlets: 1,
      numoutlets: 0,
    }, opts));

    this._printId = util.defaults(args[0], "printId");
  }

  recv(value) {
    console.log(this._printId + ": " + value);
  }
}

require("../core/klass").register("print", (args, opts) => {
  return new InPrint(args, opts);
});

export default InPrint;
