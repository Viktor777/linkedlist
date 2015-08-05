var should = require('chai').should(),
    LinkedList = require('../'),
    list;

describe('LinkedList', function() {
    describe('#unshift', function () {
        before(function () {
            var values = [[4, 5], {
                test: 3
            }, null, '2', 1];

            list = new LinkedList();
            values.forEach(function (v) {
                list.unshift(v);
            });
        });
        it('should be equal to head value', function () {
            list.get(list.head).should.be.equal(1);
        });
        it('should be equal to next value after head', function () {
            list.get(list.head.next).should.be.equal('2');
        });
        it('should not exist', function () {
            should.not.exist(list.get(list.head.prev));
        });
    });
    describe('#shift', function () {
        before(function () {
            var values = [[4, 5], {
                test: 3
            }, null, '2', 1];

            list = new LinkedList();
            values.forEach(function (v) {
                list.unshift(v);
            });
        });
        it('should be equal to removed value', function () {
            list.shift().should.be.equal(1);
        });
        it('should be equal to head value', function () {
            list.get(list.head).should.be.equal('2');
        });
        it('should be equal to removed value', function () {
            list.shift().should.be.equal('2');
        });
        it('should not exist', function () {
            list.shift();
            list.shift();
            list.shift();
            list.shift();
            should.not.exist(list.get(list.head));
            should.not.exist(list.head.prev);
            should.not.exist(list.head.next);
        });
    });
    describe('#remove', function () {
        before(function () {
            var values = [[4, 5], {
                test: 3
            }, null, '2', 1];

            list = new LinkedList();

            values.forEach(function (v) {
                list.unshift(v);
            });
        });
        it('should be equal to removed value', function () {
            list.remove(list.head).should.be.equal(1);
        });
        it('should not exist', function () {
            list.remove(list.head);
            list.remove(list.head);
            list.remove(list.head);
            list.remove(list.head);
            list.remove(list.head);
            should.not.exist(list.get(list.head));
            should.not.exist(list.head.prev);
            should.not.exist(list.head.next);
        });
    });
    describe('#prepend', function () {
        before(function () {
            var values = [[4, 5], {
                test: 3
            }, null, '2', 1];

            list = new LinkedList();

            values.forEach(function (v) {
                list.unshift(v);
            });
        });

    });
    describe('#forEach', function () {

    });
    describe('#reverse', function () {

    });
    describe('#insertBefore', function () {

    });
    describe('#insertAfter', function () {

    });
    describe('#join', function () {

    });
    describe('#toString', function () {

    });
    describe('#valueOf', function () {

    });
    describe('#isEmpty', function () {

    });
    describe('#Symbol.iterator', function () {

    });
    describe('#isLinkedList', function () {

    });
});