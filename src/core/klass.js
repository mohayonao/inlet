"use strict";

var klass = {};
var registered = {};

klass.register = (name, func) => {
  registered[name] = func;
};

klass.new = (query, opts) => {
  var items = query.split(/\s+/);
  var klassName = items.shift();
  var args = items.map((x)=> {
    if (/^[-+]?\d+(?:\.\d*)?$/.test(x)) {
      x = +x;
    }
    return x;
  });
  var instance = null;

  if (registered[klassName]) {
    instance = registered[klassName].apply(null, args);
  }
  opts = null;

  return instance;
};

export default klass;
