"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var util = require("./util");

var __id = 0;

var InObject = (function () {
  function InObject(opts) {
    _classCallCheck(this, InObject);

    this.id = "obj-" + ++__id;
    this.maxclass = util.defaults(opts.maxclass, "newobj");
    this.numinlets = util.defaults(opts.numinlets, 1);
    this.numoutlets = util.defaults(opts.numoutlets, 1);
    this.patching_rect = [0, 0, 100, 22];
    this.style = "";
    this.text = null;

    this._inlets = [];
    this._outlets = [];

    var i;
    for (i = 0; i < this.numoutlets; i++) {
      this[i] = this._outlets[i] = new Outlet(this, i);
    }
    for (i = 0; i < this.numinlets; i++) {
      this._inlets[i] = new Inlet(this, i);
      if (!this[i]) {
        this[i] = this._inlets[i];
      }
    }
  }

  _prototypeProperties(InObject, null, {
    send: {
      value: function send(value) {
        var outlet = arguments[1] === undefined ? 0 : arguments[1];
        if (this._outlets[outlet]) {
          this._outlets[outlet].send(value);
        }
      },
      writable: true,
      configurable: true
    },
    recv: {
      value: function recv() {},
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
})();

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
      value: function send(value) {
        this._connected.forEach(function (target) {
          target._node.recv(value, target._index);
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