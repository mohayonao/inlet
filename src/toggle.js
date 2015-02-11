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

  recv(msg) {
    if (msg.type === "bang") {
      this._toggle = !this._toggle;
    } else {
      this._toggle = !!msg.value;
    }
    this._update();
  }

  click() {
    this._toggle = !this._toggle;
    this._update();
  }

  _update() {
    this.send({ type: "int", value: this._toggle ? 1 : 0 });
  }
}

require("./exports").toggle = () => {
  return new InToggle();
};

export default InToggle;
