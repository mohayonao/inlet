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

module.exports = klass;