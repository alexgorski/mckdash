/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * _.reduce([1, 2], function(sum, n) {
 *   return sum + n;
 * }, 0);
 * // => 3
 *
 * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 *   return result;
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */

"use strict";

const collectionIterator = require('./_collectionIterator.js');
// set accumulator if passed
// elsif there is no accumlator, use IIFE to return 
// either value or pair, of first item
function reduce(collection, func, accumulator){
    let items = collectionIterator(collection),
        result = (typeof accumulator !== 'undefined') 
            ? accumulator 
            : ((firstItem) => Array.isArray(firstItem.collection) 
                ? firstItem.value 
                : {[firstItem.key] : firstItem.value})(items.next().value);
    for (var item of items){
        result = func(result, item.value,item.key,item.collection);
    }
    return result;
}

module.exports = reduce;