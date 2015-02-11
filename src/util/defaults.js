"use strict";

export default (value, defaultValue = null) => {
  return value !== undefined ? value : defaultValue;
};
