"use strict";

export default (obj1, obj2) => {
  var result = {};

  Object.keys(obj1).forEach((key) => {
    result[key] = obj1[key];
  });
  Object.keys(obj2).forEach((key) => {
    if (!result.hasOwnProperty(key)) {
      result[key] = obj2[key];
    }
  });

  return result;
};
