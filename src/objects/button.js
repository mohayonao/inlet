"use strict";

var util = require("../util");

class InButton extends require("./object") {
  constructor(args, opts) {
    super(util.merge({
      maxclass: "button",
      numinlets: 1,
      numoutlets: 1,
      width: util.defaults(opts.width, 24),
      height: util.defaults(opts.height, 24),
    }, opts));
  }

  recv() {
    this.send("bang");
  }

  click() {
    this.send("bang");
  }
}

require("../core/klass").register("button", (args, opts)=> {
  return new InButton(null, opts);
});

export default InButton;
