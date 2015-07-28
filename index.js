'use strict';

var LinkedList = require('./lib/LinkedList'),
    LinkedListMap = require('./lib/LinkedListMap'),
    LinkedListWeakMap = require('./lib/LinkedListWeakMap'),
    l = new LinkedList(),
    lM = new LinkedListMap(),
    lWM = new LinkedListWeakMap();

lWM.unshift(1)
    .unshift({
        test: 1
    }).unshift([2, 3, 4])
    .unshift('5')
    .unshift(6)
    .unshift(7)
    .unshift(7);

console.log(lWM.shift(), lWM);

lWM.forEach(function (v, k) {
    if (v === 1) {
        lWM.insertAfter(k, 25);
    }
});

lWM.forEach(function (v, k) {
    console.log(v, k);
});