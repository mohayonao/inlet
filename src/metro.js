"use strict";

class InMetro extends require("./object") {
  constructor(opts) {
    super(2, 1);

    this._interval = opts.interval;
    this._timerId = 0;

    this.on("recv", (e) => {
      if (this._timerId === 0 && !!e.value) {
        this._timerId = setInterval(() => {
          this.send({ type: "bang", value: "bang" });
        }, this._interval);
        this.send({ type: "bang", value: "bang" });
      } else {
        clearInterval(this._timerId);
        this._timerId = 0;
      }
    });
  }
}

require("./exports").metro = (interval = 5) => {
  return new InMetro({ interval });
};

export default InMetro;
