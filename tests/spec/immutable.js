/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

'use strict';

describe('Immutable', () => {
  const assert = chai.assert;

  describe('Map', () => {
    it('creates an object that cannot be modified', () => {
      var map = new Immutable.Map({
        key: 'value'
      });
      assert.equal(map.key, 'value');
      assert.throws(() => {
        map.newkey = 'value';
      });
    });

    it('does not have a `convert` property', () => {
      var map = new Immutable.Map({});
      for (var key in map) {
        if (key === 'convert') {
          throw new Error('convert should not be iterable');
        }
      }

      Object.keys(map).forEach((key) => {
        if (key === 'convert') {
          throw new Error('convert should not be iterable');
        }
      });

      assert.isFalse(Object.getOwnPropertyNames(map).indexOf('convert') === -1);
    });

    it('can `has` a key', () => {
      var list = new Immutable.Map({
        key: 'value'
      });
      assert.isTrue(list.has('key'));
      assert.isFalse(list.has('key2'));
    });


    it('if new values are `set`, a new object is created', () => {
      var map1 = new Immutable.Map({
        key1: 'value1'
      });

      var map2 = map1.set('key1', 'value2');
      assert.equal(map1.key1, 'value1');
      assert.equal(map2.key1, 'value2');

      var map3 = map2.set('key2', 'value3');
      assert.isUndefined(map2.key2);
      assert.equal(map3.key1, 'value2');
      assert.equal(map3.key2, 'value3');
    });

    it('can `merge` with another object', () => {
      var map1 = new Immutable.Map({
        key1: 'value1'
      });

      var map2 = map1.merge({
        key2: 'value2',
        key3: 'value3'
      });

      assert.equal(map1.key1, 'value1');

      assert.equal(map2.key1, 'value1');
      assert.equal(map2.key2, 'value2');
      assert.equal(map2.key3, 'value3');
    });

    it('can `merge` with another Map', () => {
      var map1 = new Immutable.Map({
        key1: 'value1'
      });

      var map2 = new Immutable.Map({
        key2: 'value2',
        key3: 'value3'
      });

      var map3 = map2.merge(map1);
      assert.equal(map3.key1, 'value1');
      assert.equal(map3.key2, 'value2');
      assert.equal(map3.key3, 'value3');
    });

    it('can `delete` a value', () => {
      var map1 = new Immutable.Map({
        key1: 'value1',
        key2: 'value2'
      });

      var map2 = map1.delete('key2');

      assert.equal(map2.key1, 'value1');
      assert.isUndefined(map2.key2);
    });
  });

  describe('List', () => {
    it('can create a List', () => {
      var list = new Immutable.List([1,2]);
      assert.equal(list[0], 1);
      assert.equal(list[1], 2);
      assert.equal(list.size, 2);
    });

    it('can `has` a key', () => {
      var list = new Immutable.List([1,2]);
      assert.isTrue(list.has(0));
      assert.isTrue(list.has(1));
      assert.isFalse(list.has(2));

      assert.isTrue(list.has('size'));
      assert.isFalse(list.has('length'));
    });

    it('can `push` a value', () => {
      var list1 = new Immutable.List([1]);
      var list2 = list1.push(2);

      assert.equal(list1[0], 1);
      assert.equal(list1.size, 1);

      assert.equal(list2[0], 1);
      assert.equal(list2[1], 2);
      assert.equal(list2.size, 2);
    });

    it('can `pop` a value', () => {
      var list1 = new Immutable.List([1, 2]);
      var list2 = list1.pop();

      assert.equal(list1[0], 1);
      assert.equal(list1[1], 2);
      assert.equal(list1.size, 2);

      assert.equal(list2[0], 1);
      assert.isFalse('1' in list2, 1);
      assert.equal(list2.size, 1);
    });

    it('can get the `first` of a list', () => {
      var list1 = new Immutable.List([1, 2]);
      assert.equal(list1.first(), 1);
    });

    it('can get the `last` of a list', () => {
      var list1 = new Immutable.List([1, 2]);
      assert.equal(list1.last(), 2);
    });

    it('can `shift` a value', () => {
      var list1 = new Immutable.List([1, 2]);
      var list2 = list1.shift();

      assert.equal(list1[0], 1);
      assert.equal(list1[1], 2);
      assert.equal(list1.size, 2);

      assert.equal(list2[0], 2);
      assert.equal(list2.size, 1);
    });

    it('can `unshift` a value', () => {
      var list1 = new Immutable.List([1, 2]);
      var list2 = list1.unshift(0);

      assert.equal(list1[0], 1);
      assert.equal(list1[1], 2);
      assert.equal(list1.size, 2);

      assert.equal(list2[0], 0);
      assert.equal(list2[1], 1);
      assert.equal(list2[2], 2);
      assert.equal(list2.size, 3);
    });

    it('can `delete` an index', () => {
      var list1 = new Immutable.List([1, 2]);
      var list2 = list1.delete(0);

      assert.equal(list1[0], 1);
      assert.equal(list1[1], 2);
      assert.equal(list1.size, 2);

      assert.equal(list2[0], 2);
      assert.equal(list2.size, 1);
    });

    it('can `set` the value at an index', () => {
      var list1 = new Immutable.List([1, 2]);
      var list2 = list1.set(1, 3);

      assert.equal(list1[0], 1);
      assert.equal(list1[1], 2);
      assert.equal(list1.size, 2);

      assert.equal(list2[0], 1);
      assert.equal(list2[1], 3);
      assert.equal(list2.size, 2);
    });

    it('can `merge` with another array', () => {
      var list1 = new Immutable.List([1, 2]);
      var list2 = list1.merge([3, 4, 5]);

      assert.equal(list1.size, 2);

      assert.equal(list2[0], 1);
      assert.equal(list2[1], 2);
      assert.equal(list2[2], 3);
      assert.equal(list2[3], 4);
      assert.equal(list2[4], 5);
      assert.equal(list2.size, 5);
    });

    it('can `merge` with another List', () => {
      var list1 = new Immutable.List([1, 2]);
      var list2 = new Immutable.List([3, 4, 5]);

      var list3 = list1.merge(list2);

      assert.equal(list3[0], 1);
      assert.equal(list3[1], 2);
      assert.equal(list3[2], 3);
      assert.equal(list3[3], 4);
      assert.equal(list3[4], 5);
      assert.equal(list3.size, 5);
    });
  });
});

