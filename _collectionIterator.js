"use strict";
// abstract collection object passed via generate fn
function* collectionIterator(obj) {
    for (let prop of Object.keys(obj)) {
        yield {value: obj[prop], key: prop, collection: obj};
    }
    return obj;
}

module.exports = collectionIterator;