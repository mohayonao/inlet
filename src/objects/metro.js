"use strict";

var util = require("../util");

class InMetro extends require("./object") {
  constructor(args, opts) {
    super(util.merge({
      numinlets: 2,
      numoutlets: 1,
    }, opts));

    this._interval = util.defaults(args[0], 5);
    this._timerId = 0;
  }

  recv(value) {
    if (this._timerId === 0 && !!value) {
      this._timerId = setInterval(() => {
        this.send("bang");
      }, this._interval);
      this.send("bang");
    } else {
      clearInterval(this._timerId);
      this._timerId = 0;
    }
  }

  dispose() {
    super.dispose();
    if (this._timerId) {
      clearInterval(this._timerId);
      this._timerId = 0;
    }
  }
}

require("../core/klass").register("metro", (args, opts) => {
  return new InMetro(args, opts);
});

export default InMetro;
