"use strict";
module.exports = {collectionIterator, forEach, map, reduce, memoize};

function* collectionIterator(obj) {
    for (let prop of Object.keys(obj)) {
        yield {value: obj[prop], key: prop, collection: obj};
    }
}

function forEach(collection, func){
    let items = collectionIterator(collection);
    for (let item of items){
        func(item.value, item.key, item.collection);
    }
    return collection;
}

function map(collection, func){
    let items = collectionIterator(collection),
        result = [];
    for (var item of items){
        result.push(func(item.value,item.key,item.collection));
    }
    return result;
}

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

function memoize(func, resolver, cacheHandler){
    if ( typeof func   != 'function' ||
        (resolver     != null && typeof resolver != 'function') ||
        (cacheHandler != null && typeof cacheHandler != 'function')) 
    {
        throw new TypeError("Expects arguments of type function");
    }
    let memoized = function(){
        let args  = arguments,
            key   = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;   
        if (cache.has(key)) {
            return cache.get(key);
        }
        let result = func.apply(this, args);
        memoized.cache = cacheHandler ? cacheHandler.apply(this, [cache, key, result]) : cache.set(key, result);
        return result;
    }
    memoized.cache = new Map;

    return memoized;
}