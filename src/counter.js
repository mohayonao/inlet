"use strict";

class InCounter extends require("./object") {
  constructor(opts) {
    super(5, 4);

    this._algo = opts.algo;
    this._from = opts.from;
    this._to = opts.to;
    this._value = this._from;
    this._carryCount = 0;
  }

  recv() {
    this.send({ type: "int", value: this._value });
    if (this._value === this._to) {
      this._value = this._from;
      this._carryCount += 1;
      // send carryCount
    } else {
      this._value += 1;
    }
  }
}

require("./exports").counter = (...args) => {
  var opts;

  switch (args.length) {
  case 0:
    opts = { algo: 0, from: 0, to: Infinity };
    break;
  case 1:
    opts = { algo: 0, from: 0, to: args[0] };
    break;
  case 2:
    opts = { algo: args[0] < args[1] ? 0 : 1, from: args[0], to: args[1] };
    break;
  default:
    opts = { algo: args[0], from: args[1], to: args[2] };
    break;
  }

  return new InCounter(opts);
};

export default InCounter;
