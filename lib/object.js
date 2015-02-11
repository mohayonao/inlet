"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InObject = (function (_require$EventEmitter) {
  function InObject() {
    _classCallCheck(this, InObject);

    _get(Object.getPrototypeOf(InObject.prototype), "constructor", this).call(this);

    this._connected = [];
  }

  _inherits(InObject, _require$EventEmitter);

  _prototypeProperties(InObject, null, {
    send: {
      value: function send(e) {
        this._connected.forEach(function (target) {
          target.emit("recv", e);
        });
      },
      writable: true,
      configurable: true
    },
    connect: {
      value: function connect(target) {
        var index = this._connected.indexOf(target);

        if (index === -1) {
          this._connected.push(target);
        }
      },
      writable: true,
      configurable: true
    },
    disconnect: {
      value: function disconnect(target) {
        var index = this._connected.indexOf(target);

        if (index !== -1) {
          this._connected.splice(index, 1);
        }
      },
      writable: true,
      configurable: true
    },
    click: {
      value: function click() {},
      writable: true,
      configurable: true
    }
  });

  return InObject;
})(require("events").EventEmitter);

module.exports = InObject;