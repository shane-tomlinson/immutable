/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// jshint esnext: true

(function (exports) {
  function merge(to, from) {
    Object.getOwnPropertyNames(from).forEach(function (_key) {
      to[_key] = from[_key];
    });
  }

  class Iterable {
    constructor (convert) {
      Object.defineProperty(this, 'convert', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: convert
      });
    }

    set (key, value) {
      var values = this.convert();
      values[key] = value;
      return new this.constructor(values);
    }

    has (key) {
      return key in this;
    }
  }


  class Map extends Iterable {
    constructor (obj) {
      super.constructor(this.toObject);

      merge(this, obj);
      Object.freeze(this);
    }

    delete (key) {
      var values = this.toObject();
      delete values[key];
      return new Map(values);
    }

    merge (obj) {
      var values = this.toObject();
      merge(values, obj);
      return new Map(values);
    }

    toObject () {
      var values = {};
      merge(values, this);
      return values;
    }
  }

  class List extends Iterable {
    constructor (values) {
      super.constructor(this.toArray);

      merge(this, values);

      Object.defineProperty(this, 'size', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: this.length
      });
      delete this.length;

      Object.freeze(this);
    }

    push (item) {
      var values = this.toArray();
      values.push(item);
      return new List(values);
    }

    pop () {
      var values = this.toArray();
      values.pop();
      return new List(values);
    }

    shift () {
      var values = this.toArray();
      values.shift();
      return new List(values);
    }

    unshift (item) {
      var values = this.toArray();
      values.unshift(item);
      return new List(values);
    }

    delete (index) {
      var values = this.toArray();
      values.splice(index, 1);
      return new List(values);
    }

    merge (array) {
      var values = this.toArray();
      var newValues = array.length ? array : new List(array).toArray();
      values = values.concat(newValues);
      return new List(values);
    }

    first() {
      return this[0];
    }

    last () {
      return this[this.size - 1];
    }

    toArray () {
      var values = new Array(this.size);
      merge(values, this);
      return values;
    }
  };

  exports.Immutable = {
    Map: Map,
    List: List
  };
}(this));


