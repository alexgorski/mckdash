#mckdash
This repo is my implementation of .forEach(), .map(), .reduce(), and .memoize().

## .forEach(), .map() and .reduce()
My approach uses a generator function collectionIterator to handle the collection passed and make sure it is iterable. I pass the value, key and collection each time next() is called by the for-of loop. This way we follow lodash and the iteratee is invoked with three arguments: (value, index | key, collection).

I used the same examples as lodash, and those are in examples.js

### Running with Node (4.2.2)
`$ node examples.js`  
It should return something like:  
```
1  
2  
a
b  
[ 16, 64 ]
[ 16, 64 ]
3  
{ '1': [ 'a', 'c' ], '2': [ 'b' ] }
Cache size is: 0
Cache size is: 1  
Cache size is: 2  
Cache size is: 3  
Cache size is: 4  
Pruning first cache entry
Cache size is: 4
Pruning first cache entry
```

## .memoize()

My memoize() follows the lodash approach pretty closely with a few exceptions:  
1. I decided to take advantage of the Map via ES2015 collection type instead of creating a MapCache type object, which is more opinionated.  
2. I added an optional parameter 'cacheHandler' of type function giving invoker control over the cache. examples.js includes a cacheHandler function that prunes the cache by deleting the oldest Map entry once the cache.size reaches a limit.

## Other Notes
There are few places where I started by using some ES2015 features like destructuring or modules. In the end, I'm running an older version of node (4.2.2) and didn't want to make any assumptions around that or setup transpiling - so a few parts are little more verbose. 