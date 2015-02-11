"use strict";

var util = require("../util");

class InCounter extends require("./object") {
  constructor(args, opts) {
    super(util.merge({
      numinlets: 5,
      inoutlets: 4,
    }, opts));

    this._algo = 0;
    this._from = args[0];
    this._to = args[1];
    this._value = this._from;
    this._carryCount = 0;
  }

  recv() {
    this.send(this._value);
    if (this._value === this._to) {
      this._value = this._from;
      this._carryCount += 1;
      // send carryCount
    } else {
      this._value += 1;
    }
  }
}

require("../core/klass").register("counter", (args, opts) => {
  return new InCounter(args, opts);
});

export default InCounter;
