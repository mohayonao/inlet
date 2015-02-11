"use strict";

var klass = {};

klass.__INLET__ = function(opts) {
  return function(query) {
    var items = query.split(/\s+/);
    var name = items.shift();
    var args = items.map(function(x) {
      if (/^[-+]?\d+(?:\.\d*)?$/.test(x)) {
        x = +x;
      }
      return x;
    });
    var instance = null;

    if (klass[name]) {
      instance = klass[name].apply(null, args);
    }

    return instance;
  };
};

export default klass;
