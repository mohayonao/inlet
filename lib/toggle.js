"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InToggle = (function (_require) {
  function InToggle() {
    _classCallCheck(this, InToggle);

    _get(Object.getPrototypeOf(InToggle.prototype), "constructor", this).call(this, {
      maxclass: "toggle",
      numinlets: 1,
      numoutlets: 1
    });
    this.patching_rect[2] = 24;
    this.patching_rect[3] = 24;

    this._toggle = false;
  }

  _inherits(InToggle, _require);

  _prototypeProperties(InToggle, null, {
    recv: {
      value: function recv(value) {
        if (value === "bang") {
          this._toggle = !this._toggle;
        } else {
          this._toggle = !!value;
        }
        this._update();
      },
      writable: true,
      configurable: true
    },
    click: {
      value: function click() {
        this._toggle = !this._toggle;
        this._update();
      },
      writable: true,
      configurable: true
    },
    _update: {
      value: function _update() {
        this.send(this._toggle ? 1 : 0);
      },
      writable: true,
      configurable: true
    }
  });

  return InToggle;
})(require("./object"));

require("./exports").toggle = function () {
  return new InToggle();
};

module.exports = InToggle;