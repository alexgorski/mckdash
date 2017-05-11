/**
 * Creates an array of values by running each element in `collection` thru
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64]
 *
 */
"use strict";

const collectionIterator = require('./_collectionIterator.js');

function map(collection, func){
    let items = collectionIterator(collection),
        result = [];
    for (var item of items){
        result.push(func(item.value,item.key,item.collection));
    }
    return result;
}

module.exports = map;