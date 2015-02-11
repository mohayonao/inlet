"use strict";

class InButton extends require("./object") {
  constructor() {
    super(1, 1);
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
