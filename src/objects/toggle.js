"use strict";

var util = require("../util");

class InToggle extends require("./object") {
  constructor(args, opts) {
    super(util.merge({
      maxclass: "toggle",
      numinlets: 1,
      numoutlets: 1,
      width: util.defaults(opts.width, 24),
      height: util.defaults(opts.height, 24),
    }, opts));

    this._toggle = false;

    if (this.elem) {
      this.elem.addEventListener("click", () => {
        this.click();
      });
    }
  }

  recv(value) {
    if (value === "bang") {
      this._toggle = !this._toggle;
    } else {
      this._toggle = !!value;
    }
    this._update();
  }

  click() {
    this._toggle = !this._toggle;
    this._update();
  }

  _update() {
    if (this.elem) {
      this.elem.setAttribute("fill", this._toggle ? "#2ecc71" : "white");
    }
    this.send(this._toggle ? 1 : 0);
  }
}

require("../core/klass").register("toggle", (args, opts) => {
  return new InToggle(args, opts);
});

export default InToggle;
