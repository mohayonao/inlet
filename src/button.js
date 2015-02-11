"use strict";

class InButton extends require("./object") {
  constructor() {
    super({
      maxclass: "button",
      numinlets: 1,
      numoutlets: 1,
    });
    this.patching_rect[2] = 24;
    this.patching_rect[3] = 24;
  }

  recv() {
    this.send({ type: "bang", value: "bang" });
  }

  click() {
    this.send({ type: "bang", value: "bang" });
  }
}

require("./exports").button = () => {
  return new InButton();
};

export default InButton;
