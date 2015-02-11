"use strict";

class InToggle extends require("./object") {
  constructor() {
    super(1, 1);

    this._toggle = false;

    this.on("recv", (e) => {
      if (e.type === "bang") {
        this._toggle = !this._toggle;
      } else {
        this._toggle = !!e.value;
      }
      this._update();
    });
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
