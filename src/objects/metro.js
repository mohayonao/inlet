"use strict";

class InMetro extends require("./object") {
  constructor(opts) {
    super({
      numinlets: 2,
      numoutlets: 1
    });

    this._interval = opts.interval;
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
}

require("../core/klass").register("metro", (interval = 5) => {
  return new InMetro({ interval });
});

export default InMetro;
