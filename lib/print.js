"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InPrint = (function (_require) {
  function InPrint(opts) {
    _classCallCheck(this, InPrint);

    _get(Object.getPrototypeOf(InPrint.prototype), "constructor", this).call(this, 1, 0);

    this._printId = opts.printId;
  }

  _inherits(InPrint, _require);

  _prototypeProperties(InPrint, null, {
    recv: {
      value: function recv(msg) {
        console.log(this._printId + ": " + msg.value);
      },
      writable: true,
      configurable: true
    }
  });

  return InPrint;
})(require("./object"));

require("./exports").print = function () {
  var printId = arguments[0] === undefined ? "printId" : arguments[0];
  return new InPrint({ printId: printId });
};

module.exports = InPrint;