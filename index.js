'use strict';

var LinkedList = require('./lib/LinkedList'),
    LinkedListMap = require('./lib/LinkedListMap'),
    LinkedListWeakMap = require('./lib/LinkedListWeakMap'),
    l = new LinkedList(),
    lM = new LinkedListMap(),
    lWM = new LinkedListWeakMap();

lWM.unshift({
    test: 1
}).unshift([2, 3, 4])
    .unshift('5')
    .unshift(6);

console.log(lWM.shift(), lWM);

lWM.forEach(function (node) {
    console.log(node);
});