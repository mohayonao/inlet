"use strict";

var util = require("./util");

var __id = 0;

class InObject {
  constructor(opts) {
    this.id = `obj-${++__id}`;
    this.maxclass = util.defaults(opts.maxclass, "newobj");
    this.numinlets = util.defaults(opts.numinlets, 1);
    this.numoutlets = util.defaults(opts.numoutlets, 1);
    this.patching_rect = [ 0, 0, 100, 22 ];
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

  send(msg, outlet=0) {
    if (this._outlets[outlet]) {
      this._outlets[outlet].send(msg);
    }
  }

  recv() {}

  connect(target) {
    if (this._outlets[0]) {
      this._outlets[0].connect(target);
    }
  }

  disconnect(target) {
    if (this._outlets[0]) {
      this._outlets[0].disconnect(target);
    }
  }

  setPosition(x=0, y=0) {
    this.patching_rect[0] = x;
    this.patching_rect[1] = y;
  }

  setSize(w=100, h=22) {
    this.patching_rect[2] = w;
    this.patching_rect[3] = h;
  }

  click() {}
}

class Inlet {
  constructor(node, index) {
    this._node = node;
    this._index = index;
  }

  toInlet() {
    return this._node._inlets[this._index] || null;
  }

  toOutlet() {
    return this._node._outlets[this._index] || null;
  }
}

class Outlet {
  constructor(node, index) {
    this._node = node;
    this._index = index;
    this._connected = [];
  }

  send(msg) {
    this._connected.forEach((target) => {
      target._node.recv(msg, target._index);
    });
  }

  connect(target) {
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
  }

  disconnect(target) {
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
  }

  toInlet() {
    return this._node._inlets[this._index] || null;
  }

  toOutlet() {
    return this._node._outlets[this._index] || null;
  }
}

export default InObject;
