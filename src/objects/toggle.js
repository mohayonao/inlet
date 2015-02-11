"use strict";

class InToggle extends require("./object") {
  constructor() {
    super({
      maxclass: "toggle",
      numinlets: 1,
      numoutlets: 1
    });
    this.patching_rect[2] = 24;
    this.patching_rect[3] = 24;

    this._toggle = false;
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
    this.send(this._toggle ? 1 : 0);
  }
}

require("../core/klass").register("toggle", () => {
  return new InToggle();
});

export default InToggle;
