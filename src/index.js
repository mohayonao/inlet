"use strict";

var klass = require("./core/klass");
var util = require("./util");

require("./objects");

export default (config = {}) => {
  return (query, opts = {}) => {
    return klass.new(query, util.merge(opts, config));
  };
};
