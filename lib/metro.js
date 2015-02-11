"use strict";

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InMetro = (function (_require) {
  function InMetro(opts) {
    var _this = this;
    _classCallCheck(this, InMetro);

    _get(Object.getPrototypeOf(InMetro.prototype), "constructor", this).call(this, 2, 1);

    this._interval = opts.interval;
    this._timerId = 0;

    this.on("recv", function (e) {
      if (_this._timerId === 0 && !!e.value) {
        _this._timerId = setInterval(function () {
          _this.send({ type: "bang", value: "bang" });
        }, _this._interval);
        _this.send({ type: "bang", value: "bang" });
      } else {
        clearInterval(_this._timerId);
        _this._timerId = 0;
      }
    });
  }

  _inherits(InMetro, _require);

  return InMetro;
})(require("./object"));

require("./exports").metro = function () {
  var interval = arguments[0] === undefined ? 5 : arguments[0];
  return new InMetro({ interval: interval });
};

module.exports = InMetro;