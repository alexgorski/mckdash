/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 *
 * @static
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @example
 *
 * _.forEach([1, 2], function(value) {
 *   console.log(value);
 * });
 * // => Logs `1` then `2`.
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b'.
 */
"use strict";

const collectionIterator = require('./_collectionIterator.js');

function forEach(collection, func){
    let items = collectionIterator(collection);
    for (let item of items){
        func(item.value, item.key, item.collection);
    }
    return collection;
}

module.exports = forEach;