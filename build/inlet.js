!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.INLET=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
        this.send("bang");
      },
      writable: true,
      configurable: true
    },
    click: {
      value: function click() {
        this.send("bang");
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
},{"./exports":3,"./object":6}],2:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InCounter = (function (_require) {
  function InCounter(opts) {
    _classCallCheck(this, InCounter);

    _get(Object.getPrototypeOf(InCounter.prototype), "constructor", this).call(this, {
      numinlets: 5,
      inoutlets: 4
    });

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
        this.send(this._value);
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
},{"./exports":3,"./object":6}],3:[function(require,module,exports){
"use strict";

var klass = {};

klass.__INLET__ = function (query) {
  var items = query.split(/\s+/);
  var name = items.shift();
  var args = items.map(function (x) {
    if (/^[-+]?\d+(?:\.\d*)?$/.test(x)) {
      x = +x;
    }
    return x;
  });

  if (klass[name]) {
    return klass[name].apply(null, args);
  }

  return null;
};

klass.__INLET__.setup = function (opts) {
  console.log(opts.canvas);
};

module.exports = klass;
},{}],4:[function(require,module,exports){
"use strict";

require("./button");
require("./counter");
require("./metro");
require("./print");
require("./toggle");

module.exports = require("./exports").__INLET__;
},{"./button":1,"./counter":2,"./exports":3,"./metro":5,"./print":7,"./toggle":8}],5:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InMetro = (function (_require) {
  function InMetro(opts) {
    _classCallCheck(this, InMetro);

    _get(Object.getPrototypeOf(InMetro.prototype), "constructor", this).call(this, {
      numinlets: 2,
      numoutlets: 1
    });

    this._interval = opts.interval;
    this._timerId = 0;
  }

  _inherits(InMetro, _require);

  _prototypeProperties(InMetro, null, {
    recv: {
      value: function recv(value) {
        var _this = this;
        if (this._timerId === 0 && !!value) {
          this._timerId = setInterval(function () {
            _this.send("bang");
          }, this._interval);
          this.send("bang");
        } else {
          clearInterval(this._timerId);
          this._timerId = 0;
        }
      },
      writable: true,
      configurable: true
    }
  });

  return InMetro;
})(require("./object"));

require("./exports").metro = function () {
  var interval = arguments[0] === undefined ? 5 : arguments[0];
  return new InMetro({ interval: interval });
};

module.exports = InMetro;
},{"./exports":3,"./object":6}],6:[function(require,module,exports){
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
},{"./util":9}],7:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var InPrint = (function (_require) {
  function InPrint(opts) {
    _classCallCheck(this, InPrint);

    _get(Object.getPrototypeOf(InPrint.prototype), "constructor", this).call(this, {
      numinlets: 1,
      numoutlets: 0
    });

    this._printId = opts.printId;
  }

  _inherits(InPrint, _require);

  _prototypeProperties(InPrint, null, {
    recv: {
      value: function recv(value) {
        console.log(this._printId + ": " + value);
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
},{"./exports":3,"./object":6}],8:[function(require,module,exports){
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
},{"./exports":3,"./object":6}],9:[function(require,module,exports){
"use strict";

exports.defaults = defaults;
function defaults(value) {
  var defaultValue = arguments[1] === undefined ? null : arguments[1];
  return value !== undefined ? value : defaultValue;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}]},{},[4])(4)
});