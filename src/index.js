"use strict";

var klass = require("./core/klass");
var util = require("./util");

require("./objects");

export default (config = {}) => {
  var objects = [];

  config.timerAPI = config.timerAPI || global;

  var fn = (query, opts = {}) => {
    var instance = klass.new(query, util.merge(opts, config));

    if (instance) {
      objects.push(instance);
    }
    var dispose = instance.dispose;

    instance.dispose = () => {
      dispose.call(instance);
      delete objects[instance];
    };

    return instance;
  };

  fn.reset = () => {
    objects.splice(0).forEach((instance) => {
      instance.dispose();
    });
  };

  return fn;
};
