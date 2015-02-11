"use strict";

exports.defaults = defaults;
function defaults(value) {
  var defaultValue = arguments[1] === undefined ? null : arguments[1];
  return value !== undefined ? value : defaultValue;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});