/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 * If `cacheHandler` is provided, it determines how to handle new cache entries.
**/

"use strict";

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
