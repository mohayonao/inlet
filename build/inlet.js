!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.INLET=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var klass = {};
var registered = {};

klass.register = function (name, func) {
  registered[name] = func;
};

klass["new"] = function (query, opts) {
  var items = query.split(/\s+/);
  var klassName = items.shift();
  var args = items.map(function (x) {
    if (/^[-+]?\d+(?:\.\d*)?$/.test(x)) {
      x = +x;
    }
    return x;
  });
  var instance = null;

  if (registered[klassName]) {
    instance = registered[klassName].call(null, args, opts);
  }

  return instance;
};

module.exports = klass;
},{}],2:[function(require,module,exports){
(function (global){
"use strict";

var klass = require("./core/klass");
var util = require("./util");

require("./objects");

module.exports = function () {
  var config = arguments[0] === undefined ? {} : arguments[0];
  var objects = [];

  config.timerAPI = config.timerAPI || global;

  var fn = function (query) {
    var opts = arguments[1] === undefined ? {} : arguments[1];
    var instance = klass["new"](query, util.merge(opts, config));

    if (instance) {
      objects.push(instance);
    }
    var dispose = instance.dispose;

    instance.dispose = function () {
      dispose.call(instance);
      delete objects[instance];
    };

    return instance;
  };

  fn.reset = function () {
    objects.splice(0).forEach(function (instance) {
      instance.dispose();
    });
  };

  return fn;
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./core/klass":1,"./objects":5,"./util":11}],3:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var util = require("../util");

var InButton = (function (_require) {
  function InButton(args, opts) {
    _classCallCheck(this, InButton);

    _get(Object.getPrototypeOf(InButton.prototype), "constructor", this).call(this, util.merge({
      maxclass: "button",
      numinlets: 1,
      numoutlets: 1,
      width: util.defaults(opts.width, 24),
      height: util.defaults(opts.height, 24) }, opts));
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

require("../core/klass").register("button", function (args, opts) {
  return new InButton(null, opts);
});

module.exports = InButton;
},{"../core/klass":1,"../util":11,"./object":7}],4:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var util = require("../util");

var InCounter = (function (_require) {
  function InCounter(args, opts) {
    _classCallCheck(this, InCounter);

    _get(Object.getPrototypeOf(InCounter.prototype), "constructor", this).call(this, util.merge({
      numinlets: 5,
      inoutlets: 4 }, opts));

    this._algo = 0;
    this._from = args[0];
    this._to = args[1];
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

require("../core/klass").register("counter", function (args, opts) {
  return new InCounter(args, opts);
});

module.exports = InCounter;
},{"../core/klass":1,"../util":11,"./object":7}],5:[function(require,module,exports){
"use strict";

require("./button");
require("./counter");
require("./metro");
require("./print");
require("./toggle");
},{"./button":3,"./counter":4,"./metro":6,"./print":8,"./toggle":9}],6:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var util = require("../util");

var InMetro = (function (_require) {
  function InMetro(args, opts) {
    _classCallCheck(this, InMetro);

    _get(Object.getPrototypeOf(InMetro.prototype), "constructor", this).call(this, util.merge({
      numinlets: 2,
      numoutlets: 1 }, opts));

    this._interval = util.defaults(args[0], 5);
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
    },
    dispose: {
      value: function dispose() {
        _get(Object.getPrototypeOf(InMetro.prototype), "dispose", this).call(this);
        if (this._timerId) {
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

require("../core/klass").register("metro", function (args, opts) {
  return new InMetro(args, opts);
});

module.exports = InMetro;
},{"../core/klass":1,"../util":11,"./object":7}],7:[function(require,module,exports){
(function (global){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var util = require("../util");

var __id = 0;

var InObject = (function () {
  function InObject(opts) {
    _classCallCheck(this, InObject);

    this.id = "obj-" + ++__id;
    this.maxclass = util.defaults(opts.maxclass, "newobj");
    this.numinlets = util.defaults(opts.numinlets, 1);
    this.numoutlets = util.defaults(opts.numoutlets, 1);
    this.patching_rect = [util.defaults(opts.x, 0), util.defaults(opts.y, 0), util.defaults(opts.width, 100), util.defaults(opts.height, 22)];
    this.style = "";
    this.text = null;

    this._inlets = [];
    this._outlets = [];
    this.elem = null;

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

    if (opts.canvas) {
      this.elem = global.document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.elem.setAttribute("x", this.patching_rect[0]);
      this.elem.setAttribute("y", this.patching_rect[1]);
      this.elem.setAttribute("width", this.patching_rect[2]);
      this.elem.setAttribute("height", this.patching_rect[3]);
      this.elem.setAttribute("rx", 5);
      this.elem.setAttribute("ry", 5);
      this.elem.setAttribute("fill", "#fff");
      this.elem.setAttribute("stroke", "#b3ada0");
      opts.canvas.appendChild(this.elem);
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
    dispose: {
      value: function dispose() {},
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
    appendTo: {
      value: function appendTo() {},
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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../util":11}],8:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var util = require("../util");

var InPrint = (function (_require) {
  function InPrint(args, opts) {
    _classCallCheck(this, InPrint);

    _get(Object.getPrototypeOf(InPrint.prototype), "constructor", this).call(this, util.merge({
      numinlets: 1,
      numoutlets: 0 }, opts));

    this._printId = util.defaults(args[0], "printId");
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

require("../core/klass").register("print", function (args, opts) {
  return new InPrint(args, opts);
});

module.exports = InPrint;
},{"../core/klass":1,"../util":11,"./object":7}],9:[function(require,module,exports){
"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var util = require("../util");

var InToggle = (function (_require) {
  function InToggle(args, opts) {
    var _this = this;
    _classCallCheck(this, InToggle);

    _get(Object.getPrototypeOf(InToggle.prototype), "constructor", this).call(this, util.merge({
      maxclass: "toggle",
      numinlets: 1,
      numoutlets: 1,
      width: util.defaults(opts.width, 24),
      height: util.defaults(opts.height, 24) }, opts));

    this._toggle = false;

    if (this.elem) {
      this.elem.addEventListener("click", function () {
        _this.click();
      });
    }
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
        if (this.elem) {
          this.elem.setAttribute("fill", this._toggle ? "#b3ada0" : "#fff");
        }
        this.send(this._toggle ? 1 : 0);
      },
      writable: true,
      configurable: true
    }
  });

  return InToggle;
})(require("./object"));

require("../core/klass").register("toggle", function (args, opts) {
  return new InToggle(args, opts);
});

module.exports = InToggle;
},{"../core/klass":1,"../util":11,"./object":7}],10:[function(require,module,exports){
"use strict";

module.exports = function (value) {
  var defaultValue = arguments[1] === undefined ? null : arguments[1];
  return value !== undefined ? value : defaultValue;
};
},{}],11:[function(require,module,exports){
"use strict";

var defaults = exports.defaults = require("./defaults");
var merge = exports.merge = require("./merge");
Object.defineProperty(exports, "__esModule", {
  value: true
});
},{"./defaults":10,"./merge":12}],12:[function(require,module,exports){
"use strict";

module.exports = function (obj1, obj2) {
  var result = {};

  Object.keys(obj1).forEach(function (key) {
    result[key] = obj1[key];
  });
  Object.keys(obj2).forEach(function (key) {
    if (!result.hasOwnProperty(key)) {
      result[key] = obj2[key];
    }
  });

  return result;
};
},{}]},{},[2])(2)
});