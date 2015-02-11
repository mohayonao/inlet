"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InCounter = (function (_require) {
  function InCounter(opts) {
    _classCallCheck(this, InCounter);

    _get(Object.getPrototypeOf(InCounter.prototype), "constructor", this).call(this, 5, 4);

    this._algo = opts.algo;
    this._from = opts.from;
    this._to = opts.to;
    this._value = this._from;
    this._carryCount = 0;
  }

  _inherits(InCounter, _require);

  _prototypeProperties(InCounter, null, {
    recv: {
      value: function recv() {
        this.send({ type: "int", value: this._value });
        if (this._value === this._to) {
          this._value = this._from;
          this._carryCount += 1;
        } else {
          this._value += 1;
        }
      },
      writable: true,
      configurable: true
    }
  });

  return InCounter;
})(require("./object"));

require("./exports").counter = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var opts;

  switch (args.length) {
    case 0:
      opts = { algo: 0, from: 0, to: Infinity };
      break;
    case 1:
      opts = { algo: 0, from: 0, to: args[0] };
      break;
    case 2:
      opts = { algo: args[0] < args[1] ? 0 : 1, from: args[0], to: args[1] };
      break;
    default:
      opts = { algo: args[0], from: args[1], to: args[2] };
      break;
  }

  return new InCounter(opts);
};

module.exports = InCounter;