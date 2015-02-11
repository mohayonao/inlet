"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InButton = (function (_require) {
  function InButton() {
    _classCallCheck(this, InButton);

    _get(Object.getPrototypeOf(InButton.prototype), "constructor", this).call(this, {
      maxclass: "button",
      numinlets: 1,
      numoutlets: 1 });
    this.patching_rect[2] = 24;
    this.patching_rect[3] = 24;
  }

  _inherits(InButton, _require);

  _prototypeProperties(InButton, null, {
    recv: {
      value: function recv() {
        this.send({ type: "bang", value: "bang" });
      },
      writable: true,
      configurable: true
    },
    click: {
      value: function click() {
        this.send({ type: "bang", value: "bang" });
      },
      writable: true,
      configurable: true
    }
  });

  return InButton;
})(require("./object"));

require("./exports").button = function () {
  return new InButton();
};

module.exports = InButton;