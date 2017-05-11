"use strict";
const _ = require('./mckdash.js');

/** forEach **/
_.forEach([1, 2], function(value) {
    console.log(value);
});
// => Logs `1` then `2`.

_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
    console.log(key);
});
// => Logs 'a' then 'b'.

/** map **/
function square(n) {
   return n * n;
}
console.log(_.map([4, 8], square));
// => [16, 64]

console.log(_.map({ 'a': 4, 'b': 8 }, square));
// => [16, 64]

/** reduce **/
console.log(_.reduce([1, 2], function(sum, n) {
    return sum + n;
}, 0));
// => 3

console.log(_.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
    (result[value] || (result[value] = [])).push(key);
    return result;
}, {}));
// => { '1': ['a', 'c'], '2': ['b'] }

/** memoize **/
let addition = function(){
    let sum = 0;
    for (let arg of arguments[Symbol.iterator]()){
        sum += arg
    }
    return sum;
}

const resolver = function(){
    return Array.from(arguments).join('-')
}

const cacheHandler = function(){
    let cache = arguments[0],
        key   = arguments[1],
        result= arguments[2];
    console.log("Cache size is: "+cache.size);
    if (cache.size > 3){
        console.log("Pruning first cache entry");
        cache.delete(cache.keys().next().value);
    }
    return cache.set(key, result);
}
const additions = _.memoize(addition,resolver,cacheHandler);

additions(1,1,1);
// => "Cache size is: 0"
additions(1,1,2);
// => "Cache size is: 1"
additions(1,2,2);
// => "Cache size is: 2"
additions(2,2,2);
// => "Cache size is: 3"
additions(1,1,1);
additions(2,2,3);
// => "Cache size is: 4"
// => "Pruning first cache entry"
additions(1,1,1);
// => "Cache size is: 4"
// => "Pruning first cache entry"
