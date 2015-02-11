"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InObject = (function (_require$EventEmitter) {
  function InObject() {
    var numOfInlets = arguments[0] === undefined ? 0 : arguments[0];
    var numOfOutlets = arguments[1] === undefined ? 0 : arguments[1];
    _classCallCheck(this, InObject);

    _get(Object.getPrototypeOf(InObject.prototype), "constructor", this).call(this);

    this._numOfInlets = numOfInlets;
    this._numOfOutlets = numOfOutlets;
    this._inlets = [];
    this._outlets = [];

    var i;
    for (i = 0; i < numOfOutlets; i++) {
      this[i] = this._outlets[i] = new Outlet(this, i);
    }
    for (i = 0; i < numOfInlets; i++) {
      this._inlets[i] = new Inlet(this, i);
      if (!this[i]) {
        this[i] = this._inlets[i];
      }
    }
  }

  _inherits(InObject, _require$EventEmitter);

  _prototypeProperties(InObject, null, {
    send: {
      value: function send(e) {
        var outlet = arguments[1] === undefined ? 0 : arguments[1];
        if (this._outlets[outlet]) {
          this._outlets[outlet].send(e);
        }
      },
      writable: true,
      configurable: true
    },
    connect: {
      value: function connect(target) {
        if (this._outlets[0]) {
          this._outlets[0].connect(target);
        }
      },
      writable: true,
      configurable: true
    },
    disconnect: {
      value: function disconnect(target) {
        if (this._outlets[0]) {
          this._outlets[0].disconnect(target);
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

var Inlet = (function () {
  function Inlet(node, index) {
    _classCallCheck(this, Inlet);

    this._node = node;
    this._index = index;
  }

  _prototypeProperties(Inlet, null, {
    toInlet: {
      value: function toInlet() {
        return this._node._inlets[this._index] || null;
      },
      writable: true,
      configurable: true
    },
    toOutlet: {
      value: function toOutlet() {
        return this._node._outlets[this._index] || null;
      },
      writable: true,
      configurable: true
    }
  });

  return Inlet;
})();

var Outlet = (function () {
  function Outlet(node, index) {
    _classCallCheck(this, Outlet);

    this._node = node;
    this._index = index;
    this._connected = [];
  }

  _prototypeProperties(Outlet, null, {
    send: {
      value: function send(event) {
        this._connected.forEach(function (target) {
          target._node.emit("recv", event, target._index);
        });
      },
      writable: true,
      configurable: true
    },
    connect: {
      value: function connect(target) {
        if (target instanceof InObject) {
          target = target._inlets[0];
        }
        if (target && target.toInlet) {
          target = target.toInlet();
        }
        if (!(target instanceof Inlet)) {
          throw new TypeError("inlet??");
        }
        if (target._node === this._node) {
          throw new TypeError("cyclic??");
        }
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
        if (target instanceof InObject) {
          target = this._node._inlets[0];
        }
        if (target && target.toInlet) {
          target = target.toInlet();
        }
        var index = this._connected.indexOf(target);

        if (index !== -1) {
          this._connected.splice(index, 1);
        }
      },
      writable: true,
      configurable: true
    },
    toInlet: {
      value: function toInlet() {
        return this._node._inlets[this._index] || null;
      },
      writable: true,
      configurable: true
    },
    toOutlet: {
      value: function toOutlet() {
        return this._node._outlets[this._index] || null;
      },
      writable: true,
      configurable: true
    }
  });

  return Outlet;
})();

module.exports = InObject;